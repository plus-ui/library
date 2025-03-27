import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { baseButtonStyle } from './button.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-button
 * @since 0.0.0
 * @status experimental
 *
 * PlusButton component provides a clickable button element with various styles and states.
 * Supports different visual styles, sizes, and interactive states.
 *
 * @slot - The default slot for button content
 * @slot prefix - Slot for content to be placed before the button content
 * @slot suffix - Slot for content to be placed after the button content
 *
 * @csspart button - The component's base wrapper
 *
 * @cssproperty --text-color - Controls the text color of the button
 * @cssproperty --border-color - Controls the border color of the button
 * @cssproperty --bg-default - Controls the default background color
 * @cssproperty --bg-hovered - Controls the background color when hovered
 * @cssproperty --bg-pressed - Controls the background color when pressed
 * @cssproperty --bg-focused - Controls the background color when focused
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
    converter: (value) => (value == 'false' || false ? false : true),
  })
  disabled = false;

  /**
   * Shows loading spinner and disables interaction
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => (value == 'false' || false ? false : true),
  })
  loading = false;

  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => (value == 'false' || false ? false : true),
    attribute: 'full-width',
  })
  fullWidth = false;

  private handleClick() {
    this.emit('plus-click');
  }

  private handleFocus() {
    this.emit('plus-focus');
  }

  private handleBlur() {
    this.emit('plus-blur');
  }

  static override styles = [
    ...Tailwind.styles,
    css`
      .plus-button {
        border-top-left-radius: var(--border-top-left-radius, 0.375rem);
        border-top-right-radius: var(--border-top-right-radius, 0.375rem);
        border-bottom-left-radius: var(--border-bottom-left-radius, 0.375rem);
        border-bottom-right-radius: var(--border-bottom-right-radius, 0.375rem);
      }
    `,
  ];

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

    const styles = {
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

    return html`
      <button
        class=${base()}
        part="button"
        ?disabled=${this.disabled || this.loading}
        style=${styleMap({ ...dynamicStyles, ...styles[this.kind] })}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        aria-label="Button"
        role="button"
        tabindex="0"
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            this.handleClick();
            e.preventDefault();
          }
        }}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
        ${this.loading ? LoadingTemplate : ''}
      </button>
    `;
  }
}

export { PlusButton };
