import { css } from 'lit';

export default css`
  :host {
    display: inline-block;

    // --bg-default: var(--plus-color-background-primary-default);
    // --bg-hovered: var(--plus-color-background-primary-hovered);
    // --bg-pressed: var(--plus-color-background-primary-pressed);
    // --bg-focused: var(--plus-color-background-primary-focused);
    // --bg-loading: var(--plus-color-background-primary-loading);
    // --text-color: var(--plus-color-text-base);
    // --border-color: var(--plus-color-border-primary);
  }

  button {
    background-color: var(--bg-default, var(--i-bg-default));
    color: var(--text-color, var(--i-text-color));
    border-color: var(--border-color, var(--i-border-color));
  }

  button:hover {
    background-color: var(--bg-hovered, var(--i-bg-hovered));
  }

  button:active {
    background-color: var(--bg-pressed, var(--i-bg-pressed));
  }

  button:focus {
    background-color: var(--bg-focused, var(--i-bg-focused));
  }

`;
