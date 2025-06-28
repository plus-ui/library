import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import { modalStyle } from './modal.style';
import Tailwind from '../base/tailwind-base';

/**
 * @tag plus-modal
 * @summary Modal dialog component that appears on top of the page content.
 *
 * @slot header - The header content of the modal
 * @slot body - The main content of the modal
 * @slot footer - The footer content of the modal
 * @slot close - Custom close button (defaults to an X icon)
 *
 * @csspart container - The main container element
 * @csspart overlay - The overlay element
 * @csspart modal - The modal element
 * @csspart header - The header element
 * @csspart body - The body element
 * @csspart footer - The footer element
 * @csspart close-button - The close button element
 *
 * @example
 * ```html
 * <plus-modal>
 *   <div slot="header">Modal Title</div>
 *   <div slot="body">Modal Content</div>
 *   <div slot="footer">
 *     <button>Save</button>
 *   </div>
 * </plus-modal>
 * ```
 */
export default class PlusModal extends Tailwind {
  /**
   * The size of the modal
   * @type {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'}
   * @default 'md'
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'md';

  /**
   * Whether the modal is open
   * @type {boolean}
   * @default false
   * @attr is-open
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'is-open',
    converter: booleanConverter,
  })
  isOpen = false;

  /**
   * Whether the modal should take full width
   * @type {boolean}
   * @default false
   * @attr full-width
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'full-width',
    converter: booleanConverter,
  })
  fullWidth = false;

  /**
   * Whether the modal should close when clicking the backdrop
   * @type {boolean}
   * @default true
   * @attr close-on-backdrop
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
    reflect: true,
    attribute: 'close-on-backdrop',
  })
  closeOnBackdrop = true;

  /**
   * Whether the modal should close when pressing the Escape key
   * @type {boolean}
   * @default true
   * @attr close-on-esc
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
    reflect: true,
    attribute: 'close-on-esc',
  })
  closeOnEsc = true;

  /**
   * The duration of the animation in milliseconds
   * @type {number}
   * @default 300
   * @attr animation-duration
   */
  @property({ type: Number, reflect: true, attribute: 'animation-duration' })
  animationDuration = 300;

  @state()
  private isAnimating = false;

  // private modalElement: HTMLElement | null = null;
  private keydownHandler: (e: KeyboardEvent) => void;

  constructor() {
    super();
    this.keydownHandler = this.handleKeydown.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('plus-modal-before-show', this.handleBeforeShow);
    this.addEventListener('plus-modal-before-hide', this.handleBeforeHide);
  }

  /**
   * Hides the modal with animation
   * @returns {void}
   */
  hide() {
    if (this.isAnimating) return;
    this.emit('plus-modal-before-hide');
  }

  private handleBeforeHide() {
    this.isAnimating = true;
    this.isOpen = false;

    setTimeout(() => {
      this.isAnimating = false;
      this.emit('plus-modal-hide');
    }, this.animationDuration);
  }

  /**
   * Shows the modal with animation
   * @returns {void}
   */
  show() {
    if (this.isAnimating) return;
    this.emit('plus-modal-before-show');
  }

  private handleBeforeShow() {
    this.isAnimating = true;
    this.isOpen = true;

    setTimeout(() => {
      this.isAnimating = false;
      this.emit('plus-modal-show');
    }, this.animationDuration);

    if (this.closeOnEsc) {
      document.addEventListener('keydown', this.keydownHandler);
    }
  }

  // override firstUpdated() {
  //   this.modalElement = this.shadowRoot?.querySelector('.modal') as HTMLElement;
  // }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('plus-modal-before-show', this.handleBeforeShow);
    this.removeEventListener('plus-modal-before-hide', this.handleBeforeHide);
    document.removeEventListener('keydown', this.keydownHandler);
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.closeOnEsc && this.isOpen) {
      this.hide();
    }
  }

  private handleBackdropClick(e: MouseEvent) {
    // Check if the click was on the backdrop (overlay) and not on the modal content
    if (e.target === e.currentTarget && this.closeOnBackdrop) {
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

    return html`
      <div
        class=${base()}
        part="container"
        role="dialog"
        aria-modal="true"
        aria-hidden=${!isOpen}
        aria-label="Modal"
      >
        <div
          class=${modalOverlay()}
          part="overlay"
          @click=${this.handleBackdropClick}
        ></div>
        <div class=${modalClass()} part="modal">
          <div class=${modalContainer()}>
            <div class=${modalHeader()} part="header">
              <slot name="header"></slot>
              <slot name="close">
                <button
                  class=${modalCloseButtonClass()}
                  part="close-button"
                  aria-label="Close modal"
                  @click=${() => this.hide()}
                >
                  <plus-svg-icon iconName="xmark"></plus-svg-icon>
                </button>
              </slot>
            </div>
            <div class=${modalBody()} part="body">
              <slot name="body"></slot>
              <slot></slot>
            </div>
            <div class=${modalFooter()} part="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export { PlusModal };
