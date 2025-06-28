import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { listBoxItemStyle } from './list-box-item.style';
import { booleanConverter } from '../../utils/boolean-converter';

/**
 * @tag plus-list-box-item
 *
 * List box item component that provides a selectable item for list-based containers.
 * Offers consistent styling and behavior for interactive list items.
 *
 * @slot - The default slot for the list box item content
 *
 * @csspart base - The component's base wrapper
 *
 * @event click - Emitted when the list box item is clicked
 *
 * @cssproperty --i-bg-default - Controls the default background color
 * @cssproperty --i-bg-hovered - Controls the background color when hovered
 * @cssproperty --i-bg-pressed - Controls the background color when pressed
 * @cssproperty --i-text-color - Controls the text color
 * @cssproperty --i-selected-bg - Controls the background color when selected
 */
export default class PlusListBoxItem extends Tailwind {
  /**
   * Sets the size of the list box item
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /** Disables the item, making it non-interactive. */
  @property({ type: Boolean, converter: booleanConverter })
  disabled = false;

  /** Indicates whether the item is currently selected. */
  @property({ type: Boolean, converter: booleanConverter })
  selected = false;

  /**
   * Sets the text content of the list box item
   * If provided, this will be used as the item's content when no slot content is present
   */
  @property({ attribute: 'text' })
  text?: string;

  /**
   * Renders the list box item
   * Applies the appropriate styles based on disabled and selected states
   * @returns The rendered template
   */
  override render() {
    const defaultStyle = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-bg-hovered': 'var(--plus-color-background-default-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-default-pressed)',
      '--i-text-color': `var(--plus-color-text-default)`,
      '--i-selected-bg': 'var(--plus-color-background-primary-invert-default)',
    };

    const disabledStyles = {
      '--i-bg-default': 'var(--plus-color-background-disabled-default)',
      '--i-bg-hovered': 'var(--plus-color-background-disabled-default)',
      '--i-bg-pressed': 'var(--plus-color-background-disabled-default)',
      '--i-text-color': `var(--plus-color-text-disabled)`,
      '--i-selected-bg': 'var(--plus-color-background-disabled-default)',
    };

    const styles = this.disabled ? disabledStyles : defaultStyle;

    return html`
      <div
        part="base"
        style=${styleMap(styles)}
        class=${listBoxItemStyle({
          size: this.size,
          disabled: this.disabled,
          selected: this.selected,
        })}
      >
        <slot>${this.text}</slot>
      </div>
    `;
  }
}

export { PlusListBoxItem };
