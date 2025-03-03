import { html } from 'lit';
import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { PlusRadio } from '../radio/radio';

export default class PlusRadioGroup extends Tailwind {
  static formAssociated = true;

  @property()
  name = '';

  @property()
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

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
      changedProperties.has('disabled')
    ) {
      this.updateRadios();
    }
  }

  override firstUpdated() {
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
    return html`
      <div
        role="radiogroup"
        part="base"
        class="contents"
        aria-required=${this.required}
      >
        <input type="hidden" name=${this.name} .value=${this.value || ''} />
        <slot @slotchange=${() => this.updateRadios()}></slot>
      </div>
    `;
  }
}

export { PlusRadioGroup };
