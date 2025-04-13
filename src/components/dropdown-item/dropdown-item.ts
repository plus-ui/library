import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';

/**
 * @tag plus-dropdown-item
 *
 * Dropdown item component that represents a selectable option within a dropdown menu.
 * Automatically registers itself as a dropdown-item slot.
 *
 * @slot - The default slot for dropdown item content
 *
 * @csspart base - The component's base wrapper
 * @csspart item - The listbox item element
 *
 * @event click - Emitted when the dropdown item is clicked
 *
 * @cssproperty --i-bg-default - Controls the default background color
 * @cssproperty --i-bg-hovered - Controls the background color when hovered
 * @cssproperty --i-bg-pressed - Controls the background color when pressed
 * @cssproperty --i-text-color - Controls the text color
 * @cssproperty --i-selected-bg - Controls the background color when selected
 */
export default class PlusDropDownItem extends Tailwind {
  /**
   * Sets the size of the dropdown item
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disables the dropdown item interaction
   * When disabled, the item cannot be clicked or selected
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => value === 'true',
  disabled: boolean = false;

  /**
   * Indicates whether the dropdown item is currently selected
   * The selected state is managed by the parent PlusDropdown component
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => (value == 'false' || false ? false : true),
  })
  selected: boolean = false;

  /**
   * Sets the text content of the dropdown item
   * If provided, this will be used as the item's content,
   * and also as the aria-label for accessibility
   */
  @property()
  text?: string;

  /**
   * Lifecycle method called when the component is added to the DOM
   * Automatically sets itself to be slotted as a dropdown-item
   * @private
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this.slot = 'dropdown-item';
  }

  /**
   * Renders the dropdown item
   * Uses plus-list-box-item as the underlying component
   * with proper ARIA attributes for accessibility
   * @returns The rendered template
   */
  override render() {
    return html`<plus-list-box-item
      role="option"
      aria-selected=${this.selected}
      aria-disabled=${this.disabled}
      aria-label=${ifDefined(this.text)}
      size=${this.size}
      text=${ifDefined(this.text)}
      ?disabled=${this.disabled}
      .selected=${live(this.selected)}
      part="item"
      tabindex=${this.disabled ? '-1' : '0'}
      ><slot></slot
    ></plus-list-box-item>`;
  }
}

export { PlusDropDownItem };
