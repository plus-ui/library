import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  :host([full-width]) {
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }
`;
