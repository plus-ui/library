import { html, css } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { inputStyle } from './input.style';
import { labelStyle } from '../label/label.style';
import { captionStyle } from '../caption/caption.style';

/**
 * @tag plus-input
 * @since 0.0.0
 * @status experimental
 *
 * PlusInput component is a form input component that provides various input types,
 * validation, and accessibility features.
 *
 * @slot prefix - Content to be placed before the input
 * @slot suffix - Content to be placed after the input
 *
 * @csspart input - The native input element
 * @csspart wrapper - The input wrapper element
 * @csspart prefix - The prefix container
 * @csspart suffix - The suffix container
 * @csspart clear-button - The clear button
 * @csspart password-toggle - The password visibility toggle button
 *
 * @event plus-input - Emitted when the input value changes
 * @event plus-change - Emitted when the input value changes and the input loses focus
 * @event plus-focus - Emitted when the input gains focus
 * @event plus-blur - Emitted when the input loses focus
 * @event plus-clear - Emitted when the clear button is clicked
 * @event plus-password-toggle - Emitted when the password visibility is toggled
 * @event plus-invalid - Emitted when the input value is invalid
 *
 * @example
 * ```html
 * <plus-input
 *   label="Email"
 *   type="email"
 *   required
 *   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
 *   error-message="Please enter a valid email address"
 *   @plus-invalid=${(e) => console.log('Invalid input:', e.detail)}
 * ></plus-input>
 * ```
 */
