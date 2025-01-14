import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    position: relative;
    width: fit-content;
    height: fit-content;
    --bg-color: var(--plus-color-background-neutral-default);
    --text-color: var(--plus-color-text-default);
  }

  .inner-host {
    --inline-bg-color: var(--bg-color);
    --inline-text-color: var(--text-color);
  }
`;
