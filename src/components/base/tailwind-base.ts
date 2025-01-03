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
}
export { Tailwind };
