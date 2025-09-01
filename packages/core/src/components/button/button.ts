import { html, css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { baseButtonStyle } from './button.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-button
 * @summary Polymorphic button component that can render as either a button or anchor link.
 *
 * @slot - The default slot for button content
 * @slot prefix - Content to be placed before the button content
 * @slot suffix - Content to be placed after the button content
 *
 * @csspart button - The component's base wrapper
 *
 * @cssproperty --text-color - Controls the text color of the button
 * @cssproperty --border-color - Controls the border color of the button
 * @cssproperty --bg-default - Controls the default background color
 * @cssproperty --bg-hovered - Controls the background color when hovered
 * @cssproperty --bg-pressed - Controls the background color when pressed
 * @cssproperty --bg-focused - Controls the background color when focused
 *
 * @example
 * ```html
 * <!-- As a button -->
 * <plus-button kind="filled" status="primary" size="md">
 *   Click me
 * </plus-button>
 *
 * <!-- As a link -->
 * <plus-button href="/dashboard" kind="filled" status="primary">
 *   Go to Dashboard
 * </plus-button>
 *
 * <!-- External link -->
 * <plus-button href="https://github.com" external kind="outlined">
 *   GitHub
 * </plus-button>
 * ```
 */
const textColorMap = {
  default: 'default',
  disabled: 'disabled',
  primary: 'base',
  success: 'base',
  warning: 'base',
  danger: 'base',
  info: 'base',
} as const;

export default class PlusButton extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: inline-block;
        height: fit-content;
      }
      :host([full-width]) {
        display: block;
        width: 100%;
      }
      .plus-button {
        border-top-left-radius: var(--border-top-left-radius, 0.375rem);
        border-top-right-radius: var(--border-top-right-radius, 0.375rem);
        border-bottom-left-radius: var(--border-bottom-left-radius, 0.375rem);
        border-bottom-right-radius: var(--border-bottom-right-radius, 0.375rem);
      }
    `,
  ];
  /**
   * Determines the visual style of the button
   * - filled: Solid background color
   * - outlined: Transparent background with border
   * - dashed: Transparent background with dashed border
   * - text: Text only without background or border
   * @default 'filled'
   */
  @property({ type: String })
  kind: 'filled' | 'outlined' | 'dashed' | 'text' = 'filled';

  /**
   * Sets the status/color variant of the button
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
   * Sets the size of the button
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disables the button interaction
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: booleanConverter,
  })
  disabled = false;

  /**
   * Shows loading spinner and disables interaction
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: booleanConverter,
  })
  loading = false;

  @property({
    type: Boolean,
    reflect: true,
    converter: booleanConverter,
    attribute: 'full-width',
  })
  fullWidth = false;

  /**
   * When provided, renders as an anchor link instead of a button
   * @default undefined
   */
  @property({ type: String })
  href?: string;

  /**
   * Specifies where to display the linked URL
   * Common values: _blank, _self, _parent, _top
   * @default undefined
   */
  @property({ type: String })
  target?: string;

  /**
   * Specifies the relationship between the current document and the linked document
   * Common values: nofollow, noopener, noreferrer
   * @default undefined
   */
  @property({ type: String })
  rel?: string;

  /**
   * Sets the link to download the target URL instead of navigating
   * Optional value specifies the suggested filename
   * @default undefined
   */
  @property({ type: String })
  download?: string;

  /**
   * When true, link opens in new tab with secure attributes
   * Automatically sets target="_blank" and rel="noopener noreferrer"
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  external = false;

  private handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
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
    const _statusColor = this.disabled ? 'disabled' : this.status;

    const commonStyles = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-bg-hovered': 'var(--plus-color-background-default-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-default-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-default-focused)',
      '--i-bg-loading': 'var(--plus-color-background-default-loading)',
      '--i-text-color': `var(--plus-color-text-${_statusColor})`,
      '--i-border-color': `var(--plus-color-border-${_statusColor})`,
    };

    const filledStyles = {
      '--i-bg-default': `var(--plus-color-background-${_statusColor}-default)`,
      '--i-bg-hovered': `var(--plus-color-background-${this.status}-hovered)`,
      '--i-bg-focused': `var(--plus-color-background-${this.status}-pressed)`,
      '--i-bg-pressed': `var(--plus-color-background-${this.status}-focused)`,
      '--i-bg-loading': `var(--plus-color-background-${this.status}-loading)`,
      '--i-text-color': `var(--plus-color-text-${textColorMap[_statusColor]})`,
      '--i-border-color': 'transparent',
    };

    const stylesMap = {
      filled: filledStyles,
      outlined: commonStyles,
      dashed: commonStyles,
      text: {
        ...commonStyles,
        '--i-bg-default': 'transparent',
        '--i-border-color': 'transparent',
      },
    };

    const dynamicStyles = {
      '--d-text': 'var(--text-color,var(--i-text-color))',
      '--d-border': 'var(--border-color,var(--i-border-color))',
      '--d-bg-default': 'var(--bg-default,var(--i-bg-default))',
      '--d-bg-hovered': 'var(--bg-hovered,var(--i-bg-hovered))',
      '--d-bg-pressed': 'var(--bg-pressed,var(--i-bg-pressed))',
      '--d-bg-focused': 'var(--bg-focused,var(--i-bg-focused))',
      '--d-bg-loading': 'var(--bg-loading,var(--i-bg-loading))',
    };

    const { base } = baseButtonStyle({
      size: this.size,
      kind: this.kind,
      status: this.status,
      disabled: this.disabled || this.loading,
      loading: this.loading,
      fullWidth: this.fullWidth,
    });

    const LoadingTemplate = html`<div
      class="loading h-full w-full absolute flex items-center justify-center bg-(--d-bg-loading)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="animate-spin h-2/5 w-auto fill-(--d-text)"
      >
        <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <path
          d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
        />
      </svg>
    </div>`;

    // Link props for anchor element
    const target = this.external ? '_blank' : this.target;
    const rel = this.external ? 'noopener noreferrer' : this.rel;

    const isLink = this.href !== undefined;
    const isDisabled = this.disabled || this.loading;

    const finalStyles = { ...dynamicStyles, ...stylesMap[this.kind] };

    const content = html`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
      ${this.loading ? LoadingTemplate : ''}
    `;

    if (isLink) {
      return html`
        <a
          class=${base()}
          part="button"
          href=${this.href}
          target=${target || nothing}
          rel=${rel || nothing}
          download=${this.download || nothing}
          aria-disabled=${isDisabled}
          tabindex="${isDisabled ? '-1' : '0'}"
          role="button"
          style=${styleMap(finalStyles)}
          @click=${this.handleClick}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (!isDisabled) {
                this.handleClick(e);
              }
              e.preventDefault();
            }
          }}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        class=${base()}
        part="button"
        ?disabled=${isDisabled}
        aria-label="Button"
        role="button"
        tabindex="0"
        style=${styleMap(finalStyles)}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (!isDisabled) {
              this.handleClick(e);
            }
            e.preventDefault();
          }
        }}
      >
        ${content}
      </button>
    `;
  }
}

export { PlusButton };
