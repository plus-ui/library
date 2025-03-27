import { html } from 'lit';
import Tailwind from '../base/tailwind-base';

export default class PlusAccordionPanel extends Tailwind {
  constructor() {
    super();
    this.slot = 'panel';
  }

  override render() {
    return html` <slot class="bg-color-base text-color-default"></slot> `;
  }
}

export { PlusAccordionPanel };
