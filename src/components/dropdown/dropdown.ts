import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { Tailwind } from '../base/tailwind-base';
import { html, PropertyValues } from 'lit';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom';
import { dropdownStyle } from './dropdown.style';
import { PlusDropDownItem } from '../dropdown-item';

/**
 * @tag plus-dropdown
 * @since 0.0.0
 * @status experimental
 *
 * PlusDropdown provides a collapsible menu that displays a list of selectable options.
 * It uses Floating UI for intelligent positioning that adjusts based on available space.
 *
 * @slot - The default slot for the dropdown trigger button content
 * @slot suffix - Slot for adding content to the right side of the trigger button
 * @slot dropdown-item - Slot for dropdown menu items
 *
 * @csspart base - The component's base wrapper
 * @csspart button - The dropdown trigger button
 * @csspart dropdown-box - The dropdown list container
 *
 * @event plus-dropdown-open - Emitted when the dropdown is opened
 * @event plus-dropdown-close - Emitted when the dropdown is closed
 * @event plus-dropdown-selected-item - Emitted when an item is selected with the selected item in detail
 *
 * @cssproperty --dropdown-bg - Controls the background color of the dropdown panel
 * @cssproperty --dropdown-border - Controls the border of the dropdown panel
 * @cssproperty --dropdown-shadow - Controls the shadow of the dropdown panel
 * @cssproperty --dropdown-z-index - Controls the z-index of the dropdown panel
 */
export default class PlusDropdown extends Tailwind {
  /**
   * Query all dropdown items
   * @private
   */
  @queryAssignedElements({
    selector: 'plus-dropdown-item',
    slot: 'dropdown-item',
  })
  slots!: PlusDropDownItem[];

  /**
   * Sets the size of the dropdown button
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Sets the status/color variant of the dropdown button
   * - default: Neutral color scheme
   * - primary: Primary color scheme
   * - success: Green color scheme
   * - warning: Yellow color scheme
   * - danger: Red color scheme
   * - info: Blue color scheme
   * @default 'default'
   */
  @property({ type: String })
  status: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' =
    'default';

  /**
   * Determines the visual style of the dropdown button
   * - filled: Solid background color
   * - outlined: Transparent background with border
   * - dashed: Transparent background with dashed border
   * - text: No background or border
   * @default 'filled'
   */
  @property({ type: String })
  kind: 'filled' | 'outlined' | 'dashed' | 'text' = 'filled';

  /**
   * Disables the dropdown interaction
   * @default false
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Sets the text content of the dropdown button if no default slot is provided
   */
  @property({ type: String })
  text?: string;

  /**
   * Tracks whether the dropdown is open or closed
   * @private
   */
  @state()
  private isVisible = false;

  /**
   * Tracks the currently selected dropdown item
   * @private
   */
  @state() private selectedItem: PlusDropDownItem | null = null;

  /**
   * Reference to the dropdown trigger button
   * @private
   */
  private targetElement: HTMLElement | null = null;

  /**
   * Reference to the dropdown container
   * @private
   */
  private dropdownBox: HTMLElement | null = null;

  /**
   * Cleanup function for Floating UI's autoUpdate
   * @private
   */
  private cleanup?: () => void;

  /**
   * Unique ID for the dropdown for ARIA relationship
   * @private
   */
  private dropdownId = `dropdown-${Math.random().toString(36).substring(2, 9)}`;

  /**
   * Updates the dropdown's position using Floating UI
   * @private
   */
  private updatePosition = () => {
    if (!this.dropdownBox || !this.targetElement) return;

    computePosition(this.targetElement, this.dropdownBox, {
      placement: 'bottom' as Placement,
      middleware: [
        offset(4),
        flip({
          fallbackPlacements: ['top', 'bottom', 'left', 'right'],
          padding: 4,
        }),
        shift({ padding: 4 }),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.dropdownBox!.style, { left: `${x}px`, top: `${y}px` });
    });
  };

  /**
   * Handles the click event for the trigger button
   * @private
   */
  private handleClick = () => {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      if (!this.targetElement || !this.dropdownBox) {
        console.error('Target element or dropdown box is not available');
        return;
      }
      this.updatePosition();
      this.cleanup = autoUpdate(
        this.targetElement,
        this.dropdownBox,
        this.updatePosition
      );
      this.emit('plus-dropdown-open');
    } else {
      this.cleanupAutoUpdate();
      this.emit('plus-dropdown-close');
    }
  };

  /**
   * Handles the click event for dropdown items
   * @param event The click event
   * @private
   */
  private handleItemClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const clickedItem = this.slots.find((item) => item.contains(target));
    if (clickedItem && !clickedItem.disabled) {
      this.selectedItem = clickedItem;
      this.slots.forEach((item) => {
        item.selected = item === clickedItem;
      });
      this.emit('plus-dropdown-selected-item', {
        detail: { selectedItem: this.selectedItem },
      });
      this.isVisible = false;
      this.cleanupAutoUpdate();
    }
  };

  /**
   * Lifecycle method called after the component's first update
   * @param _changedProperties Map of changed properties
   * @private
   */
  override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.targetElement = this.shadowRoot?.querySelector('plus-button') || null;
    this.dropdownBox = this.shadowRoot?.querySelector('.dropdown-box') || null;

    this.slots.forEach((item) => {
      item.size = this.size;
    });

    if (this.targetElement) {
      this.targetElement.addEventListener('click', this.handleClick);
    } else {
      console.error('Target element (plus-button) not found');
    }
    if (!this.dropdownBox) {
      console.error('Dropdown box not found');
    }
    document.addEventListener('click', this.handleOutsideClick, true);
    this.addEventListener('click', this.handleItemClick);
  }

  /**
   * Handles clicks outside of the dropdown to close it
   * @param event The click event
   * @private
   */
  private handleOutsideClick = (event: Event) => {
    const path = event.composedPath();
    if (
      this.dropdownBox &&
      this.targetElement &&
      !path.includes(this.dropdownBox) &&
      !path.includes(this.targetElement)
    ) {
      this.isVisible = false;
      this.cleanupAutoUpdate();
    }
  };

  /**
   * Cleans up the Floating UI autoUpdate subscription
   * @private
   */
  private cleanupAutoUpdate() {
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
    }
  }

  /**
   * Lifecycle method called when the component is removed from the DOM
   * @private
   */
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupAutoUpdate();
    if (this.targetElement) {
      this.targetElement.removeEventListener('click', this.handleClick);
    }
    document.removeEventListener('click', this.handleOutsideClick, true);
    this.removeEventListener('click', this.handleItemClick);
  }

  /**
   * Renders the dropdown component
   * @returns The rendered template
   */
  override render() {
    return html`
      <plus-button
        .disabled=${this.disabled}
        kind=${this.kind}
        status=${this.status}
        size=${this.size}
        aria-expanded=${this.isVisible}
        aria-haspopup="listbox"
        aria-controls=${this.dropdownId}
        role="button"
        part="button"
        ><slot>${this.text}</slot>
        <slot name="suffix">
          <plus-svg-icon
            iconName=${this.isVisible ? 'chevron-up' : 'chevron-down'}
            size="sm"
          ></plus-svg-icon>
        </slot>
      </plus-button>
      <div
        id=${this.dropdownId}
        class=${dropdownStyle({ isOpen: this.isVisible })}
        role="listbox"
        aria-hidden=${!this.isVisible}
        aria-orientation="vertical"
        part="dropdown-box"
      >
        <slot name="dropdown-item"></slot>
      </div>
    `;
  }
}

export { PlusDropdown };
