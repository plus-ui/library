import { html } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import {
  computePosition,
  autoUpdate,
  offset,
  shift,
  arrow,
  flip,
} from '@floating-ui/dom';
import Tailwind from '../base/tailwind-base';
import { tooltipStyle } from './tooltip.style';

/**
 * @tag plus-tooltip
 * @summary Tooltip component that displays additional information on hover or click.
 *
 * @slot - The target element that triggers the tooltip
 *
 * @csspart tooltip - The tooltip container element
 * @csspart arrow - The tooltip arrow indicator
 *
 * @event plus-tooltip-show - Emitted when the tooltip is shown
 * @event plus-tooltip-hide - Emitted when the tooltip is hidden
 *
 * @example
 * ```html
 * <plus-tooltip content="This is a tooltip">
 *   <plus-button>Hover me</plus-button>
 * </plus-tooltip>
 * ```
 */
enum TooltipTrigger {
  Hover = 'hover',
  Click = 'click',
}

enum TooltipOrientation {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export default class PlusTooltip extends Tailwind {
  @queryAssignedElements({ flatten: true })
  slots!: Array<HTMLElement>;

  /**
   * Sets the size of the tooltip.
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * The text content displayed inside the tooltip.
   */
  @property({ type: String })
  message = '';

  /**
   * The trigger event for the tooltip.
   * - hover: Tooltip appears on hover.
   * - click: Tooltip appears on click.
   * @default 'hover'
   */
  @property({ type: String })
  trigger: TooltipTrigger = TooltipTrigger.Hover;

  /**
   * The tooltip placement relative to the target element.
   * - top, bottom, left, right
   * @default 'top'
   */
  @property({ type: String })
  orientation: TooltipOrientation = TooltipOrientation.Top;

  @property({ type: Number })
  hideDelay = 0;

  @state()
  private isVisible = false;

  private targetElement?: HTMLElement;
  private cleanup?: () => void;
  private hideTimeout?: number;

  /**
   * Retrieves the tooltip element from the DOM.
   */
  private getTooltip(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.tooltip') || null;
  }

  /**
   * Updates the tooltip position dynamically.
   */
  private updatePosition = () => {
    const tooltip = this.getTooltip();
    if (!tooltip || !this.targetElement) return;

    const arrowElement = tooltip.querySelector('.arrow') as HTMLElement;
    if (!arrowElement) return;

    computePosition(this.targetElement, tooltip, {
      placement: this.orientation,
      middleware: [
        offset(8),
        shift(),
        flip(),
        arrow({ element: arrowElement, padding: 4 }),
      ],
    }).then(({ x, y, middlewareData, placement }) => {
      if (!tooltip) return;

      Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` });

      const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]];

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [staticSide!]: '-4px',
      });
    });
  };

  /**
   * Handles tooltip appearance when the mouse enters the target element.
   */
  private handleMouseEnter = () => {
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }

    const tooltip = this.getTooltip();
    if (!tooltip || !this.targetElement) return;

    this.isVisible = true;
    this.updatePosition();
    this.cleanup = autoUpdate(this.targetElement, tooltip, this.updatePosition);
  };

  /**
   * Handles tooltip disappearance when the mouse leaves the target element.
   */
  private handleMouseLeave = () => {
    if (this.hideDelay > 0) {
      this.hideTimeout = window.setTimeout(() => {
        this.isVisible = false;
        this.cleanupAutoUpdate();
      }, this.hideDelay);
    } else {
      this.isVisible = false;
      this.cleanupAutoUpdate();
    }
  };

  /**
   * Handles tooltip toggle when the target element is clicked.
   */
  private handleClick = () => {
    const tooltip = this.getTooltip();
    if (!tooltip || !this.targetElement) return;

    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.updatePosition();
      this.cleanup = autoUpdate(
        this.targetElement,
        tooltip,
        this.updatePosition
      );
    } else {
      this.cleanupAutoUpdate();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isVisible) {
      this.isVisible = false;
      this.cleanupAutoUpdate();
    }
  };

  /**
   * Cleans up auto-update behavior to improve performance.
   */
  private cleanupAutoUpdate() {
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
    }
  }

  /**
   * Removes event listeners and resets tooltip state.
   */
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
      this.targetElement.removeEventListener('keydown', this.handleKeyDown);
    }
    this.cleanupAutoUpdate();
    this.isVisible = false;
  }

  /**
   * Handles changes to the slotted content and reattaches event listeners.
   */
  private handleSlotChange() {
    const newTarget = this.slots[0];
    if (newTarget && newTarget !== this.targetElement) {
      this._cleanupTarget();
      this.targetElement = newTarget;
      this._setupTooltip();
    }
  }

  /**
   * Attaches event listeners based on the trigger type.
   */
  private _setupTooltip() {
    if (!this.targetElement) return;

    this._cleanupTarget();

    if (this.trigger === TooltipTrigger.Hover) {
      this.targetElement.addEventListener('mouseenter', this.handleMouseEnter);
      this.targetElement.addEventListener('mouseleave', this.handleMouseLeave);
    } else if (this.trigger === TooltipTrigger.Click) {
      this.targetElement.addEventListener('click', this.handleClick);
    }

    this.targetElement.addEventListener('keydown', this.handleKeyDown);
    this.targetElement.setAttribute('aria-describedby', 'tooltip-content');
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupTarget();
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
    }
  }

  override render() {
    const { base, arrow } = tooltipStyle({
      size: this.size,
      isVisible: this.isVisible,
    });
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div
        role="tooltip"
        id="tooltip-content"
        aria-hidden="${!this.isVisible}"
        class="${base()}"
      >
        ${this.message}
        <div class="${arrow()}" aria-label="Tooltip arrow"></div>
      </div>
    `;
  }
}

export { PlusTooltip };
