import { html, nothing, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { toastStyle } from './toast.style.js';
import Tailwind from '../base/tailwind-base.js';
import { SlotController } from '../../controllers/slot-controller.js';
import { booleanConverter } from '../../utils/boolean-converter';

// Define types locally instead of importing
type SizeType = 'sm' | 'md' | 'lg';
type StatusType = 'info' | 'success' | 'warning' | 'danger' | 'default';

/**
 * @tag plus-toast
 * @summary Displays short, temporary messages.
 *
 * @slot - The default slot for the toast message content. If both message and header properties are set, this slot is ignored.
 * @slot header - Optional header content for the toast. Overrides the header property.
 * @slot icon - Optional icon content to replace the default status icon.
 *
 * @csspart base - The component's base wrapper.
 * @csspart container - The main container for icon, content, and close button.
 * @csspart icon - The container for the status icon.
 * @csspart content - The container for header and message text.
 * @csspart header - The header text element.
 * @csspart message - The message text element.
 * @csspart close-button - The close button container.
 *
 * @cssproperty --toast-border-radius - Controls the border radius of the toast.
 * @cssproperty --toast-padding - Controls the padding of the toast.
 * @cssproperty --icon-size - Controls the size of the status icon.
 * @cssproperty --close-button-size - Controls the size of the close button.
 *
 * @event plus-close - Emitted when the toast is closed by the user via the close button.
 *
 * @dependency plus-icon
 * @dependency SlotController
 */
export class PlusToast extends Tailwind {
  private readonly slotController = new SlotController(this);

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: fit-content;
      }
    `,
  ];

  /** The size of the toast. */
  @property({ type: String }) size: SizeType = 'md';

  /** The visual style of the toast. */
  @property({ type: String }) kind: 'default' | 'outlined' | 'dashed' =
    'default';

  /** The status variant of the toast, controlling color and icon. */
  @property({ type: String }) status: StatusType = 'default';

  /** Determines if the dismiss button is shown. */
  @property({
    type: Boolean,
    converter: booleanConverter,
    reflect: true,
  })
  dismiss = true;

  /** Shows the default status icon. */
  @property({
    type: Boolean,
    converter: booleanConverter,
    attribute: 'status-icon',
    reflect: true,
  })
  statusIcon = true;

  @property({ type: String }) header?: string;

  /** Optional custom icon name (e.g., 'fa-solid fa-star') or SVG string. Overrides the default status icon. Ignored if the 'icon' slot is used.*/
  @property({ type: String }) icon?: string;

  @property({ type: String }) message?: string;

  private _handleCloseClick() {
    this.emit('plus-close');
  }

  // --- Private Render Helper Methods ---

  private _renderIcon(
    iconClassFn: () => string
  ): TemplateResult | typeof nothing {
    const hasIconSlot = this.slotController.test('icon');

    if (hasIconSlot) {
      return html`<span part="icon" class=${iconClassFn()}
        ><slot name="icon"></slot
      ></span>`;
    }

    let iconName = this.icon;
    if (!iconName && this.statusIcon && this.status !== 'default') {
      const defaultIcons: Record<StatusType | 'default', string> = {
        info: 'circle-info',
        success: 'circle-check',
        warning: 'triangle-exclamation',
        danger: 'circle-xmark',
        default: '',
      };
      if (this.status in defaultIcons) {
        iconName = defaultIcons[this.status as StatusType];
      }
    }

    if (iconName) {
      return html`<span part="icon" class=${iconClassFn()}
        ><plus-icon icon-name=${iconName}></plus-icon
      ></span>`;
    }

    return nothing;
  }

  private _renderHeader(
    titleClassFn: () => string
  ): TemplateResult | typeof nothing {
    const hasHeaderSlot = this.slotController.test('header');
    if (hasHeaderSlot || this.header) {
      return html`<div part="header" class=${titleClassFn()}>
        ${hasHeaderSlot ? html`<slot name="header"></slot>` : this.header}
      </div>`;
    }
    return nothing;
  }

  private _renderMessage(
    messageClassFn: () => string
  ): TemplateResult | typeof nothing {
    const hasDefaultSlot = this.slotController.test();
    if (hasDefaultSlot || this.message) {
      return html`<div part="message" class="${messageClassFn()}">
        ${hasDefaultSlot ? html`<slot></slot>` : this.message}
      </div>`;
    }
    return nothing;
  }

  private _renderDismissButton(
    closeClassFn: () => string
  ): TemplateResult | typeof nothing {
    if (this.dismiss) {
      return html` <button
        part="close-button"
        class=${closeClassFn()}
        @click=${this._handleCloseClick}
        aria-label="Close"
      >
        <plus-icon icon-name="xmark"></plus-icon>
      </button>`;
    }
    return nothing;
  }

  // --- Main Render Method ---
  override render() {
    const { size, kind, status } = this;

    // Get the style object containing class-generating functions
    const styles = toastStyle({ size, kind, status });

    return html`
      <div
        class=${styles.base()}
        part="base"
        role="status"
        aria-live=${status === 'danger' || status === 'warning'
          ? 'assertive'
          : 'polite'}
        aria-atomic="true"
      >
        <div class="${styles.containerClass()}" part="container">
          ${this._renderIcon(styles.iconClass)}

          <div class="${styles.contentClass()}" part="content">
            ${this._renderHeader(styles.titleClass)}
            ${this._renderMessage(styles.messageClass)}
          </div>

          ${this._renderDismissButton(styles.closeClass)}
        </div>
      </div>
    `;
  }
}
