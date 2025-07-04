import { html, nothing } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import {
  computePosition,
  autoUpdate,
  offset,
  shift,
  arrow,
  Placement,
  flip,
} from '@floating-ui/dom';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { popconfirmStyle } from './popconfirm.style';

enum PopconfirmTrigger {
  Hover = 'hover',
  Click = 'click',
}

enum PopconfirmPosition {
  Top = 'top',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  Bottom = 'bottom',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end',
  Left = 'left',
  LeftStart = 'left-start',
  LeftEnd = 'left-end',
  Right = 'right',
  RightStart = 'right-start',
  RightEnd = 'right-end',
}

/**
 * @tag plus-popconfirm
 * @summary Popconfirm component that displays a confirmation dialog in a floating panel.
 *
 * @slot - The target element that triggers the popconfirm
 * @slot icon - Custom icon for the popconfirm
 * @slot title - The popconfirm title
 * @slot header - The entire header section
 * @slot footer - The footer section with action buttons
 * @slot content - The main content inside the popconfirm
 *
 * @csspart popconfirm - The popconfirm container element
 * @csspart arrow - The popconfirm arrow indicator
 * @csspart header - The popconfirm header section
 * @csspart title - The popconfirm title
 * @csspart content - The main content inside the popconfirm
 * @csspart footer - The footer section with action buttons
 *
 * @event plus-popconfirm-open - Emitted when the popconfirm is opened
 * @event plus-popconfirm-close - Emitted when the popconfirm is closed
 * @event plus-popconfirm-confirm - Emitted when the confirm button is clicked
 * @event plus-popconfirm-cancel - Emitted when the cancel button is clicked
 *
 * @example
 * ```html
 * <plus-popconfirm>
 *   <plus-button>Delete</plus-button>
 *   <div slot="title">Are you sure?</div>
 *   <div slot="content">This action cannot be undone.</div>
 * </plus-popconfirm>
 * ```
 */
export default class PlusPopconfirm extends Tailwind {
  @queryAssignedElements({ flatten: true })
  slots!: Array<HTMLElement>;

  /**
   * The size of the popconfirm.
   *
   * Available options:
   * - `sm` (small)
   * - `md` (medium - default)
   * - `lg` (large)
   *
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * The position of the popconfirm relative to the target element.
   *
   * Available options:
   * - `top` (default)
   * - `top-start`
   * - `top-end`
   * - `bottom`
   * - `bottom-start`
   * - `bottom-end`
   * - `left`
   * - `left-start`
   * - `left-end`
   * - `right`
   * - `right-start`
   * - `right-end`
   *
   * @type {PopconfirmPosition}
   * @default PopconfirmPosition.Top
   */
  @property({ type: String })
  orientation: PopconfirmPosition = PopconfirmPosition.Top;

  /**
   * Determines how the popconfirm is triggered.
   *
   * Available options:
   * - `click` (default) - Popconfirm toggles on click.
   * - `hover` - Popconfirm appears on hover.
   *
   * @type {'click' | 'hover'}
   * @default 'click'
   */
  @property({ type: String })
  trigger: PopconfirmTrigger = PopconfirmTrigger.Click;

  /**
   * The title of the popconfirm.
   *
   * @type {string}
   * @default 'Are you sure?'
   */
  @property({ type: String })
  override title = 'Are you sure?';

  /**
   * The text for the confirm button.
   *
   * @type {string}
   * @default 'Confirm'
   */
  @property({ type: String, attribute: 'confirm-text' })
  confirmText = 'Confirm';

  /**
   * The text for the cancel button.
   *
   * @type {string}
   * @default 'Cancel'
   */
  @property({ type: String, attribute: 'cancel-text' })
  cancelText = 'Cancel';

  /**
   * The status of the popconfirm, which affects its styling.
   *
   * Available options:
   * - `success` (green)
   * - `warning` (yellow)
   * - `danger` (red)
   * - `info` (blue)
   * - `primary` (default theme color)
   * - `default` (gray - default)
   *
   * @type {'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'}
   * @default 'default'
   */
  @property({ type: String })
  status: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default' =
    'default';

  /**
   * Determines whether a status icon should be displayed in the popconfirm.
   *
   * @type {boolean}
   * @default true
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
    attribute: 'status-icon',
    reflect: true,
  })
  statusIcon = true;

  /**
   * Determines whether the arrow should be displayed.
   *
   * @type {boolean}
   * @default true
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
    attribute: 'show-arrow',
    reflect: true,
  })
  showArrow = true;

  /**
   * Controls the visibility of the popconfirm.
   *
   * @private
   * @type {boolean}
   * @default false
   */
  @state()
  private isVisible = false;

  private targetElement?: HTMLElement;
  private arrowElement?: HTMLElement;
  private cleanup?: () => void;

  private getPopconfirm(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.popconfirm') || null;
  }

