import { html } from 'lit';
import { Tailwind } from '../base/tailwind-base';
import { PlusSegmentedPickerItem } from '../segmented-picker-item';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { segmentedPickerStyle } from './segmented-picker.style';

export default class PlusSegmentedPicker extends Tailwind {
  @queryAssignedElements({
    selector: 'plus-segmented-picker-item',
  })
  slots!: PlusSegmentedPickerItem[];

  @property({ type: String, reflect: true })
  status: 'default' | 'primary' = 'default';

  @property({ type: String, reflect: true })
  shape: 'square' | 'circle' = 'square';

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
      child.groupName = this.groupName;

      child.addEventListener('item-changed', (event: CustomEvent | Event) => {
        const { detail } = event as CustomEvent;
        const changedItem = detail.item as PlusSegmentedPickerItem;
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

    const selectedItem = this.slots.find((child) => child.checked);
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
    });
    return html`
      <div class=${host()}>
        <div class=${animationOverlay()}></div>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

export { PlusSegmentedPicker };
