import { property, queryAssignedElements } from 'lit/decorators.js';
import { html } from 'lit';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { checkboxGroupStyle } from './checkbox-group.style';
import type { PlusCheckbox } from '../checkbox/checkbox.js';

/**
 * @tag plus-checkbox-group
 *
 * A container for grouping related checkboxes.
 *
 * @slot - Default slot for `plus-checkbox` elements.
 *
 * @csspart base - The main container element.
 *
 * @event plus-change - Emitted when the value of the group changes (any checkbox is checked/unchecked).
 */
export class PlusCheckboxGroup extends Tailwind {
  @queryAssignedElements({ selector: 'plus-checkbox', flatten: true })
  private checkboxes!: Array<PlusCheckbox>;

  /** The selected values in the group. */
  @property({ type: Array })
  value: string[] = [];

  /** Whether to display the checkboxes vertically. */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  vertical = false;

  /** The size of the checkboxes in the group. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Whether the entire group is disabled. */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  disabled = false;

  private handleSlotChange() {
    this.updateCheckboxes();
  }

  private updateCheckboxes() {
    if (!this.checkboxes) return;
    this.checkboxes.forEach((checkbox) => {
      checkbox.size = this.size;
      checkbox.disabled = this.disabled;
      checkbox.checked = this.value.includes(checkbox.value ?? '');
    });
  }

  private handleCheckboxChange = (event: CustomEvent) => {
    if (event.target === this) {
      return;
    }

    const target = event.target as PlusCheckbox;
    if (!this.checkboxes.includes(target)) {
      return;
    }

    const targetValue = target.value ?? '';

    const oldValue = [...this.value];

    if (target.checked) {
      if (!this.value.includes(targetValue)) {
        this.value = [...this.value, targetValue];
      }
    } else {
      this.value = this.value.filter((v) => v !== targetValue);
    }

    if (JSON.stringify(oldValue) !== JSON.stringify(this.value)) {
      this.updateCheckboxes();
      this.emit('plus-change', { detail: { value: this.value } });
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      'plus-change',
      this.handleCheckboxChange as EventListener
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      'plus-change',
      this.handleCheckboxChange as EventListener
    );
  }

  override render() {
    const { base } = checkboxGroupStyle({ vertical: this.vertical });

    return html`
      <div
        part="base"
        role="group"
        class=${base()}
        @slotchange=${this.handleSlotChange}
      >
        <slot></slot>
      </div>
    `;
  }
}
