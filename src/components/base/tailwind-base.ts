import { LitElement, css, unsafeCSS } from 'lit';

import preflight from '../../styles/base/preflight.styles';
import tailwindCss from '../../styles/global.css';
export default class Tailwind extends LitElement {
  static override styles = [
    preflight,
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
      cancelable: true,
      composed: true,
      detail: {},
      ...options,
    });
    this.dispatchEvent(event);
    return event;
  }
}
export { Tailwind };
