import { property } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { html, css } from 'lit';
import { tagStyle } from './tag.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-tag
 * @summary Tag component for displaying status, labels, and categories.
 *
 * @slot - The tag content (text, icons, etc.)
 *
 * @csspart tag - The component's base wrapper
 *
 * @cssproperty --text-color - Controls the text color of the tag
 * @cssproperty --border-color - Controls the border color of the tag
 * @cssproperty --bg-default - Controls the default background color
 *
 * @example
 * ```html
 * <plus-tag status="success">Completed</plus-tag>
 * <plus-tag status="warning">Pending</plus-tag>
 * <plus-tag status="danger">Error</plus-tag>
 * ```
 */
const textColorMap = {
  default: 'default',
  primary: 'base',
  success: 'base',
  warning: 'base',
  danger: 'base',
  info: 'base',
} as const;

/**
 * A versatile tag component for displaying status, labels, and categories
 *
 * @tag plus-tag
 *
 * @csspart tag - The container element for the tag
 *
 * @cssproperty [--tag-bg-color] - Background color for default state (inherits from --plus-color-background-neutral-default)
 * @cssproperty [--tag-text-color] - Text color for default state (inherits from --plus-color-text-default)
 *
 * @property {('success'|'warning'|'error'|'info'|'default')} status - Defines the tag's visual state and color scheme
 * @property {('sm'|'md'|'lg')} size - Controls the tag's size variant
 * @property {boolean} invert - Toggles between light/dark color themes
 * @property {('full'|'medium'|'none')} radius - Sets the border radius style
 *
 * @attribute {string} aria-label - Accessible label for the tag (falls back to text content)
 * @attribute {string} role - ARIA role (defaults to "status")
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <plus-tag>Default Tag</plus-tag>
 *
 * <!-- With status -->
 * <plus-tag status="success">Success</plus-tag>
 * <plus-tag status="warning">Warning</plus-tag>
 * <plus-tag status="error">Error</plus-tag>
 *
 * <!-- Size variants -->
 * <plus-tag size="sm">Small</plus-tag>
 * <plus-tag size="md">Medium</plus-tag>
 * <plus-tag size="lg">Large</plus-tag>
 *
 * <!-- Border radius options -->
 * <plus-tag radius="full">Pill Shape</plus-tag>
 * <plus-tag radius="medium">Rounded</plus-tag>
 * <plus-tag radius="none">Square</plus-tag>
 *
 * <!-- Inverted theme -->
 * <plus-tag invert>Dark Theme</plus-tag>
 * ```
 *
 * @cssExample
 * ```css
 * plus-tag {
 *   --tag-bg-color: #f0f0f0;
 *   --tag-text-color: #333333;
 * }
 * ```
 */

export default class PlusTag extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: inline-block;
        position: relative;
        width: fit-content;
        height: fit-content;
      }
    `,
  ];

  /**
   * Sets the status/color variant of the tag
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
   * Sets the size of the tag
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /** Inverts the color scheme of the tag. */
  @property({ type: Boolean, converter: booleanConverter })
  invert = false;

  /**
   * Sets the border radius style
   * - full: Pill shape
   * - medium: Rounded corners
   * - none: Square corners
   * @default 'full'
   */
  @property({ type: String })
  radius: 'full' | 'medium' | 'none' = 'full';

  constructor() {
    super();
  }

  override get ariaLabel(): string {
    return this.getAttribute('aria-label') || this.textContent || 'tag';
  }

  override render() {
    const getColorVariables = () => {
      if (this.invert) {
        return {
          '--i-bg-default': `var(--plus-color-background-${this.status}-invert-default)`,
          '--i-text-color': `var(--plus-color-text-default)`,
          '--i-border-color': `var(--plus-color-border-${this.status}-invert)`,
        };
      }

      return {
        '--i-bg-default': `var(--plus-color-background-${this.status}-default)`,
        '--i-text-color': `var(--plus-color-text-${textColorMap[this.status]})`,
        '--i-border-color': `var(--plus-color-border-${this.status})`,
      };
    };

    const commonStyles = getColorVariables();

    const dynamicStyles = {
      '--d-text': 'var(--text-color,var(--i-text-color))',
      '--d-border': 'var(--border-color,var(--i-border-color))',
      '--d-bg-default': 'var(--bg-default,var(--i-bg-default))',
    };

    return html`
      <div
        part="tag"
        role="status"
        aria-label=${this.ariaLabel}
        class=${tagStyle({
          size: this.size,
          radius: this.radius,
          status: this.status,
        })}
        style=${styleMap({ ...dynamicStyles, ...commonStyles })}
      >
        <slot></slot>
      </div>
    `;
  }
}

export { PlusTag };
