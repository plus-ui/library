import { html, LitElement, css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getIcon, IconName } from '../svg-icon/icons';

/**
 * @tag plus-icon
 * @since 0.0.0
 * @status stable
 *
 * Plus Icon component provides a unified SVG icon system with size and style variants.
 * Supports consistent rendering across all components with performance optimization.
 *
 * @csspart base - The component's base wrapper
 * @csspart svg - The SVG icon element
 *
 * @cssproperty --icon-size - Controls the size of the icon (defaults to 1em)
 * @cssproperty --icon-color - Controls the color of the icon (defaults to currentColor)
 */
export default class PlusIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      height: fit-content;
      width: fit-content;
      --icon-size: 1em;
      --icon-color: currentColor;
    }

    :host([size='xs']) {
      --icon-size: 0.75rem;
    }

    :host([size='sm']) {
      --icon-size: 0.875rem;
    }

    :host([size='md']) {
      --icon-size: 1rem;
    }

    :host([size='lg']) {
      --icon-size: 1.25rem;
    }

    :host([size='xl']) {
      --icon-size: 1.5rem;
    }

    svg {
      height: var(--icon-size);
      width: var(--icon-size);
      vertical-align: middle;
      fill: var(--icon-color);
    }
  `;

  /**
   * The name of the icon to display
   */
  @property({ type: String })
  iconName?: IconName;

  /**
   * Size variant of the icon
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  override render() {
    if (!this.iconName) return nothing;

    return html`${unsafeHTML(getIcon(this.iconName))}`;
  }
}

export { PlusIcon };
