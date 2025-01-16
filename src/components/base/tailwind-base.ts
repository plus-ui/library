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
}
export { Tailwind };
