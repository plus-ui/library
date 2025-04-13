import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { drawerStyle } from './drawer.style';
import Tailwind from '../base/tailwind-base';

/**
 * @tag plus-drawer
 * @summary Sliding panel component that appears from the edge of the screen.
 *
 * @slot header - The header content of the drawer
 * @slot body - The main content of the drawer
 * @slot footer - The footer content of the drawer
 * @slot close - Custom close button (defaults to an X icon)
 *
 * @csspart container - The main container element
 * @csspart overlay - The overlay element
 * @csspart drawer - The drawer element
 * @csspart header - The header element
 * @csspart body - The body element
 * @csspart footer - The footer element
 * @csspart close-button - The close button element
 *
 * @example
 * ```html
 * <plus-drawer>
 *   <div slot="header">Drawer Title</div>
 *   <div slot="body">Drawer Content</div>
 *   <div slot="footer">
 *     <button>Save</button>
 *   </div>
 * </plus-drawer>
 * ```
 */
export default class PlusDrawer extends Tailwind {
  /**
   * The size of the drawer
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the drawer is open
   * @type {boolean}
   * @default false
   * @attr is-open
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-open' })
  isOpen = false;

  /**
   * The position of the drawer
   * @type {'left' | 'right' | 'top' | 'bottom'}
   * @default 'right'
   * @attr orientation
   */
  @property({ type: String, reflect: true })
  orientation: 'left' | 'right' | 'top' | 'bottom' = 'right';

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

  // private drawerElement: HTMLElement | null = null;

  constructor() {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('plus-drawer-before-show', this.handleBeforeShow);
    this.addEventListener('plus-drawer-before-hide', this.handleBeforeHide);
  }

  /**
   * Hides the drawer with animation
   * @returns {void}
   */
  hide() {
    if (this.isAnimating) return;
    this.emit('plus-drawer-before-hide');
  }

  private handleBeforeHide() {
    this.isAnimating = true;
    this.isOpen = false;

    setTimeout(() => {
      this.isAnimating = false;
      this.emit('plus-drawer-hide');
    }, this.animationDuration);
  }

  /**
   * Shows the drawer with animation
   * @returns {void}
   */
  show() {
    if (this.isAnimating) return;
    this.emit('plus-drawer-before-show');
  }

  private handleBeforeShow() {
    this.isAnimating = true;
    this.isOpen = true;

    setTimeout(() => {
      this.isAnimating = false;
      this.emit('plus-drawer-show');
    }, this.animationDuration);

    document.addEventListener('keydown', this.handleKeydown);
  }

  // override firstUpdated() {
  //   this.drawerElement = this.shadowRoot?.querySelector(
  //     '.drawer'
  //   ) as HTMLElement;
  // }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('plus-drawer-before-show', this.handleBeforeShow);
    this.removeEventListener('plus-drawer-before-hide', this.handleBeforeHide);
    document.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpen) {
      this.hide();
    }
  };

  override render() {
    const { size, isOpen, orientation } = this;
    const {
      base,
      drawerClass,
      drawerOverlay,
      drawerContainer,
      drawerHeader,
      drawerBody,
      drawerFooter,
      drawerCloseButtonClass,
    } = drawerStyle({ size, isOpen, orientation });

    return html`
      <div
        class=${base()}
        part="container"
        role="dialog"
        aria-modal="true"
        aria-hidden=${!isOpen}
        aria-label="Drawer"
      >
        <div
          class=${drawerOverlay()}
          part="overlay"
          @click=${() => this.hide()}
        ></div>
        <div class=${drawerClass()} part="drawer">
          <div class=${drawerContainer()}>
            <div class=${drawerHeader()} part="header">
              <slot name="header"></slot>
              <slot name="close">
                <button
                  class=${drawerCloseButtonClass()}
                  part="close-button"
                  aria-label="Close drawer"
                  @click=${() => this.hide()}
                >
                  <plus-svg-icon iconName="xmark"></plus-svg-icon>
                </button>
              </slot>
            </div>
            <div class=${drawerBody()} part="body">
              <slot name="body"></slot>
              <slot></slot>
            </div>
            <div class=${drawerFooter()} part="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export { PlusDrawer };
