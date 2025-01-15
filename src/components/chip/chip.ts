import { html, PropertyValues, nothing } from 'lit';
import Tailwind from '../base/tailwind-base';
import { property } from 'lit/decorators.js';
import chipHostStyle from './chip-host.style';
import { chipStyle } from './chip.style';

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

  protected override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has('status') || _changedProperties.has('kind')) {
      if (this.status !== 'default' && this.kind == 'filled') {
        const prefix = this.invert ? 'invert-' : '';
        this.style.setProperty('--bg-default', `var(--plus-color-background-status-${prefix}${this.status}-default)`);
        this.style.setProperty('--bg-hovered', `var(--plus-color-background-status-${prefix}${this.status}-hovered)`);
        this.style.setProperty('--bg-pressed', `var(--plus-color-background-status-${prefix}${this.status}-pressed)`);
        this.style.setProperty('--text-color', `var(--plus-color-text-${this.invert ? 'default' : 'base'})`);
      }

      if (this.kind == 'outlined' && this.status != 'default') {
        this.style.setProperty('--text-color', `var(--plus-color-text-${this.status})`);
        this.style.setProperty('--border', `var(--plus-color-border-${this.status})`);
      }
    }
  }

  private onDismiss() {
    this.dispatchEvent(new CustomEvent('dismiss'));
  }

  override render() {
    const { kind, status, size, type, shape, disabled, dismiss } = this;

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
      >
        <slot></slot>
        ${dismiss
          ? html`<plus-icon
              class=${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'}
              role="button"
              tabindex="0"
              aria-label="Remove"
              @click=${() => !disabled && this.onDismiss()}
              iconName="xmark"
            >
            </plus-icon>`
          : nothing}
      </div>
    `;
  }
}
export { PlusChip };
