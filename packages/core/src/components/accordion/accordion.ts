import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { accordionStyle } from './accordion.style';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';

/**
 * @tag plus-accordion
 * @summary Accordion component for displaying collapsible content.
 *
 * @slot header - The header content of the accordion
 * @slot helper - Optional helper text displayed next to the header
 * @slot panel - The content that is shown when the accordion is expanded
 *
 * @csspart header - The header container
 * @csspart panel - The panel container
 * @csspart icon - The expand/collapse icon
 * @csspart helper - The helper text container
 *
 * @event plus-accordion-toggle - Emitted when the accordion is toggled
 * @eventDetail {boolean} expand - Whether the accordion is expanded
 *
 * @example
 * ```html
 * <plus-accordion>
 *   <div slot="header">Header</div>
 *   <div slot="helper">Helper text</div>
 *   <div slot="panel">Content</div>
 * </plus-accordion>
 * ```
 */
export default class PlusAccordion extends Tailwind {
  /**
   * Whether the accordion is expanded
   * @type {boolean}
   * @default false
   * @attr expand
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
    reflect: true,
  })
  expand = false;

  /**
   * Whether the accordion is part of a group
   * @type {boolean}
   * @default false
   * @attr is-grouped
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'is-grouped',
    converter: booleanConverter,
  })
  isGrouped = false;

  /**
   * Whether the accordion is the last item in a group
   * @type {boolean}
   * @default false
   * @attr is-last
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'is-last',
    converter: booleanConverter,
  })
  isLast = false;

  /**
   * Whether the accordion is the first item in a group
   * @type {boolean}
   * @default false
   * @attr is-first
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'is-first',
    converter: booleanConverter,
  })
  isFirst = false;

  /**
   * The size of the accordion
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the accordion is disabled
   * @type {boolean}
   * @default false
   * @attr disabled
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: booleanConverter,
  })
  disabled = false;

  // @state()
  // private hasHeaderSlot = false;

  // @state()
  // private hasHelperSlot = false;

  // @state()
  // private hasPanelSlot = false;

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      :host([is-grouped]) {
        border-radius: 0;
      }

      :host([is-grouped][is-first]) .header {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      :host([is-grouped][is-last]) .header {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      :host([is-grouped][is-last][expand]) .header {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    `,
  ];

  // private handleHeaderSlotChange(event: Event): void {
  //   const slot = event.target as HTMLSlotElement;
  //   this.hasHeaderSlot = slot.assignedNodes().length > 0;
  // }

  // private handleHelperSlotChange(event: Event): void {
  //   const slot = event.target as HTMLSlotElement;
  //   this.hasHelperSlot = slot.assignedNodes().length > 0;
  // }

  // private handlePanelSlotChange(event: Event): void {
  //   const slot = event.target as HTMLSlotElement;
  //   this.hasPanelSlot = slot.assignedNodes().length > 0;
  // }

  private toggleOpen(): void {
    if (this.disabled) return;

    this.expand = !this.expand;
    this.emit('plus-accordion-toggle', { detail: { expand: this.expand } });
  }

  override render() {
    const { base, header, panel, icon, helper, headerContainer } =
      accordionStyle({
        expand: this.expand,
        isGrouped: this.isGrouped,
        isLast: this.isLast,
        isFirst: this.isFirst,
        size: this.size,
        disabled: this.disabled,
        // hasHelper: this.hasHelperSlot,
      });

    return html`
      <div
        class=${base()}
        role="region"
        aria-expanded=${this.expand}
        aria-disabled=${this.disabled}
      >
        <div
          class=${header()}
          @click=${this.toggleOpen}
          role="button"
          tabindex=${this.disabled ? '-1' : '0'}
          aria-controls="panel"
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.toggleOpen();
            }
          }}
        >
          <div class=${headerContainer()}>
            <slot name="header" part="header"></slot>
            <span class=${helper()} part="helper">
              <slot name="helper"></slot>
            </span>
          </div>
          <plus-icon
            class=${icon()}
            part="icon"
            aria-hidden="true"
            icon-name=${this.expand ? 'angle-up' : 'angle-down'}
          ></plus-icon>
        </div>
        <div
          class=${panel()}
          id="panel"
          part="panel"
          role="region"
          aria-labelledby="header"
        >
          <slot name="panel"></slot>
        </div>
      </div>
    `;
  }
}

export { PlusAccordion };
