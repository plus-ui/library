import { html } from 'lit';
import Tailwind from '../base/tailwind-base';

export default class PlusAccordionHelper extends Tailwind {
  constructor() {
    super();
    this.slot = 'helper';
  }

  override render() {
    return html`<slot></slot>`;
  }
}

export { PlusAccordionHelper };
