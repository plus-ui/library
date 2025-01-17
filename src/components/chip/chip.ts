import { html, nothing } from 'lit';
import Tailwind from '../base/tailwind-base';
import { property } from 'lit/decorators.js';
import { chipStyle } from './chip.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-chip
 * @since 0.0.0
 * @status experimental
 *
 * PlusChip component provides a compact element for displaying information, tags, or actions.
 * Supports various visual styles, sizes, and states.
 *
 * @slot - The default slot for chip content
 *
 * @csspart base - The component's base wrapper
 * @csspart icon - The dismiss icon wrapper
 *
 * @cssproperty --text-color - Controls the text color of the chip
 * @cssproperty --border-color - Controls the border color of the chip
 * @cssproperty --bg-default - Controls the default background color
 * @cssproperty --bg-hovered - Controls the background color when hovered
 * @cssproperty --bg-pressed - Controls the background color when pressed
 * @cssproperty --bg-focused - Controls the background color when focused
 */
export default class PlusChip extends Tailwind {
  /**
   * Determines the visual style of the chip
   * - filled: Solid background color
   * - outlined: Transparent background with border
   * @default 'filled'
   */
  @property({ type: String })
  kind: 'filled' | 'outlined' = 'filled';

  /**
   * Sets the size of the chip
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Defines the type of chip
   * - default: Standard chip
   * - avatar: Chip with avatar support
   * @default 'default'
   */
  @property({ type: String })
  type: 'default' | 'avatar' = 'default';

  /**
   * Sets the status/color variant of the chip
   * - default: Neutral color scheme
   * - success: Green color scheme
   * - warning: Yellow color scheme
   * - danger: Red color scheme
   * - info: Blue color scheme
   * @default 'default'
   */
  @property({ type: String })
  status: 'default' | 'success' | 'warning' | 'danger' | 'info' = 'default';

  /**
   * Controls the border radius style
   * - full: Fully rounded corners
   * - rounded: Slightly rounded corners
   * @default 'full'
   */
  @property({ type: String })
  shape: 'full' | 'rounded' = 'full';

  /**
   * Toggles inverted color scheme
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value !== 'false' })
  invert = false;

  /**
   * Shows/hides the dismiss button
   * @default false
   */
  @property({ type: Boolean, converter: (value) => value !== 'false' })
  dismiss = false;

  /**
   * Disables the chip interaction
   * @default false
   */
  @property({ type: Boolean })
  disabled = false;

  static override styles = [...Tailwind.styles];

  /**
   * Handles the dismiss event
   * @private
   */
  private onDismiss() {
    if (!this.disabled) {
      this.emit('dismiss');
    }
  }

  override render() {
    const filledStyles = {
      '--i-bg-default': `var(--plus-color-background-${this.status}-default)`,
      '--i-bg-hovered': `var(--plus-color-background-${this.status}-hovered)`,
      '--i-bg-focused': `var(--plus-color-background-${this.status}-pressed)`,
      '--i-bg-pressed': `var(--plus-color-background-${this.status}-focused)`,
      '--i-text-color': `var(--plus-color-text-${this.status === 'default' ? 'default' : 'base'})`,
      '--i-border-color': 'transparent',
    };

    const filledInvertStyles = {
      '--i-bg-default': `var(--plus-color-background-${this.status}-invert-default)`,
      '--i-bg-hovered': `var(--plus-color-background-${this.status}-invert-hovered)`,
      '--i-bg-focused': `var(--plus-color-background-${this.status}-invert-pressed)`,
      '--i-bg-pressed': `var(--plus-color-background-${this.status}-invert-focused)`,
      '--i-text-color': `var(--plus-color-text-${this.status === 'default' ? 'base' : 'default'})`,
      '--i-border-color': 'transparent',
    };

    const outlinedStyles = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-bg-hovered': 'var(--plus-color-background-default-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-default-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-default-focused)',
      '--i-text-color': `var(--plus-color-text-${this.status})`,
      '--i-border-color': `var(--plus-color-border-${this.status})`,
    };

    const styles = {
      filled: this.invert ? filledInvertStyles : filledStyles,
      outlined: outlinedStyles,
    };

    const style = styleMap(styles[this.kind]);

    const { base, icon } = chipStyle({
      kind: this.kind,
      size: this.size,
      type: this.type,
      shape: this.shape,
      disabled: this.disabled,
      status: this.status,
    });

    return html`
      <div
        role="status"
        aria-live="polite"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled}
        aria-label=${`${this.status} chip`}
        class=${base()}
        style=${style}
        part="base"
      >
        <slot></slot>
        ${this.dismiss
          ? html`<plus-icon
              class=${icon()}
              role="button"
              tabindex="0"
              part="icon"
              aria-label="Remove"
              @click=${this.onDismiss}
              iconName="xmark"
            >
            </plus-icon>`
          : nothing}
      </div>
    `;
  }
}

export { PlusChip };
