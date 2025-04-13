import { css, html } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';

/**
 * @tag plus-accordion-group
 * @summary A container for grouping accordion items together.
 *
 * @slot default - Accordion items to be grouped
 *
 * @csspart container - The container element
 *
 * @example
 * ```html
 * <plus-accordion-group>
 *   <plus-accordion>
 *     <div slot="header">First Item</div>
 *     <div slot="panel">Content</div>
 *   </plus-accordion>
 *   <plus-accordion>
 *     <div slot="header">Second Item</div>
 *     <div slot="panel">Content</div>
 *   </plus-accordion>
 * </plus-accordion-group>
 * ```
 */
export default class PlusAccordionGroup extends Tailwind {
  @queryAssignedNodes({ flatten: true }) accordions!: Array<Node>;

  /**
   * Whether multiple accordions can be expanded at the same time
   * @type {boolean}
   * @default false
   * @attr multi
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value) => value != 'false',
  })
  multi = false;

  /**
   * The visual style of the accordion group
   * @type {'bordered' | 'divided' | 'separated'}
   * @default 'bordered'
   * @attr kind
   */
  @property({ type: String, reflect: true })
  kind: 'bordered' | 'divided' | 'separated' = 'bordered';

  /**
   * The size of the accordions in the group
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  // @state()
  // private hasAccordions = false;

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      :host([kind='bordered']) {
        border: 1px solid var(--plus-color-border-default);
        border-radius: 5px;
      }

      :host([kind='divided']) {
        border: none;
      }

      :host([kind='bordered']) ::slotted(plus-accordion) {
        border-bottom: 1px solid var(--plus-color-border-default);
      }

      :host([kind='bordered']) ::slotted(plus-accordion:last-of-type) {
        border-bottom: none;
      }

      :host([kind='divided']) ::slotted(plus-accordion) {
        border-bottom: 1px solid var(--plus-color-border-default);
      }

      :host([kind='divided']) ::slotted(plus-accordion:last-of-type) {
        border-bottom: none;
      }

      :host([kind='separated'])::part(container) {
        display: flex;
        flex-direction: column;
        gap: var(--accordion-gap);
      }

      :host([size='sm']) {
        --accordion-gap: 14px;
      }

      :host([size='md']) {
        --accordion-gap: 16px;
      }

      :host([size='lg']) {
        --accordion-gap: 20px;
      }
    `,
  ];

  private handleSlotChange(): void {
    const accordions = this.accordions.filter(
      (el) =>
        el instanceof HTMLElement &&
        el.tagName.toLowerCase() === 'plus-accordion'
    ) as HTMLElement[];

    // this.hasAccordions = accordions.length > 0;

    accordions.forEach((accordion, index) => {
      if (this.kind !== 'separated') {
        accordion.setAttribute('is-grouped', 'true');
        accordion.setAttribute('is-first', index === 0 ? 'true' : 'false');
        accordion.setAttribute(
          'is-last',
          index === accordions.length - 1 ? 'true' : 'false'
        );
      }
      accordion.setAttribute('size', this.size);

      accordion.addEventListener('plus-accordion-toggle', (event: Event) => {
        const customEvent = event as CustomEvent;
        if (!this.multi && customEvent.detail?.expand) {
          accordions.forEach((el) => {
            if (el !== event.target) {
              el.setAttribute('expand', 'false');
            }
          });
        }
      });
    });
  }

  override render() {
    return html`
      <div
        class="font-sans antialiased"
        part="container"
        role="group"
        aria-label="Accordion group"
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

export { PlusAccordionGroup };
