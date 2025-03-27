import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { modalStyle } from './modal.style';
import Tailwind from '../base/tailwind-base';

export default class PlusModal extends Tailwind {
  @property() size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, attribute: 'is-open' }) isOpen: boolean = false;
  @property({ reflect: true, attribute: 'full-width', type: Boolean })
  fullWidth = false;
  @property({ type: Boolean }) closeOnBackdrop: boolean = true;
  @property({ type: Boolean }) closeOnEsc: boolean = true;
  @property({ type: Number }) animationDuration: number = 300; // Animation duration in ms

  private modalElement: HTMLElement | null = null;

  constructor() {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('plus-modal-before-show', this.modalShow);
    this.addEventListener('plus-modal-before-hide', this.modalHide);
  }

  hide() {
    this.emit('plus-modal-before-hide');
  }

  private modalHide() {
    this.isOpen = false;

    setTimeout(() => {
      this.emit('plus-modal-hide');
    }, this.animationDuration);
  }

  show() {
    this.emit('plus-modal-before-show');
  }

  private modalShow() {
    this.isOpen = true;

    setTimeout(() => {
      this.emit('plus-modal-show');
    }, 50); // Small delay to ensure classes are applied before animation starts

    if (this.closeOnEsc) {
      document.addEventListener('keydown', this.keydownHandler);
    }
  }

  override firstUpdated() {
    this.modalElement = this.shadowRoot?.querySelector('.modal') as HTMLElement;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('plus-modal-before-show', this.modalShow);
    this.removeEventListener('plus-modal-before-hide', this.modalHide);
    document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.closeOnEsc) {
      this.hide();
    }
  };

  handleBackdropClick() {
    if (this.closeOnBackdrop) {
      this.hide();
    }
  }

  override render() {
    const { size, isOpen, fullWidth } = this;

    const {
      base,
      modalClass,
      modalOverlay,
      modalContainer,
      modalHeader,
      modalBody,
      modalFooter,
      modalCloseButtonClass,
    } = modalStyle({ size, isOpen, fullWidth });

    return html`<div class=${base()}>
      <div
        class=${modalOverlay()}
        @click=${() => this.handleBackdropClick()}
      ></div>
      <div class=${modalClass()}>
        <div class=${modalContainer()}>
          <slot name="close">
            <button
              class=${modalCloseButtonClass()}
              aria-label="Close"
              @click=${() => this.hide()}
            >
              <i class="fas fa-xmark"></i>
            </button>
          </slot>
          <div class=${modalHeader()}>
            <slot name="header"></slot>
          </div>
          <div class=${modalBody()}>
            <slot name="body"></slot>
            <slot></slot>
          </div>
          <div class=${modalFooter()}>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>`;
  }
}

export { PlusModal };
