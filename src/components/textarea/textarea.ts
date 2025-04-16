import { html, css, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { textareaStyle, labelStyle, captionStyle } from './textarea.style';

/**
 * @tag plus-textarea
 * @summary A form-associated textarea component with validation and styling.
 *
 * @csspart textarea - The native textarea element
 * @csspart label - The label element
 * @csspart caption - The caption/error message container
 *
 * @event plus-input - Emitted when the textarea value changes
 * @event plus-change - Emitted when the textarea value changes and loses focus
 * @event plus-focus - Emitted when the textarea gains focus
 * @event plus-blur - Emitted when the textarea loses focus
 * @event plus-invalid - Emitted when the textarea value is invalid
 *
 * @cssprop [--focus-ring-color=--primary-500] - Color of the focus ring
 * @cssprop [--error-color=--red-500] - Color used for error states
 */
export class PlusTextarea extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        /* Base host styles from tv definition */
        font-family: var(--plus-font-sans);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        position: relative;
        max-width: var(--plus-size-md); /* Default max-width or from theme */
      }
      :host([full-width]) {
        max-width: none;
      }
      /* Apply host variant styles directly if needed, e.g., disabled cursor */
      :host([disabled]) {
        cursor: not-allowed;
      }
    `,
  ];

  @query('textarea')
  textarea!: HTMLTextAreaElement;

  @state() private hasFocus = false;
  @state() private validationMessage = '';

  /** The textarea's name attribute. */
  @property() name = '';

  /** The textarea's value attribute. */
  @property() value = '';

  /** The textarea's placeholder text. */
  @property() placeholder = '';

  /** The size variant of the textarea. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Whether the textarea is disabled. */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  disabled = false;

  /** Whether the textarea is readonly. */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  readonly = false;

  /** Whether the textarea is required. */
  @property({ type: Boolean, converter: (value) => value != 'false' })
  required = false;

  /** The label for the textarea. */
  @property({ type: String }) label?: string;

  /** The minimum length of the value. */
  @property({ type: Number }) minlength?: number;

  /** The maximum length of the value. */
  @property({ type: Number }) maxlength?: number;

  /** Whether the textarea should automatically get focus. */
  @property({ type: Boolean }) autoFocus?: boolean;

  /** Caption text to display below the textarea. */
  @property({ type: String }) caption?: string;

  /** Whether the textarea is in an error state. */
  @property({ type: Boolean, converter: (value) => value != 'false' }) error =
    false;

  /** The error message to display (overrides default validation messages). */
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';

  /** Whether the textarea should take up full width. */
  @property({ reflect: true, attribute: 'full-width', type: Boolean })
  fullWidth = false;

  /** Specifies the visible number of lines in a text area. */
  @property({ type: Number }) rows = 4;

  /** Controls how the textarea can be resized. */
  @property({ reflect: true }) resize:
    | 'none'
    | 'vertical'
    | 'horizontal'
    | 'both' = 'vertical';

  /** Specifies how the text in a text area is to be wrapped when submitted in a form. */
  @property() wrap: 'hard' | 'soft' | 'off' = 'soft';

  /** Checks the validity of the textarea against constraints. */
  public checkValidity(): boolean {
    return this.textarea.checkValidity();
  }

  /** Reports the validity state to the user. */
  public reportValidity(): boolean {
    const isValid = this.checkValidity();
    this.validationMessage = this.getValidationMessage();
    this.error = !isValid;
    return isValid;
  }

  /** Sets a custom validation message. */
  public setCustomValidity(message: string): void {
    this.textarea.setCustomValidity(message);
    this.validationMessage = message;
    this.error = message !== '';
  }

  private handleBlur() {
    this.hasFocus = false;
    this.validate();
    this.emit('plus-blur');
  }

  private handleChange() {
    this.value = this.textarea.value;
    this.emit('plus-change');
    this.validate();
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('plus-focus');
  }

  private handleInput() {
    this.value = this.textarea.value;
    if (this.error) {
      this.validate();
    }
    this.emit('plus-input');
  }

  private handleInvalid(event: Event) {
    event.preventDefault(); // Prevent default browser validation UI
    const isValid = this.textarea.validity.valid;
    const validationMessage = this.getValidationMessage();
    this.validationMessage = validationMessage;
    this.error = !isValid;
    if (!isValid) {
      this.emit('plus-invalid', { detail: { validationMessage } });
    }
  }

  /** Gets the appropriate validation message. */
  private getValidationMessage(): string {
    // Use custom error message first if provided and error state is true
    if (this.error && this.errorMessage) {
      return this.errorMessage;
    }

    // Fallback to native validation message
    if (!this.textarea?.validity.valid) {
      // Basic messages (can be expanded)
      const validity = this.textarea.validity;
      if (validity.valueMissing) return 'This field is required';
      if (validity.tooLong)
        return `Please use no more than ${this.maxlength} characters`;
      if (validity.tooShort)
        return `Please use at least ${this.minlength} characters`;
      return this.textarea.validationMessage || 'Please correct the error';
    }

    return '';
  }

  /** Validates the textarea and updates state. */
  private validate() {
    const isValid = this.checkValidity();
    const validationMessage = this.getValidationMessage();

    this.validationMessage = validationMessage;
    this.error = !isValid;
  }

  override render() {
    const { label, size, required, caption, error, validationMessage } = this;

    // Get styles from tv
    const styles = textareaStyle({
      size: this.size,
      error: this.error,
      disabled: this.disabled,
      readonly: this.readonly,
      resize: this.resize,
      fullWidth: this.fullWidth, // Pass fullWidth to host slot styles
    });

    const LabelTemplate = () =>
      label
        ? html`<label class=${labelStyle({ size, required })} for="textarea"
            >${label}</label
          >`
        : nothing;

    const CaptionTemplate = () => {
      const textToShow =
        error && validationMessage ? validationMessage : caption;
      return textToShow
        ? html`<div class=${captionStyle({ error, size })} id="help-text">
            ${textToShow}
          </div>`
        : nothing;
    };

    return html`
      <div class=${styles.host()}>
        ${LabelTemplate()}
        <div class=${styles.textareaWrapper()}>
          <textarea
            id="textarea"
            class=${styles.textareaElement()}
            name=${ifDefined(this.name)}
            .value=${live(this.value)}
            placeholder=${ifDefined(this.placeholder)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            rows=${ifDefined(this.rows)}
            wrap=${ifDefined(this.wrap)}
            ?autofocus=${this.autoFocus}
            aria-describedby=${ifDefined(
              caption || validationMessage ? 'help-text' : undefined
            )}
            aria-invalid=${this.error}
            aria-required=${this.required}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          ></textarea>
        </div>
        ${CaptionTemplate()}
      </div>
    `;
  }
}
