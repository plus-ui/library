import { html, LitElement, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getIcon, hasIcon, IconName, IconStyle } from './icon-registry';

/**
 * @tag plus-icon
 * @since 0.0.0
 * @status stable
 *
 * PlusIcon component provides a consistent way to render SVG icons across the system.
 * Supports size variants, style variants (solid, regular, light), and CDN fallback.
 *
 * @csspart base - The component's base wrapper
 * @csspart icon - The SVG icon element
 *
 * @cssproperty --icon-size - Custom icon size (overrides size variants)
 * @cssproperty --icon-color - Custom icon color (overrides currentColor)
 *
 * @example
 * ```html
 * <!-- Default solid icon -->
 * <plus-icon icon-name="star"></plus-icon>
 *
 * <!-- Different style -->
 * <plus-icon icon-name="heart" style="regular"></plus-icon>
 *
 * <!-- With size -->
 * <plus-icon icon-name="user" size="lg"></plus-icon>
 *
 * <!-- Custom size -->
 * <plus-icon icon-name="home" style="--icon-size: 32px;"></plus-icon>
 * ```
 */
export default class PlusIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      color: currentColor;
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
    }

    :host([size='xs']) {
      --icon-size: 0.75rem; /* 12px */
    }

    :host([size='sm']) {
      --icon-size: 0.875rem; /* 14px */
    }

    :host([size='md']) {
      --icon-size: 1rem; /* 16px - default */
    }

    :host([size='lg']) {
      --icon-size: 1.25rem; /* 20px */
    }

    :host([size='xl']) {
      --icon-size: 1.5rem; /* 24px */
    }

    :host([size='2xl']) {
      --icon-size: 2rem; /* 32px */
    }

    :host([size='3xl']) {
      --icon-size: 2.5rem; /* 40px */
    }

    .base {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--icon-color, currentColor);
    }

    .icon {
      width: 100%;
      height: 100%;
      fill: currentColor;
      display: block;
    }

    .icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Loading state */
    .loading {
      opacity: 0.5;
    }

    /* Error state - show placeholder */
    .error {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--icon-error-bg, #f3f4f6);
      color: var(--icon-error-color, #6b7280);
      border-radius: 2px;
    }

    .error::before {
      content: '?';
      font-size: 0.75em;
      font-weight: bold;
    }
  `;

  /**
   * Name of the icon to display
   */
  @property({ type: String, attribute: 'icon-name' })
  iconName: IconName = '';

  /**
   * Style variant of the icon: solid, regular, or light
   * @default 'solid'
   */
  @property({ type: String, attribute: 'icon-style' })
  iconStyle: IconStyle = 'solid';

  /**
   * Size variant for the icon
   * @default 'md'
   */
  @property({ type: String })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md';

  /**
   * Label for accessibility - will be used as aria-label
   */
  @property({ type: String })
  label?: string;

  @state()
  private svgContent: string = '';

  @state()
  private isLoading: boolean = false;

  @state()
  private hasError: boolean = false;

  protected override async updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('iconName') ||
      changedProperties.has('iconStyle')
    ) {
      await this.loadIcon();
    }
  }

  private async loadIcon() {
    if (!this.iconName) {
      this.svgContent = '';
      this.hasError = false;
      return;
    }

    // Check if icon is available locally first
    if (hasIcon(this.iconName, this.iconStyle)) {
      try {
        this.isLoading = true;
        this.hasError = false;
        const iconSvg = await getIcon(this.iconName, this.iconStyle);
        this.svgContent = iconSvg;
        this.isLoading = false;
      } catch (error) {
        console.warn(
          `Failed to load icon: ${this.iconName} (${this.iconStyle})`,
          error
        );
        this.hasError = true;
        this.isLoading = false;
      }
    } else {
      // Try CDN fallback
      try {
        this.isLoading = true;
        this.hasError = false;
        const iconSvg = await getIcon(this.iconName, this.iconStyle);
        if (iconSvg) {
          this.svgContent = iconSvg;
        } else {
          this.hasError = true;
        }
        this.isLoading = false;
      } catch (error) {
        console.warn(
          `Failed to load icon from CDN: ${this.iconName} (${this.iconStyle})`,
          error
        );
        this.hasError = true;
        this.isLoading = false;
      }
    }
  }

  override render() {
    if (!this.iconName) {
      return nothing;
    }

    if (this.hasError) {
      return html`
        <div
          part="base error"
          class="base error"
          role="img"
          aria-label=${this.label || `Icon ${this.iconName} not found`}
        ></div>
      `;
    }

    if (this.isLoading) {
      return html`
        <div
          part="base loading"
          class="base loading"
          role="img"
          aria-label=${this.label || `Loading ${this.iconName} icon`}
        >
          <div class="icon"></div>
        </div>
      `;
    }

    return html`
      <div
        part="base"
        class="base"
        role="img"
        aria-label=${this.label || `${this.iconName} icon`}
      >
        <div part="icon" class="icon">
          ${this.svgContent ? unsafeHTML(this.svgContent) : nothing}
        </div>
      </div>
    `;
  }
}

export { PlusIcon };
