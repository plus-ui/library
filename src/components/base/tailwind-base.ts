import { LitElement, css, unsafeCSS } from 'lit';

import tailwindCss from '../../styles/global.css';
export default class Tailwind extends LitElement {
  static override styles = [
    css`
      ${unsafeCSS(tailwindCss)}
    `,
  ];

  constructor() {
    super();
  }

  emit(name: string, options?: CustomEventInit) {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
      ...options,
    });
    this.dispatchEvent(event);
    return event;
  }
}
export { Tailwind };
