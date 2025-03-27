import { html } from 'lit';
import Tailwind from '../base/tailwind-base';

export default class PlusAccordionHeader extends Tailwind {
  constructor() {
    super();
    this.slot = 'header';
  }

  override render() {
    return html`<slot></slot>`;
  }
}

export { PlusAccordionHeader };
