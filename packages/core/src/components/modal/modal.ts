import { html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { booleanConverter } from '../../utils/boolean-converter';
import { modalStyle } from './modal.style';
import Tailwind from '../base/tailwind-base';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ModalPlacement = 'center' | 'top';

/**
 * @tag plus-modal
 * @summary Modal dialog component built on native HTML Dialog API. Displays content in a layer above the page with full keyboard and focus management.
 *
 * @slot - Main content area (same as body slot)
 * @slot header - The header content of the modal
 * @slot body - The main content of the modal (alternative to default slot)
 * @slot footer - The footer content of the modal
 * @slot close - Custom close button (defaults to an X icon)
 *
 * @csspart dialog - The native dialog element
 * @csspart container - The container wrapper for centering and scrolling
 * @csspart modal - The main modal box
 * @csspart header - The header section
 * @csspart header-content - The content wrapper inside header
 * @csspart body - The main content area
 * @csspart footer - The footer section
 * @csspart close-button - The close button element
 *
 * @event plus-modal-open - Emitted after the modal has opened
 * @event plus-modal-close - Emitted after the modal has closed
 * @event plus-modal-before-open - Emitted before the modal opens (cancelable)
 * @event plus-modal-before-close - Emitted before the modal closes (cancelable)
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <plus-modal is-open>
 *   <div slot="header">Modal Title</div>
 *   <div slot="body">Modal Content</div>
 *   <div slot="footer">
 *     <button data-dismiss>Close</button>
 *   </div>
 * </plus-modal>
 *
 * <!-- Full screen modal -->
 * <plus-modal full-screen>
 *   <div slot="header">Full Screen</div>
 *   <p>Content here</p>
 * </plus-modal>
 *
 * <!-- Static backdrop (shake on outside click) -->
 * <plus-modal backdrop="static">
 *   <div slot="header">Can't Close Outside</div>
 *   <p>Must use close button</p>
 * </plus-modal>
 * ```
 */
export default class PlusModal extends Tailwind {
  @query('dialog')
  private dialogRef?: HTMLDialogElement;

  /**
   * The size of the modal
   * @type {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'}
   * @default 'md'
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: ModalSize = 'md';

  /**
   * The placement of the modal on the screen
   * @type {'center' | 'top'}
   * @default 'center'
   * @attr placement
   */
  @property({ type: String, reflect: true })
  placement: ModalPlacement = 'center';

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
   * Makes the modal take the full screen (100vw x 100vh, no border radius)
   * @type {boolean}
   * @default false
   * @attr full-screen
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'full-screen',
    converter: booleanConverter,
  })
  fullScreen = false;

  /**
   * Controls backdrop behavior
   * - true: Shows backdrop, modal can be closed by clicking outside
   * - false: No backdrop
   * - 'static': Shows backdrop but prevents closing by clicking outside (triggers shake animation)
   * @type {boolean | 'static'}
   * @default true
   * @attr backdrop
   */
  @property({ type: String, reflect: true })
  backdrop: boolean | 'static' = true;

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
   * Hides the header section completely
   * @type {boolean}
   * @default false
   * @attr no-header
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'no-header',
    converter: booleanConverter,
  })
  noHeader = false;

  /**
   * Hides the footer section completely
   * @type {boolean}
   * @default false
   * @attr no-footer
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'no-footer',
    converter: booleanConverter,
  })
  noFooter = false;

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

  @state()
  private shake = false;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('plus-modal-before-open', this.handleBeforeOpen);
    this.addEventListener('plus-modal-before-close', this.handleBeforeClose);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('plus-modal-before-open', this.handleBeforeOpen);
    this.removeEventListener('plus-modal-before-close', this.handleBeforeClose);
    if (this.dialogRef && this.isOpen) {
      this.dialogRef.close();
    }
  }

  override firstUpdated() {
    if (this.isOpen && this.dialogRef) {
      this.dialogRef.showModal();
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('isOpen')) {
      if (this.isOpen) {
        this.handleOpenChange();
      } else {
        this.handleCloseChange();
      }
    }
  }

  /**
   * Shows the modal with animation
   * @returns {Promise<void>}
   */
  async show(): Promise<void> {
    if (this.isAnimating || this.isOpen) return;
    this.isOpen = true;
  }

  /**
   * Hides the modal with animation
   * @returns {Promise<void>}
   */
  async hide(): Promise<void> {
    if (this.isAnimating || !this.isOpen) return;
    this.isOpen = false;
  }

  /**
   * Toggles the modal open/closed state
   * @returns {Promise<void>}
   */
  async toggle(): Promise<void> {
    if (this.isOpen) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  private async handleOpenChange() {
    this.isAnimating = true;

    const event = this.emit('plus-modal-before-open', { cancelable: true });
    if (event.defaultPrevented) {
      this.isOpen = false;
      this.isAnimating = false;
      return;
    }

    if (this.dialogRef) {
      this.dialogRef.showModal();
      // Small delay for animation
      await new Promise(resolve => setTimeout(resolve, 50));
      this.isAnimating = false;
      this.emit('plus-modal-open');
    }
  }

  private async handleCloseChange() {
    this.isAnimating = true;

    const event = this.emit('plus-modal-before-close', { cancelable: true });
    if (event.defaultPrevented) {
      this.isOpen = true;
      this.isAnimating = false;
      return;
    }

    // Wait for animation before closing
    await new Promise(resolve => setTimeout(resolve, this.animationDuration));
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.isAnimating = false;
    this.emit('plus-modal-close');
  }

  private handleBeforeOpen() {
    // Hook for internal use if needed
  }

  private handleBeforeClose() {
    // Hook for internal use if needed
  }

  private handleBackdropClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    // Check if click is on the container (backdrop area), not on modal content
    if (target.getAttribute('part') === 'container') {
      if (this.backdrop === 'static') {
        this.shakeModal();
      } else if (this.closeOnBackdrop) {
        this.hide();
      }
    }
  }

  private handleDialogCancel(e: Event) {
    e.preventDefault();
    if (this.closeOnEsc) {
      if (this.backdrop === 'static') {
        this.shakeModal();
      } else {
        this.hide();
      }
    } else if (this.backdrop === 'static') {
      this.shakeModal();
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isOpen) {
      // Only handle ESC if this is the topmost modal
      const openModals = Array.from(document.querySelectorAll('plus-modal[is-open]'));
      const topModal = openModals[openModals.length - 1];

      if (topModal !== this) {
        return;
      }

      e.preventDefault();
      if (this.closeOnEsc) {
        if (this.backdrop === 'static') {
          this.shakeModal();
        } else {
          this.hide();
        }
      } else if (this.backdrop === 'static') {
        this.shakeModal();
      }
    }
  }

  private handleClick(e: MouseEvent) {
    // Stop propagation to prevent backdrop click
    e.stopPropagation();

    // Use composedPath to work with shadow DOM and slots
    const path = e.composedPath() as HTMLElement[];
    const dismissElement = path.find(el => el.hasAttribute?.('data-dismiss'));
    const closeModalElement = path.find(el => el.hasAttribute?.('data-close-modal'));

    if (dismissElement) {
      this.hide();
      e.preventDefault();
    } else if (closeModalElement) {
      const modalId = closeModalElement.getAttribute('data-close-modal');
      // If modalId matches this modal's id, close it
      if (!modalId || modalId === this.id) {
        this.hide();
        e.preventDefault();
      }
    }
  }

  private shakeModal() {
    this.shake = true;
    setTimeout(() => {
      this.shake = false;
    }, this.animationDuration);
  }

  private getModalStyle() {
    if (this.fullScreen) {
      return {
        width: '100vw',
        height: '100vh',
        maxWidth: 'none',
        maxHeight: 'none',
      };
    }

    if (this.fullWidth) {
      return {
        width: '100%',
        maxWidth: '100%',
      };
    }

    const widths = {
      sm: '400px',
      md: '600px',
      lg: '800px',
      xl: '1024px',
      '2xl': '1200px',
      full: '100%',
    };

    return {
      width: widths[this.size],
      maxWidth: this.fullScreen ? 'none' : '90vw',
      maxHeight: this.fullScreen ? 'none' : '90vh',
    };
  }

  override render() {
    const {
      dialog,
      container,
      modal,
      header,
      headerContent,
      body,
      footer,
      closeButton,
    } = modalStyle({
      open: this.isOpen,
      placement: this.placement,
      size: this.size,
      fullScreen: this.fullScreen,
      shake: this.shake,
      noHeader: this.noHeader,
      noFooter: this.noFooter,
      fullWidth: this.fullWidth,
    });

    return html`
      <dialog
        part="dialog"
        class=${dialog()}
        @click=${this.handleBackdropClick}
        @cancel=${this.handleDialogCancel}
        @keydown=${this.handleKeydown}
        aria-modal="true"
      >
        <div
          part="container"
          class=${container()}
        >
          <div
            part="modal"
            class=${modal()}
            style=${styleMap(this.getModalStyle())}
            role="document"
            @click=${this.handleClick}
          >
            ${!this.noHeader ? html`
              <div part="header" class=${header()}>
                <div part="header-content" class=${headerContent()}>
                  <slot name="header"></slot>
                </div>
                <slot name="close">
                  <button
                    part="close-button"
                    class=${closeButton()}
                    @click=${() => this.hide()}
                    aria-label="Close modal"
                    type="button"
                  >
                    <plus-icon icon-name="xmark"></plus-icon>
                  </button>
                </slot>
              </div>
            ` : ''}

            <div part="body" class=${body()}>
              <slot name="body"></slot>
              <slot></slot>
            </div>

            ${!this.noFooter ? html`
              <div part="footer" class=${footer()}>
                <slot name="footer"></slot>
              </div>
            ` : ''}
          </div>
        </div>
      </dialog>
    `;
  }
}

export { PlusModal };
