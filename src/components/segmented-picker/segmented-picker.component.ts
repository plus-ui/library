import { html } from 'lit';
import { Tailwind } from '../base/tailwind-base';
import { PlusSegmentedPickerItem } from '../segmented-picker-item';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { segmentedPickerStyle } from './segmented-picker.style';

/**
 * @tag plus-segmented-picker
 * @summary A segmented picker component that allows users to select one option from a group of options.
 *
 * @slot - The content of the segmented picker, should be plus-segmented-picker-item elements.
 *
 * @csspart host - The host element.
 * @csspart animation-overlay - The animation overlay element.
 *
 * @event plus-segmented-picker-item-changed - Emitted when an item is selected.
 * @eventDetail {item: PlusSegmentedPickerItem, value: string} - The selected item and its value.
 */
export default class PlusSegmentedPicker extends Tailwind {
  @queryAssignedElements({
    selector: 'plus-segmented-picker-item',
  })
  slots!: PlusSegmentedPickerItem[];

  /**
   * The status of the segmented picker.
   * @type {'default' | 'primary'}
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  status: 'default' | 'primary' = 'default';

  /**
   * The shape of the segmented picker.
   * @type {'square' | 'circle'}
   * @default 'square'
   */
  @property({ type: String, reflect: true })
  shape: 'square' | 'circle' = 'square';

  /**
   * The size of the segmented picker.
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  private readonly groupName = `group-${Math.random().toString(36).substring(2, 11)}`;

  private handleSlotChange() {
    if (this.slots && this.slots.length > 0) {
      const hasChecked = this.slots.some((child) => child.checked);
      if (!hasChecked) {
        this.slots[0].checked = true;
      }
    }

    this.slots.forEach((child) => {
      child.status = this.status;
      child.shape = this.shape;
      child.size = this.size;
      child.groupName = this.groupName;

      child.addEventListener('item-changed', (event: CustomEvent | Event) => {
        const { detail } = event as CustomEvent;
        const changedItem = detail.item as PlusSegmentedPickerItem;

        if (changedItem.disabled) {
          return;
        }

        this.slots.forEach((child) => {
          if (child !== changedItem) {
            child.checked = false;
          }
        });

        this.emit('plus-segmented-picker-item-changed', {
          detail: {
            item: changedItem,
            value: changedItem.value,
          },
        });

        this.updateOverlay(changedItem);
      });
    });

    const selectedItem = this.slots.find(
      (child) => child.checked && !child.disabled
    );
    if (selectedItem) {
      this.updateOverlay(selectedItem);
    }
  }

  private updateOverlay(selectedItem: HTMLElement) {
    const overlay = this.shadowRoot?.querySelector(
      '.selection-overlay'
    ) as HTMLElement;
    const parentRect = this.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();

    overlay.style.width = `${itemRect.width}px`;
    overlay.style.height = `${itemRect.height}px`;
    overlay.style.transform = `translateX(${itemRect.left - parentRect.left - 2}px)`;
  }

  override render() {
    const { host, animationOverlay } = segmentedPickerStyle({
      status: this.status,
      shape: this.shape,
      size: this.size,
    });
    return html`
      <div class=${host()} role="radiogroup" aria-label="Segmented picker">
        <div class=${animationOverlay()}></div>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

export { PlusSegmentedPicker };
