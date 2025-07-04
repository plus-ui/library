import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { booleanConverter } from '../../utils/boolean-converter';

/**
 * A select item component that represents a selectable option within a select menu.
 * Automatically registers itself as a select-item slot in the parent PlusSelect component.
 *
 * @tag plus-select-item
 * @slot - The default slot for select item content
 * @csspart base - The component's base wrapper
 * @csspart item - The listbox item element
 * @event click - Emitted when the select item is clicked, handled by the parent PlusSelect component
 * @cssproperty --i-bg-default - Controls the default background color
 * @cssproperty --i-bg-hovered - Controls the background color when hovered
 * @cssproperty --i-bg-pressed - Controls the background color when pressed
 * @cssproperty --i-text-color - Controls the text color
 * @cssproperty --i-selected-bg - Controls the background color when selected
 */
export default class PlusSelectItem extends Tailwind {
  /**
   * Sets the size of the select item.
   * @values 'sm' | 'md' | 'lg'
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disables the select item, preventing interaction.
   * When disabled, the item cannot be clicked or selected.
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  disabled: boolean = false;

  /**
   * Indicates whether the select item is currently selected.
   * The selected state is managed by the parent PlusSelect component.
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  selected: boolean = false;

  /**
   * Sets the text content of the select item.
   * If provided, this will be used as the item's content and as the aria-label for accessibility.
   * If not provided, the slotted content is used for accessibility.
   */
  @property({ attribute: 'text' })
  text?: string;

  /**
   * Initializes the component when it is added to the DOM.
   * Automatically assigns the component to the 'select-item' slot of the parent PlusSelect.
   * @private
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this.slot = 'select-item';
  }

  /**
   * Renders the select item using a plus-list-box-item component.
   * Includes ARIA attributes for accessibility and proper styling.
   * @returns The rendered template
   */
  override render() {
    return html`
      <plus-list-box-item
        role="option"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}
        aria-label=${ifDefined(this.text || this.textContent || undefined)}
        size=${this.size}
        text=${ifDefined(this.text)}
        ?disabled=${this.disabled}
        .selected=${live(this.selected)}
        part="item"
        tabindex=${this.disabled ? '-1' : '0'}
      >
        <slot></slot>
      </plus-list-box-item>
    `;
  }
}

export { PlusSelectItem };
