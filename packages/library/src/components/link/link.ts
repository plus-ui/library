import { html } from 'lit';
import Tailwind from '../base/tailwind-base';
import { property } from 'lit/decorators.js';
import { linkStyle } from './link.style';

/**
 * @tag plus-link
 * @since 0.0.0
 * @status experimental
 *
 * PlusLink component provides a customizable link element for navigation and actions.
 *
 * @slot - The default slot for link content
 * @slot prefix - Slot for content to be placed before the link content
 * @slot suffix - Slot for content to be placed after the link content
 *
 * @csspart base - The component's base wrapper
 */
export default class PlusLink extends Tailwind {
  /**
   * Controls the size of the link
   * - sm: Small size with smaller text and spacing
   * - md: Medium size with default text and spacing
   * - lg: Large size with larger text and spacing
   * - inherit: Inherits size from parent element
   * @default 'inherit'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' | 'inherit' = 'inherit';

  /**
   * When true, the link becomes non-interactive and shows disabled styling
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => (value == 'false' || false ? false : true),
  })
  disabled = false;

  /**
   * When true, the link becomes non-interactive but maintains normal styling
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => (value == 'false' || false ? false : true),
  })
  readonly = false;

  /**
   * The URL that the hyperlink points to
   * @default ''
   */
  @property({ type: String })
  href = '';

  /**
   * Specifies where to display the linked URL
   * Common values: _blank, _self, _parent, _top
   * @default ''
   */
  @property({ type: String })
  target = '';

  /**
   * Specifies the relationship between the current document and the linked document
   * Common values: nofollow, noopener, noreferrer
   * @default ''
   */
  @property({ type: String })
  rel = '';

  /**
   * Sets the link to download the target URL instead of navigating
   * Optional value specifies the suggested filename
   * @default ''
   */
  @property({ type: String })
  download = '';

  /**
   * When true, displays loading state and disables interaction
   * @default false
   */
  @property({ type: Boolean })
  loading = false;

  /**
   * When true, link opens in new tab with secure attributes
   * Automatically sets target="_blank" and rel="noopener noreferrer"
   * @default false
   */
  @property({ type: Boolean })
  external = false;

  /**
   * Controls the underline style of the link
   * values:
   * - always: always underlined
   * - hover: underlined on hover
   * - never: never underlined
   * @default 'hover'
   */
  @property({ type: String })
  underline?: 'always' | 'hover' | 'never';

  private handleClick(e: Event) {
    if (this.disabled || this.readonly) {
      e.preventDefault();
    }
    this.emit('plus-click');
  }

  private handleFocus() {
    this.emit('plus-focus');
  }

  private handleBlur() {
    this.emit('plus-blur');
  }

  override render() {
    const target = this.external ? '_blank' : this.target;
    const rel = this.external ? 'noopener noreferrer' : this.rel;

    let _underline: typeof this.underline;

    if (this.underline) {
      _underline = this.underline;
    } else if (this.disabled || this.readonly) {
      _underline = 'never';
    } else {
      _underline = 'hover';
    }

    return html`
      <a
        role="link"
        class=${linkStyle({
          size: this.size,
          underline: _underline,
          disabled: this.disabled,
          readonly: this.readonly,
          notAllowed: this.disabled || this.readonly,
        })}
        href="${this.href}"
        target="${target}"
        rel="${rel}"
        download="${this.download}"
        aria-disabled="${this.disabled}"
        aria-readonly="${this.readonly}"
        tabindex="${this.disabled ? '-1' : '0'}"
        part="base"
        @click="${this.handleClick}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        ><slot name="prefix"></slot><slot></slot><slot name="suffix"></slot
      ></a>
    `;
  }
}

export { PlusLink };
