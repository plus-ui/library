import { property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { live } from 'lit/directives/live.js';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { checkboxStyle } from './checkbox.style';

/**
 * @tag plus-checkbox
 *
 * Checkbox component allowing users to select one or more options.
 *
 * @slot - The label for the checkbox.
 *
 * @csspart base - The component's base wrapper (label).
 * @csspart control - The container for the actual checkbox input and its visual representation.
 * @csspart checkbox - The visual representation of the checkbox.
 * @csspart icon - The checkmark or indeterminate icon.
 * @csspart label - The text label container.
 *
 * @property {boolean} error - If true, the checkbox is displayed in an error state.
 *
 * @event plus-change - Emitted when the checkbox's checked state changes.
 * @event plus-focus - Emitted when the checkbox gains focus.
 * @event plus-blur - Emitted when the checkbox loses focus.
 *
 * @cssproperty --checkbox-size - Controls the size of the checkbox control. Typically maps to sm, md, lg tokens.
 * @cssproperty --checkbox-color-default - Default background color.
 * @cssproperty --checkbox-color-checked - Background color when checked.
 * @cssproperty --checkbox-color-border - Border color.
 * @cssproperty --checkbox-color-border-checked - Border color when checked.
 * @cssproperty --checkbox-color-icon - Color of the checkmark/indeterminate icon.
 * @cssproperty --checkbox-border-color-error - Border color in the error state.
 */
export class PlusCheckbox extends Tailwind {
  // Indicate that this component can participate in forms
  static formAssociated = true;

  // Access the element internals API
  @state() private internals: ElementInternals;

  @query('input[type="checkbox"]') input!: HTMLInputElement;

  /** The checkbox's name, submitted as a name/value pair with form data. */
  @property()
  name?: string;

  /** The size of the checkbox. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Whether the checkbox is checked. */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  checked = false;

  /** Whether the checkbox is in an indeterminate state. */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  indeterminate = false;

  /** Whether the checkbox is disabled. */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  disabled = false;

  /** The value associated with the checkbox. Submitted with the form data if checked. */
  @property()
  value: string = 'on';

  /** Whether the checkbox is in an error state. */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  error = false;

  /** The text label displayed next to the checkbox. If not provided, use the default slot. */
  @property()
  text?: string;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.addEventListener('click', (event) => {
      // Prevent the click event from propagating from the host element
      // We rely on the internal input's click/change
      if (event.target === this) {
        event.stopPropagation();
      }
    });
  }

  private setFormValue() {
    // If checked, send the value; otherwise, send null.
    this.internals.setFormValue(this.checked ? this.value : null);
  }

  override updated(changedProperties: Map<string | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this.setFormValue();
    }
  }

  /**
   * Called when the associated form is reset.
   * Resets the checkbox to its initial checked state.
   * We need to specific attribute initialChecked
   */
  formResetCallback() {
    const initialChecked = this.hasAttribute('checked');
    this.checked = initialChecked;
    this.indeterminate = false;
    this.setFormValue();
  }

  /**
   * Called when the disabled state of the parent form changes.
   */
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  private handleFocus() {
    this.emit('plus-focus');
  }

  private handleBlur() {
    this.emit('plus-blur');
  }

  // private handleClick() {
  //   // No direct action needed here, handled by input change
  // }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;
    this.setFormValue(); // Update form value on change
    this.emit('plus-change');
  }

  /** Clicks the checkbox */
  override click() {
    this.input?.click();
  }

  /** Focuses the checkbox */
  override focus(options?: FocusOptions) {
    this.input?.focus(options);
  }

  /** Blurs the checkbox */
  override blur() {
    this.input?.blur();
  }

  override render() {
    const { base, control, checkbox, icon, label } = checkboxStyle({
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      disabled: this.disabled,
      error: this.error,
    });

    const uniqueId = `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    return html`
      <label part="base" for=${uniqueId} class=${base()}>
        <span part="control" class=${control()}>
          <input
            id=${uniqueId}
            type="checkbox"
            role="checkbox"
            class="sr-only"
            name=${this.name ?? ''}
            aria-checked=${this.indeterminate
              ? 'mixed'
              : this.checked
                ? 'true'
                : 'false'}
            aria-disabled=${this.disabled ? 'true' : 'false'}
            aria-invalid=${this.error ? 'true' : 'false'}
            .value=${this.value}
            .checked=${live(this.checked)}
            .indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @click=${(e: MouseEvent) => e.stopPropagation()}
          />
          <span part="checkbox" class=${checkbox()} aria-hidden="true">
            <plus-icon
              part="icon"
              class=${icon()}
              icon-name=${this.indeterminate ? 'minus' : 'check'}
            ></plus-icon>
          </span>
        </span>
        <span part="label" class=${label()}>
          <slot>${this.text}</slot>
        </span>
      </label>
    `;
  }
}
