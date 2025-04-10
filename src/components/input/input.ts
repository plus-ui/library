import { html, css, nothing } from 'lit';
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
 * PlusInput is a modern and customizable form input component.
 * It provides various input types, validation, accessibility, and styling features.
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

  /**
   * Reference to the native input element
   * @private
   */
  @query('input')
  input!: HTMLInputElement;

  /**
   * Indicates if the input has focus
   * @private
   */
  @state() private hasFocus = false;

  /**
   * Validation message for the input
   * @private
   */
  @state() private validationMessage = '';

  /**
   * The type of input
   * @type {'date'|'datetime-local'|'email'|'number'|'password'|'search'|'tel'|'text'|'time'|'url'}
   * @default 'text'
   */
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

  /**
   * The name of the input
   * @type {string}
   * @default ''
   */
  @property() name = '';

  /**
   * The value of the input
   * @type {string}
   * @default ''
   */
  @property() value = '';

  /**
   * The placeholder text
   * @type {string}
   * @default ''
   */
  @property() placeholder = '';

  /**
   * The size of the input
   * @type {'sm'|'md'|'lg'}
   * @default 'md'
   */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the input should have a clear button
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  clearable = false;

  /**
   * Whether the input is disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  disabled = false;

  /**
   * Whether the input is readonly
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  readonly = false;

  /**
   * Whether the input is required
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  required = false;

  /**
   * Whether to show a password toggle button
   * @type {boolean}
   * @default false
   */
  @property({ attribute: 'password-toggle', type: Boolean }) passwordToggle =
    false;

  /**
   * Whether the password is visible
   * @type {boolean}
   * @default false
   */
  @property({ attribute: 'password-visible', type: Boolean }) passwordVisible =
    false;

  /**
   * The label for the input
   * @type {string}
   */
  @property({ type: String }) label?: string;

  /**
   * The validation pattern for the input
   * @type {string}
   */
  @property() pattern?: string;

  /**
   * The minimum length of the input value
   * @type {number}
   */
  @property({ type: Number }) minlength?: number;

  /**
   * The maximum length of the input value
   * @type {number}
   */
  @property({ type: Number }) maxlength?: number;

  /**
   * The minimum value of the input
   * @type {number|string}
   */
  @property() min?: number | string;

  /**
   * The maximum value of the input
   * @type {number|string}
   */
  @property() max?: number | string;

  /**
   * The step value for numeric inputs
   * @type {number|'any'}
   */
  @property() step?: number | 'any';

  /**
   * Whether autocorrect is enabled
   * @type {'off'|'on'}
   */
  @property() autocorrect?: 'off' | 'on';

  /**
   * The autocomplete attribute
   * @type {string}
   */
  @property() autocomplete?: string;

  /**
   * Whether the input should automatically get focus
   * @type {boolean}
   */
  @property({ type: Boolean }) autoFocus?: boolean;

  /**
   * The enterkeyhint attribute
   * @type {'enter'|'done'|'go'|'next'|'previous'|'search'|'send'}
   */
  @property() enterkeyhint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';

  /**
   * The inputmode attribute
   * @type {'none'|'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url'}
   */
  @property() inputmode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';

  /**
   * Whether spellcheck is enabled
   * @type {boolean}
   */
  @property({ type: Boolean }) spellCheck?: boolean;

  /**
   * Caption text to display below the input
   * @type {string}
   */
  @property({ type: String }) caption?: string;

  /**
   * Whether the input is in an error state
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value != 'false' }) error =
    false;

  /**
   * The error message to display
   * @type {string}
   * @default ''
   */
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';

  /**
   * Whether the input should take up full width
   * @type {boolean}
   * @default false
   */
  @property({ reflect: true, attribute: 'full-width', type: Boolean })
  fullWidth = false;

  /**
   * Whether the input is used as part of a select component
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  isSelect = false;

  /**
   * Icon name for the prefix icon
   * @type {string}
   */
  @property({ type: String, attribute: 'prefix-icon' }) prefixIcon?: string;

  /**
   * Icon name for the suffix icon
   * @type {string}
   */
  @property({ type: String, attribute: 'suffix-icon' }) suffixIcon?: string;

  /**
   * Checks if the input is valid
   * @returns {boolean} True if the input is valid, false otherwise
   */
  public checkValidity(): boolean {
    return this.input.validity.valid;
  }

  /**
   * Reports the validity of the input to the user
   * @returns {boolean} True if the input is valid, false otherwise
   */
  public reportValidity(): boolean {
    const isValid = this.checkValidity();
    if (!isValid) {
      this.validate();
    }
    return isValid;
  }

  /**
   * Sets a custom validation message
   * @param {string} message The validation message
   */
  public setCustomValidity(message: string): void {
    this.input.setCustomValidity(message);
    if (message) {
      this.error = true;
      this.caption = message;
      this.validationMessage = message;
    } else {
      this.error = false;
      if (this.caption === this.validationMessage) {
        this.caption = '';
      }
      this.validationMessage = '';
    }
  }

  /**
   * Called when the input loses focus
   * @private
   */
  private handleBlur() {
    this.hasFocus = false;
    this.emit('plus-blur');
    this.validate();
  }

  /**
   * Called when the input value changes
   * @private
   */
  private handleChange() {
    this.value = this.input.value;
    this.emit('plus-change');
    this.validate();
  }

  /**
   * Called when the clear button is clicked
   * @param {MouseEvent} event The event object
   * @private
   */
  private handleClearClick(event: MouseEvent) {
    this.value = '';
    this.emit('plus-clear');
    this.emit('plus-input');
    this.emit('plus-change');
    this.input.focus();
    this.validate();

    event.stopPropagation();
  }

  /**
   * Called when the password toggle button is clicked
   * @param {MouseEvent} event The event object
   * @private
   */
  private handlePasswordToggle(event: MouseEvent) {
    this.passwordVisible = !this.passwordVisible;
    this.emit('plus-password-toggle', {
      detail: { visible: this.passwordVisible },
    });
    event.stopPropagation();
  }

  /**
   * Called when the input receives focus
   * @private
   */
  private handleFocus() {
    this.hasFocus = true;
    this.emit('plus-focus');
  }

  /**
   * Called when the input value changes
   * @private
   */
  private handleInput() {
    this.value = this.input.value;
    this.emit('plus-input');
    this.error = false;
    this.validationMessage = '';
  }

  /**
   * Gets the validation message for the input
   * @returns {string} The validation message
   * @private
   */
  private getValidationMessage(): string {
    const validity = this.input.validity;

    if (validity.valueMissing) {
      return 'This field is required';
    }

    if (validity.typeMismatch && this.type === 'email') {
      return 'Please enter a valid email address';
    }

    if (validity.patternMismatch) {
      return 'Please match the requested format';
    }

    if (validity.tooLong) {
      return `Please use no more than ${this.maxlength} characters`;
    }

    if (validity.tooShort) {
      return `Please use at least ${this.minlength} characters`;
    }

    if (validity.rangeUnderflow) {
      return `Please enter a value greater than or equal to ${this.min}`;
    }

    if (validity.rangeOverflow) {
      return `Please enter a value less than or equal to ${this.max}`;
    }

    if (validity.stepMismatch) {
      return `Please enter a valid value. The nearest valid value is ${this.getStepValue()}`;
    }

    if (validity.badInput) {
      return 'Please enter a valid value';
    }

    return this.input.validationMessage || 'Please correct the error';
  }

  /**
   * Validates the input
   * @private
   */
  private validate() {
    const isValid = this.input.validity.valid;

    if (isValid) {
      this.error = false;
      this.validationMessage = '';
      // Only clear caption if it was set by validation
      if (this.caption === this.validationMessage) {
        this.caption = '';
      }
      return;
    }

    this.error = true;
    this.validationMessage = this.getValidationMessage();
    this.caption = this.validationMessage;

    this.emit('plus-invalid', {
      detail: {
        message: this.validationMessage,
        validity: this.input.validity,
      },
    });
  }

  /**
   * Called when the input is invalid
   * @param {Event} event The event object
   * @private
   */
  private handleInvalid(event: Event) {
    event.preventDefault();
    this.validate();
  }

  /**
   * Called when a key is pressed
   * @param {KeyboardEvent} event The event object
   * @private
   */
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

  /**
   * Calculates the step value
   * @returns {number} The calculated step value
   * @private
   */
  private getStepValue(): number {
    const value = parseFloat(this.value);
    const step = parseFloat(this.step as string) || 1;
    const min = parseFloat(this.min as string) || 0;
    return Math.round((value - min) / step) * step + min;
  }

  /**
   * Called when a slot changes
   * @param {Event} e The event object
   * @private
   */
  handleSlotchange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const childNodes = slot.assignedNodes({ flatten: true });
    if (childNodes.length) {
      slot.style.display = 'flex';
    }
  }

  /**
   * Renders the component
   * @returns {TemplateResult} The template to render
   * @override
   */
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
        : nothing;
    const CaptionTemplate = () =>
      html`<div class=${captionStyle({ error, size })} id="help-text">
        ${validationMessage || caption}
      </div>`;
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
        : nothing;

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
        : nothing;

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
          : nothing}
        <slot
          name="prefix"
          class=${prefix() + ' hidden'}
          @slotchange=${this.handleSlotchange}
        ></slot>
        <input
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
          : nothing}
      </div>
      ${CaptionTemplate()}
    </div>`;
  }
}

export { PlusInput };
