import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { tabStyle } from './styles';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-tab
 * @summary Tab component that represents a single tab in a tab group.
 *
 * @slot - The default slot for tab content
 * @slot prefix - Content to be placed before the tab content
 * @slot suffix - Content to be placed after the tab content
 *
 * @csspart tab - The component's base wrapper
 *
 * @cssproperty --text-color - Controls the text color of the tab
 * @cssproperty --active-color - Controls the color of the active indicator
 * @cssproperty --bg-default - Controls the default background color
 * @cssproperty --bg-hovered - Controls the background color when hovered
 *
 * @example
 * ```html
 * <plus-tab value="tab1">Tab 1</plus-tab>
 * ```
 */
export default class PlusTab extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: inline-block;
      }

      .tab-prefix-icon,
      .tab-suffix-icon {
        display: inline-flex;
        align-items: center;
      }

      .tab {
        outline: none;
      }
    `,
  ];

  /**
   * Sets the value of the tab, used for identification and selection
   */
  @property({ type: String })
  value = '';

  /**
   * Indicates if the tab is currently selected
   * @default false
   */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  active = false;

  /**
   * Sets the size of the tab
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disables the tab interaction
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: booleanConverter,
  })
  disabled = false;

  /**
   * Sets the orientation of the tabs
   * - horizontal: Tabs arranged horizontally
   * - vertical: Tabs arranged vertically
   * @default 'horizontal'
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Icon to display before the tab content
   */
  @property({ type: String, attribute: 'prefix-icon' })
  prefixIcon?: string;

  /**
   * Icon to display after the tab content
   */
  @property({ type: String, attribute: 'suffix-icon' })
  suffixIcon?: string;

  /**
   * Enables the dismiss button to remove the tab
   * @default false
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
  })
  dismissible = false;

  /**
   * Truncates the text if it's too long
   * @default false
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
  })
  truncate = false;

  /**
   * Use animated indicator instead of border for active tab
   * This is controlled by the parent tab-group
   * @default false
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
  })
  animated = false;

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
  }

  private handleClick() {
    if (this.disabled) return;
    this.emit('plus-tab-click', { detail: { value: this.value } });
  }

  private handleDismiss(e: Event) {
    e.stopPropagation();
    this.emit('plus-tab-dismiss', { detail: { value: this.value } });
  }

  override render() {
    const { size, active, disabled, orientation, prefixIcon, suffixIcon, dismissible, truncate, animated } = this;

    const dynamicStyles = {
      '--tab-text-color': 'var(--text-color, var(--plus-color-text-default))',
      '--tab-active-color': 'var(--active-color, var(--plus-color-primary-default))',
      '--tab-bg-default': 'var(--bg-default, transparent)',
      '--tab-bg-hovered': 'var(--bg-hovered, var(--plus-color-background-default-hovered))',
    };

    // Create tab style properties from component state
    const tabStyleProps = {
      size,
      active,
      disabled,
      orientation,
      truncated: truncate,
      animated,
    };

    const { tab } = tabStyle(tabStyleProps);

    return html`
      <div
        part="tab"
        class=${tab()}
        role="tab"
        aria-selected=${active}
        aria-disabled=${disabled}
        tabindex=${disabled ? -1 : active ? 0 : -1}
        style=${styleMap(dynamicStyles)}
      >
        ${prefixIcon ? html`<span class="tab-prefix-icon"><i class="${prefixIcon}"></i></span>` : ''}
        <slot></slot>
        ${suffixIcon ? html`<span class="tab-suffix-icon"><i class="${suffixIcon}"></i></span>` : ''}
        ${dismissible
          ? html`<button type="button" class="tab-dismiss-button" aria-label="Dismiss tab" @click=${this.handleDismiss}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="h-3 w-3 fill-current">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </button>`
          : ''}
      </div>
    `;
  }
}

export { PlusTab };
