import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { html, css } from 'lit';
import { tagStyle } from './tag.style';

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
 * @slot - Default slot for tag content (text, icons, etc.)
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
  @property({ type: String })
  status: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, converter: value => value != 'false' })
  invert = false;

  @property({ type: String })
  radius: 'full' | 'medium' | 'none' = 'full';

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: inline-block;
        position: relative;
        width: fit-content;
        height: fit-content;
        --tag-bg-color: var(--plus-color-background-neutral-default);
        --tag-text-color: var(--plus-color-text-default);
      }
    `,
  ];

  constructor() {
    super();
  }

  override get ariaLabel(): string {
    return this.getAttribute('aria-label') || this.textContent || 'tag';
  }

  override render() {
    return html`
      <div
        part="tag"
        role="status"
        aria-label=${this.ariaLabel}
        class=${tagStyle({
          size: this.size,
          radius: this.radius,
          status: this.status,
          invert: this.invert,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

export { PlusTag };
