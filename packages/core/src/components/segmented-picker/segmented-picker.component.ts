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
  private isFirstRender = true;

  override firstUpdated(changedProperties: Map<string, unknown>) {
    super.firstUpdated(changedProperties);
    // Ensure overlay is positioned correctly after the component is fully rendered
    setTimeout(() => {
      const selectedItem = this.slots?.find(
        (child) => child.checked && !child.disabled
      );
      if (selectedItem) {
        this.updateOverlay(selectedItem);
      }
    }, 0);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (this.isFirstRender && this.slots && this.slots.length > 0) {
      this.isFirstRender = false;
      // Initialize overlay position immediately after first render
      const selectedItem = this.slots.find(
        (child) => child.checked && !child.disabled
      );
      if (selectedItem) {
        // Use requestAnimationFrame to ensure DOM is fully rendered
        requestAnimationFrame(() => {
          this.updateOverlay(selectedItem);
        });
      }
    }
  }

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

    // Update overlay position after slot changes
    const selectedItem = this.slots.find(
      (child) => child.checked && !child.disabled
    );
    if (selectedItem) {
      // Use requestAnimationFrame to ensure elements are properly sized
      requestAnimationFrame(() => {
        this.updateOverlay(selectedItem);
      });
    }
  }

  private updateOverlay(selectedItem: HTMLElement) {
    const overlay = this.shadowRoot?.querySelector(
      '.selection-overlay'
    ) as HTMLElement;

    if (!overlay) return;

    // Wait for the next frame to ensure all elements are properly rendered and sized
    requestAnimationFrame(() => {
      const parentRect = this.getBoundingClientRect();
      const itemRect = selectedItem.getBoundingClientRect();

      // If either element has no size, wait and try again
      if (parentRect.width === 0 || itemRect.width === 0) {
        setTimeout(() => this.updateOverlay(selectedItem), 10);
        return;
      }

      // Calculate offset relative to the parent's content area (including padding)
      const parentStyle = getComputedStyle(this);
      const parentPaddingLeft = parseFloat(parentStyle.paddingLeft) || 4; // Default to 4px (p-1 class)
      const offsetX = itemRect.left - parentRect.left - parentPaddingLeft;

      // Set initial position without transition for first render
      const isInitialRender = !overlay.style.transform;

      if (isInitialRender) {
        overlay.style.transition = 'none';
      }

      overlay.style.width = `${itemRect.width}px`;
      overlay.style.height = `${itemRect.height}px`;
      overlay.style.transform = `translateX(${offsetX}px)`;
      overlay.style.opacity = '1';

      // Re-enable transition after initial positioning
      if (isInitialRender) {
        requestAnimationFrame(() => {
          overlay.style.transition = '';
        });
      }
    });
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
