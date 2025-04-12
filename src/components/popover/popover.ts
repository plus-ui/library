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
import Tailwind from '../base/tailwind-base';
import { popoverStyle } from './popover.style';

enum PopoverTrigger {
  Hover = 'hover',
  Click = 'click',
}

enum PopoverPosition {
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
 * @tag plus-popover
 * @since 0.0.0
 * @status experimental
 *
 * A customizable popover component using Floating UI.
 *
 * ## Features:
 * - Supports different trigger types (`click`, `hover`).
 * - Dynamically positioned using Floating UI.
 * - Customizable size, status, and header text.
 * - Dismissable and supports status icons.
 *
 * @slot - The default slot to place the target element that triggers the popover.
 * @slot icon - Custom slot for a popover icon.
 * @slot title - Custom slot for the popover title.
 * @slot actions - Slot for actions like a close button.
 * @slot content - Slot for the main content inside the popover.
 *
 * @event plus-popover-open - Fired when the popover is opened.
 * @event plus-popover-close - Fired when the popover is closed.
 * @event plus-popover-dismiss - Fired when the popover is dismissed via close button.
 *
 * @csspart popover - The popover container element.
 * @csspart arrow - The popover arrow indicator.
 * @csspart title - The popover title.
 * @csspart close - The close button area.
 * @csspart content - The main content inside the popover.
 */
export default class PlusPopover extends Tailwind {
  @queryAssignedElements({ flatten: true })
  slots!: Array<HTMLElement>;
  /**
   * The size of the popover.
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
   * The position of the popover relative to the target element.
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
   * @type {PopoverPosition}
   * @default PopoverPosition.Top
   */
  @property({ type: String })
  orientation: PopoverPosition = PopoverPosition.Top;

  /**
   * Determines how the popover is triggered.
   *
   * Available options:
   * - `click` (default) - Popover toggles on click.
   * - `hover` - Popover appears on hover.
   *
   * @type {'click' | 'hover'}
   * @default 'click'
   */
  @property({ type: String })
  trigger: PopoverTrigger = PopoverTrigger.Click;

  /**
   * The main text content of the popover.
   *
   * If a slot with `name="content"` is provided, this text will be ignored.
   *
   * @type {string}
   */
  @property({ type: String })
  text?: string;

  /**
   * The header title of the popover.
   *
   * If a slot with `name="title"` is provided, this text will be ignored.
   *
   * @type {string}
   * @default 'Title'
   */
  @property({ type: String })
  headerText?: string = 'Title';

  /**
   * The status of the popover, which affects its styling.
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
   * Determines whether the popover can be dismissed by clicking the close button.
   *
   * - `true` (default) - Popover can be closed.
   * - `false` - The close button is hidden.
   *
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, converter: (value) => value !== 'false' })
  dismissable = true;

  /**
   * Determines whether a status icon should be displayed in the popover.
   *
   * - `true` (default) - An icon representing the status will be displayed.
   * - `false` - No icon will be displayed.
   *
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, converter: (value) => value !== 'false' })
  statusIcon = true;

  /**
   * Determines whether the arrow should be displayed.
   *
   * - `true` (default) - Arrow will be displayed.
   * - `false` - Arrow will be hidden.
   *
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, converter: (value) => value !== 'false' })
  showArrow = true;

  /**
   * Controls the visibility of the popover.
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

  private getPopover(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.popover') || null;
  }

  private updatePosition = () => {
    const popover = this.getPopover();
    if (!popover || !this.targetElement) return;

    // Ensure the popover is visible before computing position
    if (!this.isVisible) return;

    // Reset any existing styles
    Object.assign(popover.style, {
      left: '',
      top: '',
      right: '',
      bottom: '',
    });

    computePosition(this.targetElement, popover, {
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
      Object.assign(popover.style, {
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
      this.getPopover()!,
      this.updatePosition
    );
    this.emit('plus-popover-open');
  };

  private handleMouseLeave = () => {
    this.closePopover();
  };

  private handleClick = () => {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.updatePosition();
      this.cleanup = autoUpdate(
        this.targetElement!,
        this.getPopover()!,
        this.updatePosition
      );
      this.emit('plus-popover-open');
    } else {
      this.cleanupAutoUpdate();
      this.emit('plus-popover-close');
    }
  };

  private closePopover = (dismiss = false) => {
    this.isVisible = false;
    this.cleanupAutoUpdate();
    this.emit('plus-popover-close');

    if (dismiss) {
      this.emit('plus-popover-dismiss');
    }
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
    const popover = this.getPopover();

    if (
      popover &&
      !path.includes(popover) &&
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
      this._setupPopover();
    }
  }

  private _setupPopover() {
    if (!this.targetElement) return;

    if (this.trigger === PopoverTrigger.Hover) {
      this.targetElement.addEventListener('mouseenter', this.handleMouseEnter);
      this.targetElement.addEventListener('mouseleave', this.handleMouseLeave);
    } else if (this.trigger === PopoverTrigger.Click) {
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
    } = popoverStyle({
      isVisible: this.isVisible,
      size: this.size,
      status: this.status,
    });

    const statusIconMap = {
      default: 'circle-plus',
      success: 'circle-check',
      warning: 'triangle-exclamation',
      danger: 'circle-exclamation',
      info: 'circle-info',
      primary: 'circle-plus',
    } as const;
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div
        class="${host()}"
        part="popover"
        role="dialog"
        aria-hidden=${!this.isVisible}
        aria-labelledby="popover-title"
        aria-describedby="popover-content"
      >
        <header class="${headerWrapper()}">
          <div class=${headerLeft()}>
            <slot name="icon">
              ${this.statusIcon
                ? html`<plus-svg-icon
                    iconName=${statusIconMap[this.status]}
                  ></plus-svg-icon>`
                : nothing}
            </slot>
            <div class="${title()}" part="title" id="popover-title">
              <slot name="title"><span>${this.headerText}</span></slot>
            </div>
          </div>

          <div class=${headerRight()} part="close">
            <slot name="actions">
              ${this.dismissable &&
              html`<plus-svg-icon
                iconName="xmark"
                @click=${() => this.closePopover(true)}
                role="button"
                tabindex="0"
                aria-label="Close popover"
              ></plus-svg-icon>`}
            </slot>
          </div>
        </header>
        <main class="${content()}" part="content" id="popover-content">
          <slot name="content">${this.text}</slot>
        </main>
        ${this.showArrow
          ? html`<div class=${arrow()} part="arrow"></div>`
          : nothing}
      </div>
    `;
  }
}

export { PlusPopover };
