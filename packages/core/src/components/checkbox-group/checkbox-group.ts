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

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('disabled') || changedProperties.has('size')) {
      this.updateCheckboxes();
    }
  }

  private handleSlotChange() {
    this.updateCheckboxes();
  }

  private updateCheckboxes() {
    if (!this.checkboxes) return;
    this.checkboxes.forEach((_checkbox) => {
      // We only want to update checkboxes that are direct children of this group.
      if (_checkbox.closest('plus-checkbox-group') !== this) {
        return;
      }
      const checkbox = _checkbox as PlusCheckbox & {
        _internalDisabled?: boolean;
      };
      checkbox.size = this.size;
      if (this.disabled) {
        if (checkbox._internalDisabled === undefined) {
          checkbox._internalDisabled = checkbox.disabled;
        }
        checkbox.disabled = true;
      } else {
        if (checkbox._internalDisabled !== undefined) {
          checkbox.disabled = checkbox._internalDisabled;
          checkbox._internalDisabled = undefined;
        }
      }
      checkbox.checked = this.value.includes(checkbox.value ?? '');
    });
  }

  private handleCheckboxChange = (event: CustomEvent) => {
    const target = event.target as HTMLElement;

    // We only want to handle clicks on direct plus-checkbox children
    if (target.tagName.toLowerCase() !== 'plus-checkbox') {
      return;
    }

    // IMPORTANT: Check if the event's target is a direct child of this group.
    if (target.closest('plus-checkbox-group') !== this) {
      return;
    }

    // Stop the event from bubbling up to the host, where the user might be listening.
    event.stopPropagation();

    const checkbox = target as PlusCheckbox;
    const targetValue = checkbox.value ?? '';

    const oldValue = [...this.value];

    if (checkbox.checked) {
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

  override render() {
    const { base } = checkboxGroupStyle({ vertical: this.vertical });

    return html`
      <div
        part="base"
        role="group"
        class=${base()}
        @slotchange=${this.handleSlotChange}
        @plus-change=${this.handleCheckboxChange}
      >
        <slot></slot>
      </div>
    `;
  }
}
