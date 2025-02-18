import { html } from 'lit';
import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import style from './alert.styles';
import { alertStyle } from './alert.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Add a description here
 *
 * @tag plus-alert
 * @since 0.0.0
 * @status experimental
 *
 **/
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
   * - success: Green color scheme
   * - warning: Yellow color scheme
   * - danger: Red color scheme
   * - info: Blue color scheme
   * @default 'default'
   * @type {'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'}
   * @attr {string} status
   */
  @property({ type: String })
  status: 'success' | 'warning' | 'danger' | 'info' = 'info';

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
   * The label of the alert
   * @default ''
   * @type {string}
   * @slot label
   */
  @property({ type: String })
  label = '';

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
  statusIcon = '';

  /**
   * The dismiss icon of the alert
   * @default ''
   * @type {string}
   * @slot dismiss
   */
  @property({ type: String })
  dismissIcon = '';

  override render() {
    const commonStyles = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-text-color': `var(--plus-color-text-${this.status})`,
      '--i-border-color': `var(--plus-color-border-${this.status})`,
    };

    const styles = {
      filled: commonStyles,
      outlined: commonStyles,
      dashed: commonStyles,
    };

    const { base, statusIcon, content, label, description, dismiss } =
      alertStyle({
        kind: this.kind,
        size: this.size,
        status: this.status,
        invert: this.invert,
        dismissible: this.dismissible,
      });

    return html`
      <div class=${base()} part="base" style=${styleMap(styles[this.kind])}>
        <div class=${statusIcon()} part="status-icon">
          <slot name="prefix">${this.statusIcon}</slot>
        </div>
        <div class=${content()} part="content">
          <slot name="label" class=${label()} part="label">${this.label}</slot>
          <slot name="description" class=${description()} part="description">
            ${this.description}
          </slot>
        </div>
        ${this.dismissible
          ? html`<slot name="dismiss" class=${dismiss()} part="dismiss">
              ${this.dismissIcon}
            </slot>`
          : ''}
      </div>
    `;
  }

  static override styles = [...Tailwind.styles, style];
}

export { PlusAlert };
