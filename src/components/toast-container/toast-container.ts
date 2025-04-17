import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { toastContainerStyle } from './toast-container.style.js';
import { ToastService } from '../../services/toast.service';
import type { ActiveToast, PositionType } from '../../services/toast.service';

import Tailwind from '../base/tailwind-base.js';
import '../toast/toast.js';

/**
 * @tag plus-toast-container
 * @summary A container element that listens to the ToastService to display toast notifications.
 * @dependency plus-toast
 * @dependency ToastService
 *
 * @slot - Toast components are rendered here based on ToastService updates.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --toast-container-gap - Controls the gap between toasts within the container.
 * @cssproperty --toast-container-z-index - Controls the stack order of the container.
 */
export default class PlusToastContainer extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        position: fixed;
        z-index: var(--toast-container-z-index, 9999);
        pointer-events: none;
        inset-block-start: var(--plus-spacing-04);
        inset-inline-end: var(--plus-spacing-04);
        max-width: calc(100% - 2 * var(--plus-spacing-04));
        width: fit-content;
      }
      :host ::slotted(plus-toast) {
        pointer-events: auto;
      }
    `,
  ];

  /**
   * The position the container is responsible for.
   * Only toasts targeted for this position via ToastService will be displayed.
   * @default 'top-right'
   */
  @property({ type: String, reflect: true }) position: PositionType =
    'top-right';

  /** The list of active toasts provided by the service. */
  @state()
  private _toasts: ActiveToast[] = [];

  private _unsubscribe: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._unsubscribe = ToastService.subscribe((toasts) => {
      this._toasts = [...toasts];
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe?.();
    this._unsubscribe = null;
  }

  private _handleToastEvent(event: Event) {
    const toastElement = event.target as HTMLElement;
    if (toastElement.tagName.toLowerCase() === 'plus-toast') {
      const toastId = toastElement.getAttribute('toast-id');
      if (toastId) {
        ToastService.close(toastId);
      }
    }
  }

  override render() {
    const { base } = toastContainerStyle({ position: this.position });

    const filteredToasts = this._toasts.filter(
      (toast) => toast.position === this.position
    );

    return html`
      <div class="${base()}" part="base" @plus-close=${this._handleToastEvent}>
        ${filteredToasts.map(
          (toast) => html`
            <plus-toast
              toast-id=${toast.id}
              .message=${toast.message}
              .header=${toast.header}
              .status=${toast.status ?? 'default'}
              .icon=${toast.icon}
              .kind=${toast.kind ?? 'default'}
              .size=${toast.size ?? 'md'}
              ?dismiss=${toast.dismiss ?? true}
              ?statusIcon=${toast.statusIcon ?? true}
            ></plus-toast>
          `
        )}
      </div>
    `;
  }
}

export { PlusToastContainer };
