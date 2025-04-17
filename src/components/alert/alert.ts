import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import style from './alert.styles';
import { alertStyle } from './alert.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-alert
 * @summary Alert component that displays important messages to users.
 *
 * @slot message - The main message content
 * @slot description - Additional descriptive content
 * @slot prefix - Custom status icon
 * @slot dismiss - Custom dismiss button
 *
 * @csspart base - The main container element
 * @csspart status-icon - The status icon container
 * @csspart content - The content container
 * @csspart message - The message container
 * @csspart description - The description container
 * @csspart dismiss - The dismiss button container
 *
 * @event plus-dismiss - Emitted when the alert is dismissed
 *
 * @example
 * ```html
 * <plus-alert status="success" dismissible>
 *   <div slot="message">Success!</div>
 *   <div slot="description">Your changes have been saved.</div>
 * </plus-alert>
 * ```
 */
export default class PlusAlert extends Tailwind {
  /**
   * Determines the visual style of the alert
   * - filled: Solid background color
   * - outlined: Transparent background with border
   * - dashed: Transparent background with dashed border
   * @default 'filled'
   * @type {'filled' | 'outlined' | 'dashed'}
   */
  @property({ type: String })
  kind: 'filled' | 'outlined' | 'dashed' = 'filled';

  /**
   * The size of the alert
   *
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Sets the status/color variant of the alert
   * - default: Neutral color scheme
   * - primary: Brand color scheme
   * - success: Green color scheme
   * - warning: Yellow color scheme
   * - danger: Red color scheme
   * - info: Blue color scheme
   * @default 'default'
   */
  @property({ type: String })
  status: 'default' | 'success' | 'warning' | 'danger' | 'info' = 'default';

  /**
   * When true, the alert will be displayed with an inverted color scheme
   * @default false
   * @type {boolean}
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => (value == 'false' || false ? false : true),
  })
  invert = false;

  /**
   * When true, the alert will be displayed with a dismissible close button
   * @default true
   * @type {boolean}
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => (value == 'false' || false ? false : true),
  })
  dismissible = true;

  /**
   * The message of the alert
   * @default ''
   * @type {string}
   * @slot message
   */
  @property({ type: String })
  message = '';

  /**
   * The description of the alert
   * @default ''
   * @type {string}
   * @slot description
   */
  @property({ type: String })
  description = '';

  /**
   * The status icon of the alert
   * @default ''
   * @type {string}
   * @slot prefix
   */
  @property({ type: String })
  statusIcon?: string;

  /**
   * The dismiss icon of the alert
   * @default ''
   * @type {string}
   * @slot dismiss
   */
  @property({ type: String })
  dismissIcon?: string;

  /**
   * When true, the alert will be displayed with a full width
   * @default false
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  /**
   * When true, the alert will be hidden
   * @default false
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, attribute: 'hidden' })
  hiddenAlert = false;

  /**
   * Handles the dismiss action of the alert
   * @private
   */
  private handleDismiss() {
    const alert = this.shadowRoot?.querySelector(
      '[part="base"]'
    ) as HTMLElement;

    if (alert) {
      alert.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
      alert.style.opacity = '0';
      alert.style.transform = 'scale(0.98)';

      setTimeout(() => {
        this.hiddenAlert = true;
        this.emit('plus-dismiss', { detail: { status: this.status } });
      }, 250);
    }
  }

  override render() {
    const filledStyles = {
      '--i-bg-color': `var(--plus-color-background-${this.status}-default)`,
      '--i-icon-color': `var(--plus-color-text-${this.status == 'default' ? 'default' : `${this.status}-invert`})`,
      '--i-dismiss-color': `var(--plus-color-text-${this.status == 'default' ? 'default' : 'base'})`,
      '--i-message-color': `var(--plus-color-text-${this.status == 'default' ? 'default' : 'base'})`,
      '--i-description-color': `var(--plus-color-text-${this.status == 'default' ? 'default' : 'base'})`,
      '--i-border-color': `transparent`,
    };
    const filledInvertedStyles = {
      '--i-bg-color': `var(--plus-color-background-${this.status}-invert-default)`,
      '--i-icon-color': `var(--plus-color-text-${this.status == 'default' ? 'base' : `${this.status}`})`,
      '--i-dismiss-color': `var(--plus-color-text-${this.status == 'default' ? 'base' : 'default'})`,
      '--i-message-color': `var(--plus-color-text-${this.status == 'default' ? 'base' : 'default'})`,
      '--i-description-color': `var(--plus-color-text-${this.status == 'default' ? 'base' : 'default'})`,
      '--i-border-color': `transparent`,
    };
    const outlinedStyles = {
      '--i-bg-color': `transparent`,
      '--i-icon-color': `var(--plus-color-text-${this.status})`,
      '--i-dismiss-color': `var(--plus-color-text-default)`,
      '--i-message-color': `var(--plus-color-text-${this.status})`,
      '--i-description-color': `var(--plus-color-text-default)`,
      '--i-border-color': `var(--plus-color-border-${this.status})`,
    };

    const styles = {
      filled: this.invert ? filledInvertedStyles : filledStyles,
      outlined: outlinedStyles,
      dashed: outlinedStyles,
    };

    const { base, statusIcon, content, message, description, dismiss } =
      alertStyle({
        kind: this.kind,
        size: this.size,
        status: this.status,
        invert: this.invert,
        dismissible: this.dismissible,
        hidden: this.hiddenAlert,
      });

    const statusIconMap = {
      default: 'heart-circle-plus',
      success: 'circle-check',
      warning: 'triangle-exclamation',
      danger: 'circle-exclamation',
      info: 'circle-info',
    } as const;

    return html`
      <div
        class=${base()}
        part="base"
        style=${styleMap(styles[this.kind])}
        role="alert"
        aria-live="polite"
      >
        <div class=${statusIcon()} part="status-icon">
          <slot name="prefix">
            ${html`<plus-svg-icon
              iconName=${this.statusIcon || statusIconMap[this.status]}
              part="status-icon"
            >
            </plus-svg-icon>`}
          </slot>
        </div>
        <div class=${content()} part="content">
          <slot name="message" class=${message()} part="message"
            >${this.message}</slot
          >
          <slot name="description" class=${description()} part="description"
            >${this.description}</slot
          >
        </div>
        ${this.dismissible && !this.hiddenAlert
          ? html`<slot
              name="dismiss"
              class=${dismiss()}
              part="dismiss"
              @click=${this.handleDismiss}
              aria-label="Close alert"
            >
              <plus-svg-icon
                iconName=${this.dismissIcon || 'xmark'}
              ></plus-svg-icon>
            </slot>`
          : nothing}
      </div>
    `;
  }

  static override styles = [...Tailwind.styles, style];
}

export { PlusAlert };
