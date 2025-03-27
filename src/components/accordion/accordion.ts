import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { accordionStyle } from './accordion.style';

import Tailwind from '../base/tailwind-base';

export default class PlusAccordion extends Tailwind {
  @property({
    type: Boolean,
    converter: (expand) => expand != 'false',
    reflect: true,
  })
  expand = false;
  @property({ type: Boolean, reflect: true }) isGrouped: boolean = false;
  @property({ type: Boolean, reflect: true }) isLast: boolean = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;

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

  private toggleOpen(): void {
    this.expand = !this.expand;
    this.emit('plus-accordion-toggle', { detail: { expand: this.expand } });
  }

  override render() {
    const { base, header, panel, icon, helper, headerContainer } =
      accordionStyle({
        expand: this.expand,
        isGrouped: this.isGrouped,
        isLast: this.isLast,
        size: this.size,
        disabled: this.disabled,
      });
    return html`
      <div class=${base()}>
        <div class=${header()} @click=${!this.disabled && this.toggleOpen}>
          <div class=${headerContainer()}>
            <slot name="header"></slot>
            <span class=${helper()}><slot name="helper"></slot></span>
          </div>
          <i class=${icon()}></i>
        </div>
        <div class=${panel()}>
          <slot name="panel"></slot>
        </div>
      </div>
    `;
  }
}

export { PlusAccordion };