  private updatePosition = () => {
    const popconfirm = this.getPopconfirm();
    if (!popconfirm || !this.targetElement) return;

    // Ensure the popconfirm is visible before computing position
    if (!this.isVisible) return;

    // Reset any existing styles
    Object.assign(popconfirm.style, {
      left: '',
      top: '',
      right: '',
      bottom: '',
    });

    computePosition(this.targetElement, popconfirm, {
      placement: this.orientation as Placement,
      middleware: [
        offset(10),
        flip({
          fallbackPlacements: [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end',
          ],
          padding: 8,
        }),
        shift({ padding: 8 }),
        this.showArrow
          ? arrow({ element: this.arrowElement!, padding: 4 })
          : undefined,
      ].filter(Boolean),
    }).then(({ x, y, middlewareData, placement }) => {
      // Apply the computed position
      Object.assign(popconfirm.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
      });

      // Update arrow position if needed
      if (this.showArrow && this.arrowElement) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        Object.assign(this.arrowElement.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          [staticSide!]: '-4px',
        });
      }
    });
  };

  private handleMouseEnter = () => {
    this.isVisible = true;
    this.updatePosition();
    this.cleanup = autoUpdate(
      this.targetElement!,
      this.getPopconfirm()!,
      this.updatePosition
    );
    this.emit('plus-popconfirm-open');
  };

  private handleMouseLeave = () => {
    this.closePopconfirm();
  };

  private handleClick = () => {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.updatePosition();
      this.cleanup = autoUpdate(
        this.targetElement!,
        this.getPopconfirm()!,
        this.updatePosition
      );
      this.emit('plus-popconfirm-open');
    } else {
      this.cleanupAutoUpdate();
      this.emit('plus-popconfirm-close');
    }
  };

  private closePopconfirm = () => {
    this.isVisible = false;
    this.cleanupAutoUpdate();
    this.emit('plus-popconfirm-close');
    // Return focus to the trigger element
    if (this.targetElement) {
      this.targetElement.focus();
    }
  };

  private handleConfirm = () => {
    this.closePopconfirm();
    this.emit('plus-popconfirm-confirm');
  };

  private handleCancel = () => {
    this.closePopconfirm();
    this.emit('plus-popconfirm-cancel');
  };

  private cleanupAutoUpdate() {
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
    }
  }

  private _cleanupTarget() {
    if (this.targetElement) {
      this.targetElement.removeEventListener(
        'mouseenter',
        this.handleMouseEnter
      );
      this.targetElement.removeEventListener(
        'mouseleave',
        this.handleMouseLeave
      );
      this.targetElement.removeEventListener('click', this.handleClick);
    }

    document.removeEventListener('click', this.handleOutsideClick, true);

    this.cleanupAutoUpdate();
    this.isVisible = false;
  }

  private handleOutsideClick = (event: Event) => {
    const path = event.composedPath();
    const popconfirm = this.getPopconfirm();

    if (
      popconfirm &&
      !path.includes(popconfirm) &&
      !path.includes(this.targetElement!)
    ) {
      this.isVisible = false;
      this.cleanupAutoUpdate();
    }
  };

  private handleSlotChange() {
    const newTarget = this.slots[0];
    if (newTarget && newTarget !== this.targetElement) {
      if (this.targetElement) {
        this._cleanupTarget();
      }
      this.targetElement = newTarget;
      this._setupPopconfirm();
    }
  }

  private _setupPopconfirm() {
    if (!this.targetElement) return;

    if (this.trigger === PopconfirmTrigger.Hover) {
      this.targetElement.addEventListener('mouseenter', this.handleMouseEnter);
      this.targetElement.addEventListener('mouseleave', this.handleMouseLeave);
    } else if (this.trigger === PopconfirmTrigger.Click) {
      this.targetElement.addEventListener('click', this.handleClick);
    }

    document.addEventListener('click', this.handleOutsideClick, true);
  }

  override firstUpdated() {
    this.arrowElement = this.shadowRoot?.querySelector('.arrow') as HTMLElement;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupTarget();
  }

  override render() {
    const {
      host,
      arrow,
      headerWrapper,
      headerLeft,
      content,
      headerRight,
      title,
      footer,
      footerActions,
    } = popconfirmStyle({
      isVisible: this.isVisible,
      size: this.size,
      status: this.status,
    });

    const statusIconMap = {
      default: 'circle-question',
      success: 'circle-check',
      warning: 'triangle-exclamation',
      danger: 'circle-exclamation',
      info: 'circle-info',
      primary: 'circle-question',
    } as const;

    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div
        class="${host()}"
        part="popconfirm"
        role="dialog"
        ?inert=${!this.isVisible}
        aria-labelledby="popconfirm-title"
        aria-describedby="popconfirm-content"
        aria-modal="true"
        tabindex="-1"
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            this.closePopconfirm();
          }
        }}
      >
        <slot name="header">
          <header class="${headerWrapper()}" part="header">
            <div class=${headerLeft()}>
              <slot name="icon">
                ${this.statusIcon
                  ? html`<plus-icon
                      class="flex"
                      icon-name=${statusIconMap[this.status]}
                    ></plus-icon>`
                  : nothing}
              </slot>

              <div class="${title()}" part="title" id="popconfirm-title">
                <slot name="title"><span>${this.title}</span></slot>
              </div>
            </div>

            <div class=${headerRight()} part="close">
              <slot name="actions">
                <plus-icon
                  icon-name="xmark"
                  @click=${this.closePopconfirm}
                  role="button"
                  tabindex="0"
                  aria-label="Close popconfirm"
                ></plus-icon>
              </slot>
            </div>
          </header>
        </slot>

        <main class="${content()}" part="content" id="popconfirm-content">
          <slot name="content"></slot>
        </main>

        <slot name="footer">
          <footer class="${footer()}">
            <div class="${footerActions()}">
              <plus-button
                size="sm"
                variant="outline"
                @click=${this.handleCancel}
                tabindex="0"
                .disabled=${!this.isVisible}
              >
                ${this.cancelText}
              </plus-button>
              <plus-button
                size="sm"
                status=${this.status}
                @click=${this.handleConfirm}
                tabindex="0"
                .disabled=${!this.isVisible}
              >
                ${this.confirmText}
              </plus-button>
            </div>
          </footer>
        </slot>

        ${this.showArrow
          ? html`<div class=${arrow()} part="arrow"></div>`
          : nothing}
      </div>
    `;
  }
}

export { PlusPopconfirm };
