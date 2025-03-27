import { css, html } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';

interface PlusAccordion extends Element {
  isGrouped: boolean;
  isLast: boolean;
  expand: boolean;
}

interface AccordionToggleDetail {
  expand: boolean;
}

export default class PlusAccordionGroup extends Tailwind {
  @queryAssignedNodes({ flatten: true }) accordions!: Array<Node>;
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => value != 'false',
  })
  multi = false;

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      :host(:first-of-type):host([isGrouped]) .header {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      :host(:last-of-type):host([isGrouped]) .header {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      :host(:last-of-type):host([isGrouped]):host([expand]) .header {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    `,
  ];

  constructor() {
    super();
  }

  private handleSlotChange(): void {
    const accordions = this.accordions.filter(
      (el): el is PlusAccordion =>
        el instanceof Element && el.tagName.toLowerCase() === 'plus-accordion'
    );

    accordions.forEach((accordion) => {
      accordion.isGrouped = true;
      const isLast = accordions.indexOf(accordion) === accordions.length - 1;
      accordion.isLast = isLast;
      accordion.addEventListener('plus-accordion-toggle', ((
        event: CustomEvent<AccordionToggleDetail>
      ) => {
        if (!this.multi && event.detail.expand) {
          accordions.forEach((el) => {
            if (el !== event.target) {
              el.expand = false;
            }
          });
        }
      }) as EventListener);
    });
  }

  override render() {
    return html` <div
      class="rounded-md border border-color-default font-sans antialiased"
    >
      <slot @slotchange=${this.handleSlotChange}></slot>
    </div>`;
  }
}

export { PlusAccordionGroup };
