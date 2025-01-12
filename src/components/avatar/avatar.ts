import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import style from './avatar.styles';
import { isValidSize, Size, Sizes } from '../../model/plus';
import { avatarStyle } from './avatar.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Add a description here
 *
 * @tag plus-avatar
 * @since 0.0.0
 * @status experimental
 *
 **/
export default class PlusAvatar extends Tailwind {
  @property() image?: string;
  @property() alt?: string;
  @property() shape: 'circle' | 'square' = 'circle';
  @property() size: Size | string = Sizes.md;
  @property() icon: string = 'fa-solid fa-user';
  @property({ type: Boolean }) invert = false;
  @property() text?: string;

  @property({ type: Boolean }) loading = false;
  @property() fallbackStrategy: 'icon' | 'text' | 'custom' = 'icon';
  @property() loadingText = 'Loading...';

  @state() private isFallback = false;

  // Lifecycle methods
  constructor() {
    super();
  }

  // Private methods
  private get hasValidImage(): boolean {
    return Boolean(this.image) && !this.isFallback;
  }

  private get hasValidText(): boolean {
    return Boolean(this.text);
  }

  private getInitials(): string {
    if (!this.text) return '';

    const words = this.text.split(' ').filter(word => word.length > 0);
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
    this.loading = false;
    this.dispatchEvent(new CustomEvent<void>('load', { bubbles: true }));
  };

  // Render methods
  private renderImage() {
    if (!this.image) return null;

    return html`<img class="object-cover w-full h-full" loading="lazy" @error=${this.handleError} @load=${this.handleLoad} src=${this.image} alt=${this.alt || this.text || 'Avatar'} />`;
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
    if (this.loading) {
      return html`<span aria-busy="true">${this.loadingText}</span>`;
    }

    if (this.hasValidImage) {
      return this.renderImage();
    }

    if (this.hasValidText) {
      return this.getInitials();
    }

    return this.renderFallback();
  }

  override render() {
    return html`
      <div
        role="img"
        aria-label=${this.alt || this.text || 'Avatar'}
        aria-busy=${this.loading}
        aria-invalid=${this.isFallback}
        class=${avatarStyle({
          size: isValidSize(this.size) ? this.size : 'custom',
          shape: this.shape,
          invert: this.invert,
        })}
        style="${styleMap(!isValidSize(this.size) ? { ['--size']: this.size } : {})}"
      >
        <slot>${this.renderContent()}</slot>
      </div>
    `;
  }

  static override styles = [...Tailwind.styles, style];
}

export { PlusAvatar };
