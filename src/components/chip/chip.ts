import { html, nothing } from 'lit';
import Tailwind from '../base/tailwind-base';
import { property } from 'lit/decorators.js';
import chipHostStyle from './chip-host.style';
import { chipStyle } from './chip.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * A customizable chip component with status and dismissible features
 *
 * @element plus-chip
 *
 * @slot - Default slot for chip content
 *
 * @cssproperty --bg-default - Default background color
 * @cssproperty --bg-hovered - Background color on hover
 * @cssproperty --bg-pressed - Background color when pressed
 * @cssproperty --text-color - Text color
 * @cssproperty --rounded - Border radius
 * @cssproperty --border - Border color
 *
 * @attr {string} id - Unique identifier for chip
 * @attr {string} kind - Visual style of chip (filled, outlined) - default: 'filled'
 * @attr {string} size - Size of chip (sm, md, lg) - default: 'md'
 * @attr {string} type - Type of chip (default, avatar) - default: 'default'
 * @attr {string} status - Status of chip (default, success, warning, danger, info) - default: 'default'
 * @attr {string} shape - Border radius style (full, rounded) - default: 'full'
 * @attr {boolean} invert - Whether to use inverted colors - default: false
 * @attr {boolean} dismiss - Whether chip is dismissible - default: false
 * @attr {boolean} disabled - Whether chip is disabled - default: false
 *
 * @fires dismiss - Fired when dismiss button is clicked
 *
 * @csspart base - The chip wrapper element
 * @csspart dismiss-icon - The dismiss button icon
 *
 * @accessibility
 * - Uses role="status" for screen reader announcements
 * - Supports aria-live="polite" for dynamic content changes
 * - Includes aria-label with status information
 * - Dismiss button has aria-label="Remove" and role="button"
 * - Disabled state reflected with aria-disabled and tabindex
 */

export default class PlusChip extends Tailwind {
  @property({ type: String, reflect: true })
  override id: string = `plusui-${Math.random().toString(36).slice(2, 12)}`;

  @property({ type: String, reflect: true })
  kind: 'filled' | 'outlined' = 'filled';

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
  type: 'default' | 'avatar' = 'default';

  @property({ type: String })
  status: 'default' | 'success' | 'warning' | 'danger' | 'info' = 'default';

  @property({ type: String })
  shape: 'full' | 'rounded' = 'full';

  @property({ type: Boolean, converter: value => value != 'false' })
  invert = false;

  @property({ type: Boolean, converter: value => value != 'false' })
  dismiss = false;

  @property({ type: Boolean })
  disabled = false;

  static override styles = [...Tailwind.styles, chipHostStyle];

  constructor() {
    super();
  }

  private onDismiss() {
    this.emit('dismiss');
  }

  override render() {
    const { kind, status, size, type, shape, disabled, dismiss, invert } = this;
    
    const filledStyles = {
      '--i-bg-default': `var(--plus-color-background-${status}-default)`,
      '--i-bg-hovered': `var(--plus-color-background-${status}-hovered)`,
      '--i-bg-focused': `var(--plus-color-background-${status}-pressed)`,
      '--i-bg-pressed': `var(--plus-color-background-${status}-focused)`,
      '--i-text-color': `var(--plus-color-text-${status === 'default' ? 'default' : 'base'})`,
      '--i-border-color': 'transparent',
    };
    
    const invertFilledStyles = {
      '--i-bg-default': `var(--plus-color-background-${status}-invert-default)`,
      '--i-bg-hovered': `var(--plus-color-background-${status}-invert-hovered)`,
      '--i-bg-focused': `var(--plus-color-background-${status}-invert-pressed)`,
      '--i-bg-pressed': `var(--plus-color-background-${status}-invert-focused)`,
      '--i-text-color': `var(--plus-color-text-${status === 'default' ? 'base' : 'default'})`,
      '--i-border-color': 'transparent',
    };
    
    const outlinedStyles = {
      '--i-bg-default': `var(--plus-color-background-surface)`,
      '--i-bg-hovered': 'var(--plus-color-background-default-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-default-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-default-focused)',
      '--i-text-color': `var(--plus-color-text-${status})`,
      '--i-border-color': `var(--plus-color-border-${status})`,
    };

    const styles = {
      filled: {
        ...(invert ? invertFilledStyles : filledStyles),
      },
      outlined: {
        ...outlinedStyles,
      },
    };

    const style = styleMap(styles[this.kind]);

    return html`
      <div
        role="status"
        aria-live="polite"
        tabindex=${disabled ? '-1' : '0'}
        aria-disabled=${disabled ? 'true' : 'false'}
        aria-label=${status !== 'default' ? status + '-chip' : nothing}
        class=${chipStyle({
          kind,
          size,
          type,
          shape,
          disabled,
        })}
        style=${style}
      >
        <slot></slot>
        ${dismiss
          ? html`<plus-icon class=${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'} role="button" tabindex="0" aria-label="Remove" @click=${() => !disabled && this.onDismiss()} iconName="xmark"> </plus-icon>`
          : nothing}
      </div>
    `;
  }
}
export { PlusChip };