export default class PlusInput extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 256px;
      }

      :host([full-width]) {
        max-width: none;
      }
    `,
  ];

  @query('input')
  input!: HTMLInputElement;

  @state() private hasFocus = false;
  @state() private validationMessage = '';

  @property({ reflect: true }) type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url' = 'text';
  @property() name = '';
  @property() value = '';
  @property() placeholder = '';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, converter: (value) => value != 'false' })
  clearable = false;
  @property({ type: Boolean, converter: (value) => value != 'false' })
  disabled = false;
  @property({ type: Boolean, converter: (value) => value != 'false' })
  readonly = false;
  @property({ type: Boolean, converter: (value) => value != 'false' })
  required = false;
  @property({ attribute: 'password-toggle', type: Boolean }) passwordToggle =
    false;
  @property({ attribute: 'password-visible', type: Boolean }) passwordVisible =
    false;
  @property({ type: String }) label?: string;
  @property() pattern?: string;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;
  @property() min?: number | string;
  @property() max?: number | string;
  @property() step?: number | 'any';
  @property() autocorrect?: 'off' | 'on';
  @property() autocomplete?: string;
  @property({ type: Boolean }) autoFocus?: boolean;
  @property() enterkeyhint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
  @property() inputmode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';
  @property({ type: Boolean }) spellCheck?: boolean;
  @property({ type: String }) caption?: string;
  @property({ type: Boolean, converter: (value) => value != 'false' }) error =
    false;
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';

  @property({ reflect: true, attribute: 'full-width', type: Boolean })
  fullWidth = false;
  @property({ type: Boolean, converter: (value) => value != 'false' })
  isSelect = false;

  @property({ type: String, attribute: 'prefix-icon' }) prefixIcon?: string;
  @property({ type: String, attribute: 'suffix-icon' }) suffixIcon?: string;

  private handleBlur() {
    this.hasFocus = false;
    this.emit('plus-blur');
    this.validate();
  }

  private handleChange() {
    this.value = this.input.value;
    this.emit('plus-change');
    this.validate();
  }

  private handleClearClick(event: MouseEvent) {
    this.value = '';
    this.emit('plus-clear');
    this.emit('plus-input');
    this.emit('plus-change');
    this.input.focus();
    this.validate();

    event.stopPropagation();
  }

  private handlePasswordToggle(event: MouseEvent) {
    this.passwordVisible = !this.passwordVisible;
    this.emit('plus-password-toggle', {
      detail: { visible: this.passwordVisible },
    });
    event.stopPropagation();
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('plus-focus');
  }

  private handleInput() {
    this.value = this.input.value;
    this.emit('plus-input');
    this.validate();
  }

  private handleInvalid(event: Event) {
    const input = event.target as HTMLInputElement;
    const validity = input.validity;
    let message = this.errorMessage;

    if (!message) {
      if (validity.valueMissing) {
        message = 'This field is required';
      } else if (validity.typeMismatch) {
        message = 'Please enter a valid value';
      } else if (validity.patternMismatch) {
        message = 'Please match the requested format';
      } else if (validity.tooLong) {
        message = `Please use no more than ${this.maxlength} characters`;
      } else if (validity.tooShort) {
        message = `Please use at least ${this.minlength} characters`;
      } else if (validity.rangeUnderflow) {
        message = `Please enter a value greater than or equal to ${this.min}`;
      } else if (validity.rangeOverflow) {
        message = `Please enter a value less than or equal to ${this.max}`;
      } else if (validity.stepMismatch) {
        message = `Please enter a valid value. The nearest valid value is ${this.getStepValue()}`;
      } else if (validity.badInput) {
        message = 'Please enter a valid value';
      } else {
        message = 'Please correct the error';
      }
    }

    this.validationMessage = message;
    this.error = true;
    this.emit('plus-invalid', { detail: { message, validity } });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      const form = this.input.form;
      if (form) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          event.preventDefault();
          (submitButton as HTMLButtonElement).click();
        }
      }
    }
  }

  private validate() {
    if (this.input.validity.valid) {
      this.error = false;
      this.validationMessage = '';
    }
  }

  private getStepValue(): number {
    const value = parseFloat(this.value);
    const step = parseFloat(this.step as string) || 1;
    const min = parseFloat(this.min as string) || 0;
    return Math.round((value - min) / step) * step + min;
  }

  handleSlotchange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const childNodes = slot.assignedNodes({ flatten: true });
    if (childNodes.length) {
      slot.style.display = 'flex';
    }
  }

  override render() {
    const {
      label,
      hasFocus,
      error,
      disabled,
      caption,
      clearable,
      value,
      size,
      required,
      readonly,
      isSelect,
      prefixIcon,
      suffixIcon,
      passwordToggle,
      passwordVisible,
      validationMessage,
    } = this;
    const {
      inputElement,
      host,
      inputWrapper,
      prefix,
      suffix,
      clearButton,
      passwordToggleButton,
    } = inputStyle({
      focus: hasFocus,
      error,
      disabled,
      size,
      readonly,
      isSelect,
    });

    const LabelTemplate = () =>
      label
        ? html`<label class=${labelStyle({ size, required })} for="input"
            >${label}</label
          >`
        : null;
    const CaptionTemplate = () =>
      caption || validationMessage
        ? html`<div class=${captionStyle({ error, size })} id="help-text">
            ${validationMessage || caption}
          </div>`
        : null;
    const ClearTemplate = () =>
      clearable && value
        ? html`<div
            class=${clearButton() + suffix()}
            @click=${this.handleClearClick}
            role="button"
            aria-label="Clear input"
            tabindex="0"
          >
            <plus-svg-icon iconName="xmark"></plus-svg-icon>
          </div>`
        : null;

    const PasswordToggleTemplate = () =>
      passwordToggle && this.type === 'password'
        ? html`<div
            class=${passwordToggleButton() + suffix()}
            @click=${this.handlePasswordToggle}
            role="button"
            aria-label=${passwordVisible ? 'Hide password' : 'Show password'}
            tabindex="0"
          >
            <plus-svg-icon
              iconName=${passwordVisible ? 'eye' : 'eye-slash'}
            ></plus-svg-icon>
          </div>`
        : null;

    return html`<div
      class=${host()}
      @click=${(e: MouseEvent) => {
        if (disabled || readonly) e.stopPropagation();
      }}
    >
      ${LabelTemplate()}
      <div class=${inputWrapper()} @click=${() => this.input.focus()}>
        ${prefixIcon
          ? html`<div class=${prefix()} aria-hidden="true">
              <plus-svg-icon iconName=${prefixIcon}></plus-svg-icon>
            </div>`
          : null}
        <slot
          name="prefix"
          class=${prefix() + ' hidden'}
          @slotchange=${this.handleSlotchange}
        ></slot>
        <input
          id="input"
          type="text"
          class=${inputElement()}
          type=${this.type === 'password' && this.passwordVisible
            ? 'text'
            : this.type}
          title=${this.title}
          name=${ifDefined(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${readonly || isSelect}
          ?required=${required}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step as number)}
          .value=${live(this.value)}
          autocomplete=${ifDefined(this.autocomplete)}
          autocorrect=${ifDefined(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${ifDefined(this.pattern)}
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode=${ifDefined(this.inputmode)}
          aria-describedby=${ifDefined(
            caption || validationMessage ? 'help-text' : undefined
          )}
          aria-invalid=${error}
          aria-required=${required}
          aria-disabled=${disabled}
          aria-readonly=${readonly}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          @keydown=${this.handleKeyDown}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        />
        ${ClearTemplate()} ${PasswordToggleTemplate()}
        <slot
          name="suffix"
          class=${suffix() + ' hidden'}
          @slotchange=${this.handleSlotchange}
        ></slot>
        ${suffixIcon
          ? html`<div class=${suffix()} aria-hidden="true">
              <plus-svg-icon iconName=${suffixIcon}></plus-svg-icon>
            </div>`
          : null}
      </div>
      ${CaptionTemplate()}
    </div>`;
  }
}

export { PlusInput };
