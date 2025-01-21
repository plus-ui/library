import { html } from 'lit';
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
  @property({ type: Boolean })
  disabled = false;

  /**
   * Shows loading spinner and disables interaction
   * @default false
   */
  @property({ type: Boolean })
  loading = false;

  private handleClick() {
    this.emit('plus-click');
  }

  private handleFocus() {
    this.emit('plus-focus');
  }

  private handleBlur() {
    this.emit('plus-blur');
  }

  override render() {
    const commonStyles = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-bg-hovered': 'var(--plus-color-background-default-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-default-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-default-focused)',
      '--i-text-color': `var(--plus-color-text-${this.status})`,
      '--i-border-color': `var(--plus-color-border-${this.status})`,
    };

    const filledStyles = {
      '--i-bg-default': `var(--plus-color-background-${this.status}-default)`,
      '--i-bg-hovered': `var(--plus-color-background-${this.status}-hovered)`,
      '--i-bg-focused': `var(--plus-color-background-${this.status}-pressed)`,
      '--i-bg-pressed': `var(--plus-color-background-${this.status}-focused)`,
      '--i-text-color': `var(--plus-color-text-${this.status === 'default' ? 'default' : 'base'})`,
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

    const classes = baseButtonStyle({
      size: this.size,
      kind: this.kind,
      status: this.status,
      disabled: this.disabled,
      loading: this.loading,
    });

    return html`
      <button
        class=${classes}
        part="button"
        ?disabled=${this.disabled}
        style=${styleMap(styles[this.kind])}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

export { PlusButton };
