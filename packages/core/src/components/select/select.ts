import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { Tailwind } from '../base/tailwind-base';
import { css, html, PropertyValues } from 'lit';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom';
import { selectStyle } from './select.style';
import { PlusSelectItem } from '../select-item';
import { booleanConverter } from '../../utils/boolean-converter';

/**
 * A select component that provides a collapsible menu with selectable options.
 * Uses Floating UI for intelligent positioning of the select menu.
 *
 * @tag plus-select
 * @slot - The default slot for the select trigger button content
 * @slot suffix - Slot for adding content to the right side of the trigger button
 * @slot select-item - Slot for select menu items
 * @csspart base - The component's base wrapper
 * @csspart select - The select trigger input
 * @csspart select-box - The select list container
 * @event plus-select-open - Emitted when the select is opened
 * @event plus-select-close - Emitted when the select is closed
 * @event plus-select-selected-item - Emitted when an item is selected, with the selected item in detail
 */
export default class PlusSelect extends Tailwind {
  /**
   * CSS styles for the component, including Tailwind base styles and custom styles.
   */
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: inline-block;
        width: 100%;
        max-width: 256px;
        position: relative;
      }
      :host([full-width]) {
        max-width: 100%;
      }
    `,
  ];

  /**
   * Queries all select items assigned to the 'select-item' slot.
   * @private
   */
  @queryAssignedElements({ selector: 'plus-select-item', slot: 'select-item' })
  slots!: PlusSelectItem[];

  /**
   * Sets the size of the select button.
   * @values 'sm' | 'md' | 'lg'
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Placeholder text for the select trigger input.
   * @default ''
   */
  @property({ type: String })
  placeholder: string = '';

  /**
   * Label text for the select.
   * @default ''
   */
  @property({ type: String })
  label: string = '';

  /**
   * Indicates if the select is in an error state.
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  error: boolean = false;

  /**
   * Disables the select, preventing interaction.
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  disabled: boolean = false;

  /**
   * Marks the select as required.
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  required: boolean = false;

  /**
   * Makes the select read-only, preventing changes.
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  readonly: boolean = false;

  /**
   * Caption text displayed below the select.
   */
  @property({ type: String })
  caption?: string;

  /**
   * Enables a clear button to reset the selection.
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  clearable: boolean = false;

  /**
   * Makes the select full width.
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: booleanConverter,
    attribute: 'full-width',
  })
  fullWidth = false;

  /**
   * Tracks the visibility state of the select menu.
   * @private
   */
  @state()
  private isVisible: boolean = false;

  /**
   * Stores the currently selected select item.
   * @private
   */
  @state()
  private selectedItem: PlusSelectItem | null = null;

  /**
   * Reference to the select trigger input element.
   * @private
   */
  private targetElement: HTMLElement | null = null;

  /**
   * Reference to the select menu container.
   * @private
   */
  private selectBox: HTMLElement | null = null;

  /**
   * Cleanup function for Floating UI's autoUpdate.
   * @private
   */
  private cleanup?: () => void;

  /**
   * Unique ID for ARIA relationship between the trigger and select menu.
   * @private
   */
  private selectId: string = `select-${Math.random().toString(36).substring(2, 9)}`;

  /**
   * Updates the select menu's position using Floating UI.
   * @private
   */
  private updatePosition = (): void => {
    if (!this.selectBox || !this.targetElement) return;

    requestAnimationFrame(() => {
      computePosition(this.targetElement!, this.selectBox!, {
        placement: 'bottom-start' as Placement,
        middleware: [
          offset(6),
          shift({ padding: 4, boundary: document.documentElement }),
          flip({
            fallbackPlacements: ['top-start', 'bottom-start'],
            padding: 4,
          }),
        ],
      }).then(({ x, y }) => {
        Object.assign(this.selectBox!.style, { left: `${x}px`, top: `${y}px` });
      });
    });
  };

  /**
   * Handles click events on the select trigger input to toggle the menu.
   * @private
   */
  private handleClick = (): void => {
    if (this.disabled || this.readonly) return;

    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      if (!this.targetElement || !this.selectBox) {
        console.error('Target element or select-box is not available');
        return;
      }
      this.updatePosition();
      this.cleanup = autoUpdate(
        this.targetElement,
        this.selectBox,
        this.updatePosition
      );
      this.emit('plus-select-open');
    } else {
      this.cleanupAutoUpdate();
      this.emit('plus-select-close');
    }
  };

  /**
   * Handles keyboard navigation for select items.
   * @param event - The keyboard event
   * @private
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled || this.readonly) return;

    const items = this.slots.filter((item) => !item.disabled);
    const currentIndex = items.indexOf(this.selectedItem as PlusSelectItem);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        newIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Enter':
      case ' ':
        if (this.selectedItem) {
          this.handleItemClick(new Event('click'));
        }
        break;
      case 'Escape':
        this.isVisible = false;
        this.cleanupAutoUpdate();
        break;
      case 'Tab':
        this.isVisible = false;
        this.cleanupAutoUpdate();
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      this.selectedItem = items[newIndex];
      this.slots.forEach((item) => {
        item.selected = item === this.selectedItem;
      });
    }

    event.preventDefault();
  };

  /**
   * Handles click events on select items to select them.
   * @param event - The click event
   * @private
   */
  private handleItemClick = (event: Event): void => {
    const target = event.target as HTMLElement;
    const clickedItem = this.slots.find((item) => item.contains(target));
    if (clickedItem && !clickedItem.disabled) {
      this.selectedItem = clickedItem;
      this.slots.forEach((item) => {
        item.selected = item === clickedItem;
      });
      this.emit('plus-select-selected-item', {
        detail: { selectedItem: this.selectedItem },
      });
      this.isVisible = false;
      this.cleanupAutoUpdate();
    }
  };

  /**
   * Handles changes to the 'select-item' slot to update item properties.
   * @private
   */
  private handleSlotChange = (): void => {
    this.slots.forEach((item) => {
      item.size = this.size;
      item.disabled = this.disabled || item.disabled;
    });
  };

  /**
   * Initializes the component after it is first updated.
   * @param changedProperties - Map of changed properties
   * @private
   */
  override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.targetElement = this.shadowRoot?.querySelector('plus-input') || null;
    this.selectBox = this.shadowRoot?.querySelector('.select-box') || null;
    this.selectedItem = this.slots.find((item) => item.selected) || null;

    const slot = this.shadowRoot?.querySelector('slot[name="select-item"]');
    slot?.addEventListener('slotchange', this.handleSlotChange);

    this.handleSlotChange();

    if (this.targetElement) {
      this.targetElement.addEventListener('click', this.handleClick);
      this.targetElement.addEventListener('keydown', this.handleKeyDown);
    } else {
      console.error('Target element (plus-input) not found');
    }

    if (this.selectBox) {
      this.selectBox.addEventListener('click', this.handleItemClick);
    } else {
      console.error('Select box not found');
    }

    document.addEventListener('click', this.handleOutsideClick, true);
  }

  /**
   * Handles clicks outside the select to close it.
   * @param event - The click event
   * @private
   */
  private handleOutsideClick = (event: Event): void => {
    const path = event.composedPath();
    if (
      this.selectBox &&
      this.targetElement &&
      !path.includes(this.selectBox) &&
      !path.includes(this.targetElement)
    ) {
      this.isVisible = false;
      this.cleanupAutoUpdate();
    }
  };

  /**
   * Cleans up the Floating UI autoUpdate subscription.
   * @private
   */
  private cleanupAutoUpdate(): void {
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
    }
  }

  /**
   * Cleans up event listeners and subscriptions when the component is removed from the DOM.
   * @private
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.cleanupAutoUpdate();
    if (this.targetElement) {
      this.targetElement.removeEventListener('click', this.handleClick);
      this.targetElement.removeEventListener('keydown', this.handleKeyDown);
    }
    if (this.selectBox) {
      this.selectBox.removeEventListener('click', this.handleItemClick);
    }
    document.removeEventListener('click', this.handleOutsideClick, true);
    const slot = this.shadowRoot?.querySelector('slot[name="select-item"]');
    slot?.removeEventListener('slotchange', this.handleSlotChange);
  }

  // setValue(value: string) {
  //   const item = this.slots.find((item) => item.getAttribute("value") === value);
  //   if (item) {
  //     this.selectedItem = item;
  //   }
  // }

  /**
   * Renders the select component.
   * @returns The rendered template
   */
  override render() {
    return html`
      <plus-input
        .value=${(this.selectedItem?.text || this.selectedItem?.outerText) ??
        ''}
        .error=${this.error}
        .caption=${this.caption}
        .clearable=${this.clearable}
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .size=${this.size}
        .placeholder=${this.placeholder}
        .label=${this.label}
        .required=${this.required}
        .isSelect=${true}
        aria-expanded=${this.isVisible}
        aria-haspopup="listbox"
        aria-autocomplete="none"
        role="combobox"
        part="select"
        suffix-icon=${this.isVisible ? 'chevron-up' : 'chevron-down'}
        ?full-width=${this.fullWidth}
      ></plus-input>
      <div
        id=${this.selectId}
        class=${selectStyle({
          isOpen: this.isVisible,
          fullWidth: this.fullWidth,
        })}
        role="listbox"
        aria-label="Select options"
        ?hidden=${!this.isVisible}
        part="select-box"
      >
        <slot name="select-item"></slot>
      </div>
    `;
  }
}

export { PlusSelect };
