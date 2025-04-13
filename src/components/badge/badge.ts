import { property, state } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { html } from 'lit';
import badgeHostStyle from './badge.host.style';
import { badgeStyle } from './badge.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-badge
 * @since 0.0.0
 * @status experimental
 *
 * PlusBadge component provides a small status indicator that can be attached to other components.
 * Supports different visual styles, sizes, and states.
 *
 * @slot - Default slot for the content that the badge will be attached to
 * @slot badge-content - Slot for the badge content (text, number, etc.)
 *
 * @csspart badge - The component's base wrapper
 *
 * @cssproperty --text-color - Controls the text color of the badge
 * @cssproperty --border-color - Controls the border color of the badge
 * @cssproperty --bg-default - Controls the default background color
 */
const textColorMap = {
  default: 'default',
  primary: 'base',
  success: 'base',
  warning: 'base',
  danger: 'base',
  info: 'base',
} as const;

export default class PlusBadge extends Tailwind {
  static override styles = [...Tailwind.styles, badgeHostStyle];

  /**
   * Sets the status/color variant of the badge
   * - default: Neutral color scheme
   * - primary: Brand color scheme
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
   * Sets the size of the badge
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Sets the position of the badge relative to its content
   * - top-right: Top right corner
   * - top-left: Top left corner
   * - bottom-right: Bottom right corner
   * - bottom-left: Bottom left corner
   * - '': No specific position
   * @default 'top-right'
   */
  @property({ type: String })
  orientation: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | '' =
    'top-right';

  /**
   * Sets the offset of the badge from its default position
   * Format: "x,y" where x and y can be any valid CSS length value
   * Example: "10px,5px" or "-5px,-10px"
   */
  @property({
    type: Array,
    converter: (value) => {
      const split = value ? value.split(',') : [];
      if (split?.length > 1) {
        return [split[0], split[1]];
      } else {
        return [value, value];
      }
    },
  })
  offset!: [string, string];

  /**
   * Sets the content of the badge
   * If not provided, the badge will be displayed as a dot
   */
  @property({ type: String })
  content?: string;

  @state()
  hasSlot = false;

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this.hasSlot = nodes.length > 0;
  }

  override render() {
    const getColorVariables = () => {
      return {
        '--i-bg-default': `var(--plus-color-background-${this.status}-default)`,
        '--i-text-color': `var(--plus-color-text-${textColorMap[this.status]})`,
        '--i-border-color': `var(--plus-color-border-${this.status})`,
      };
    };

    const dynamicStyles = {
      '--d-text': 'var(--text-color,var(--i-text-color))',
      '--d-border': 'var(--border-color,var(--i-border-color))',
      '--d-bg-default': 'var(--bg-default,var(--i-bg-default))',
    };

    const { offset } = this;
    const hasContent = !!(this.content || this.hasSlot);

    return html`
      <slot></slot>
      <div
        part="badge"
        role="status"
        aria-live="polite"
        style=${styleMap({
          ...dynamicStyles,
          ...getColorVariables(),
          ...(offset && { transform: `translate(${offset[0]}, ${offset[1]})` }),
        })}
        class=${badgeStyle({
          size: this.size,
          hasContent,
          orientation: this.orientation,
          status: this.status,
        })}
      >
        <slot name="badge-content" @slotchange=${this.handleSlotChange}
          >${this.content}</slot
        >
      </div>
    `;
  }
}

export { PlusBadge };
