import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { drawerStyle } from './drawer.style';
import Tailwind from '../base/tailwind-base';

export default class PlusDrawer extends Tailwind {
  @property() size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) isOpen: boolean = false;
  @property({ type: String }) orientation: 'left' | 'right' | 'top' | 'bottom' =
    'right';
  @property({ type: Number }) animationDuration: number = 300; // Animation duration in ms

  private drawerElement: HTMLElement | null = null;

  constructor() {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('plus-drawer-before-show', this.drawerShow);
    this.addEventListener('plus-drawer-before-hide', this.drawerHide);
  }

  // First call this to wait for animation before fully hiding
  hide() {
    this.emit('plus-drawer-before-hide');
  }

  private drawerHide() {
    // Set isOpen to false which triggers the CSS animation
    this.isOpen = false;

    // Wait for animation to complete before emitting the final event
    setTimeout(() => {
      this.emit('plus-drawer-hide');
    }, this.animationDuration);
  }

  show() {
    this.emit('plus-drawer-before-show');
  }

  private drawerShow() {
    this.isOpen = true;

    setTimeout(() => {
      this.emit('plus-drawer-show');
    }, 50); // Small delay to ensure classes are applied before animation starts

    document.addEventListener('keydown', this.keydownHandler);
  }

  override firstUpdated() {
    this.drawerElement = this.shadowRoot?.querySelector(
      '.drawer'
    ) as HTMLElement;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('plus-drawer-before-show', this.drawerShow);
    this.removeEventListener('plus-drawer-before-hide', this.drawerHide);
    document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
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

    return html`<div class=${base()}>
      <div class=${drawerOverlay()} @click=${() => this.hide()}></div>
      <div class=${drawerClass()}>
        <div class=${drawerContainer()}>
          <slot name="close">
            <button
              class=${drawerCloseButtonClass()}
              aria-label="Close"
              @click=${() => this.hide()}
            >
              <i class="fas fa-xmark"></i>
            </button>
          </slot>
          <div class=${drawerHeader()}>
            <slot name="header"></slot>
          </div>
          <div class=${drawerBody()}>
            <slot name="body"></slot>
            <slot></slot>
          </div>
          <div class=${drawerFooter()}>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div> `;
  }
}

export { PlusDrawer };
