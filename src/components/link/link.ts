import { css, html } from 'lit';
import Tailwind from '../base/tailwind-base';
import { property } from 'lit/decorators.js';
import { linkStyle } from './link.style';

/**
 * @tag plus-link
 * @since 0.0.0
 * @status stable
 *
 * PlusLink component provides a customizable link element for navigation and actions.
 * Supports size variants, states management, and icon configuration.
 *
 * @slot - The default slot for link content
 * @slot prefix-icon - Slot for an icon before the link text
 * @slot suffix-icon - Slot for an icon after the link text
 *
 * @csspart base - The component's base wrapper element
 * @csspart main-slot - The main content wrapper element
 */
export default class PlusLink extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  /**
   * Controls the size of the link
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * When true, the link will be disabled and non-interactive
   * @default false
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * When true, the link will be in readonly state
   * @default false
   */
  @property({ type: Boolean }) readonly: boolean = false;

  /**
   * The URL that the link points to
   * @default ''
   */
  @property({ type: String }) href: string = '';

  /**
   * Specifies where to open the linked document
   * @default ''
   */
  @property({ type: String }) target: string = '';

  /**
   * Specifies the relationship between the current document and the linked document
   * @default ''
   */
  @property({ type: String }) rel: string = '';

  /**
   * When true, the link text will be truncated with an ellipsis
   * @default false
   */
  @property({ type: Boolean }) truncated: boolean = false;

  /**
   * Name of the icon to display before the link text (not supported yet)
   * @default ''
   */
  @property({ type: String, attribute: 'prefix-icon' }) prefixIcon: string = '';

  /**
   * Name of the icon to display after the link text (not supported yet)
   * @default ''
   */
  @property({ type: String, attribute: 'suffix-icon' }) suffixIcon: string = '';

  handleLinkClick(e: Event) {
    if (this.disabled || this.readonly) {
      e.preventDefault();
    }
  }

  override render() {
    const { base, mainSlot } = linkStyle({
      size: this.size,
      disabled: this.disabled,
      readonly: this.readonly,
      truncated: this.truncated,
    });
    return html`
        <a
          role="link"
          class=${base()}
          .?disabled="${this.disabled}"
          href="${this.href}"
          target="${this.target}"
          rel="${this.rel}"
          aria-disabled="${this.disabled}"
          aria-readonly="${this.readonly}"
          tabindex="${this.disabled ? '-1' : '0'}"
        >
            <slot name="prefix-icon">${this.prefixIcon}</slot>
            <div class="${mainSlot()}"><slot></slot></div>
            <slot name="suffix-icon">${this.suffixIcon}</slot>
          </a>
      </div>
    `;
  }
}

export { PlusLink };
