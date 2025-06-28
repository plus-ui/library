import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';

import { isValidSize, Size, Sizes } from '../../model/plus';
import { avatarStyle } from './avatar.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-avatar
 * @since 0.0.0
 * @status experimental
 *
 * PlusAvatar component provides a visual representation for users or entities.
 * Supports images, text initials, icons and various visual styles.
 *
 * @slot - The default slot for avatar content
 * @slot fallback - Optional slot for custom fallback content
 *
 * @csspart base - The component's base wrapper
 *
 * @cssproperty --text-color - Controls the text color of the avatar
 * @cssproperty --bg-default - Controls the default background color
 */
export default class PlusAvatar extends Tailwind {
  /**
   * URL of the avatar image
   */
  @property() image?: string;

  /**
   * Alternative text for the avatar
   */
  @property() alt?: string;

  /**
   * Shape of the avatar
   * - circle: Circular shape
   * - square: Square shape with slight rounding
   * @default 'circle'
   */
  @property() shape: 'circle' | 'square' = 'circle';

  /**
   * Size of the avatar
   * Can be a predefined size (xs, sm, md, lg, xl) or custom value
   * @default 'md'
   */
  @property() size: Size | string = Sizes.md;

  /**
   * Icon class to use when no image is available
   * @default 'fa-solid fa-user'
   */
  @property() icon: string = 'fa-solid fa-user';

  /**
   * Toggles inverted color scheme
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter }) invert = false;

  /**
   * Text to display as initials when no image is available
   */
  @property() text?: string;

  /**
   * Strategy to use when image fails to load
   * - icon: Shows an icon
   * - text: Shows text initials
   * - custom: Uses fallback slot content
   * @default 'icon'
   */
  @property() fallbackStrategy: 'icon' | 'text' | 'custom' = 'icon';
  // @property({ type: Boolean }) loading = false;
  // @property() loadingText = 'Loading...';

  @state() private isFallback = false;

  // Private methods
  private get hasValidImage(): boolean {
    return Boolean(this.image) && !this.isFallback;
  }

  private get hasValidText(): boolean {
    return Boolean(this.text);
  }

  private getInitials(): string {
    if (!this.text) return '';

    const words = this.text.split(' ').filter((word) => word.length > 0);
    if (this.size !== Sizes.xs && words.length > 1) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return words[0][0].toUpperCase();
  }

  // Event handlers
  private handleError = () => {
    this.isFallback = true;
    this.dispatchEvent(new CustomEvent<void>('error', { bubbles: true }));
  };

  private handleLoad = () => {
    // this.loading = false;
    this.dispatchEvent(new CustomEvent<void>('load', { bubbles: true }));
  };

  // Render methods
  private renderImage() {
    if (!this.image) return null;

    return html`<img
      class="object-cover w-full h-full"
      loading="lazy"
      @error=${this.handleError}
      @load=${this.handleLoad}
      src=${this.image}
      alt=${this.alt || this.text || 'Avatar'}
    />`;
  }

  private renderFallback() {
    if (this.fallbackStrategy === 'text' && this.hasValidText) {
      return this.getInitials();
    }

    if (this.fallbackStrategy === 'icon') {
      return html`<i class=${this.icon}></i>`;
    }

    return html`<slot name="fallback"><i class=${this.icon}></i></slot>`;
  }

  private renderContent() {
    // if (this.loading) {
    //   return html`<span aria-busy="true">${this.loadingText}</span>`;
    // }

    if (this.hasValidImage) {
      return this.renderImage();
    }

    if (this.hasValidText) {
      return this.getInitials();
    }

    return this.renderFallback();
  }

  override render() {
    const defaultStyles = {
      '--i-bg-default': `var(--plus-color-background-default-default)`,
      '--i-text-color': `var(--plus-color-text-default)`,
    };

    const InvertStyles = {
      '--i-bg-default': `var(--plus-color-background-default-invert-default)`,
      '--i-text-color': `var(--plus-color-text-default-invert)`,
    };

    const styles = this.invert ? InvertStyles : defaultStyles;

    const style = styleMap({
      ...(!isValidSize(this.size) ? { ['--size']: this.size } : {}),
      ...styles,
    });

    return html`
      <div
        role="img"
        aria-label=${this.alt || this.text || 'Avatar'}
        aria-invalid=${this.isFallback}
        class=${avatarStyle({
          size: isValidSize(this.size) ? this.size : 'custom',
          shape: this.shape,
        })}
        style="${style}"
      >
        <slot>${this.renderContent()}</slot>
      </div>
    `;
  }
}

export { PlusAvatar };
