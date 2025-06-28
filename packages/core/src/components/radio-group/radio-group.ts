import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { PlusRadio } from '../radio/radio';
import { radioGroupStyle } from './radio-group.style';

export default class PlusRadioGroup extends Tailwind {
  static formAssociated = true;

  @property()
  name = '';

  @property()
  value = '';

  /** Disables all radio buttons in the group. */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  disabled = false;

  /** Makes the radio group required for form submission. */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  required = false;

  /**
   * The size of all radio buttons in the group
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /** Displays the radio buttons in an error state. */
  @property({ type: Boolean, converter: booleanConverter })
  error = false;

  /**
   * Orientation of the radio buttons
   * - horizontal: Radio buttons are arranged side by side
   * - vertical: Radio buttons are stacked vertically
   */
  @property()
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  private updateRadios() {
    const radios = this.querySelectorAll('plus-radio');
    radios.forEach((element) => {
      const radio = element as PlusRadio;
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      radio.disabled = this.disabled;
      radio.size = this.size;
      radio.error = this.error;
    });
  }

  private handlePlusChange(event: CustomEvent) {
    const target = event.target as PlusRadio;
    const detail = event.detail;

    if (detail?.checked) {
      // Update all radio buttons in the group
      const radios = this.querySelectorAll('plus-radio');
      radios.forEach((element) => {
        const radio = element as PlusRadio;
        if (radio !== target) {
          radio.checked = false;
        }
      });

      // Update the value
      this.value = detail.value;

      // Update form value
      this.internals.setFormValue(this.value);

      // Emit group change event
      this.emit('plus-group-change', {
        detail: {
          value: this.value,
          name: this.name,
        },
        bubbles: true,
        composed: true,
      });
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('name') ||
      changedProperties.has('value') ||
      changedProperties.has('disabled') ||
      changedProperties.has('size') ||
      changedProperties.has('error')
    ) {
      this.updateRadios();
    }
  }

  override firstUpdated() {
    // Find any radio with checked attribute and use its value
    const checkedRadio = Array.from(this.querySelectorAll('plus-radio')).find(
      (radio) => radio.hasAttribute('checked')
    ) as PlusRadio | undefined;

    if (checkedRadio && !this.value) {
      this.value = checkedRadio.value;
    }

    this.updateRadios();

    if (this.value) {
      this.internals.setFormValue(this.value);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('plus-change', (e: Event) =>
      this.handlePlusChange(e as CustomEvent)
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      'plus-change',
      this.handlePlusChange as EventListener
    );
  }

  override render() {
    const { base } = radioGroupStyle({
      orientation: this.orientation,
    });

    return html`
      <div
        role="radiogroup"
        part="base"
        class=${base()}
        aria-required=${this.required}
        aria-labelledby=${this.name}
      >
        <input type="hidden" name=${this.name} .value=${this.value || ''} />
        <slot @slotchange=${() => this.updateRadios()}></slot>
      </div>
    `;
  }
}

export { PlusRadioGroup };
