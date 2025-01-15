import { css } from 'lit';

export default css`
  :host {
    display: block;
    width: fit-content;
    height: fit-content;
    --bg-default: var(--plus-color-background-neutral-default);
    --bg-hovered: var(--plus-color-background-neutral-hovered);
    --bg-pressed: var(--plus-color-background-neutral-pressed);
    --text-color: var(--plus-color-text-default);
    --rounded: 9999px;
    --border: transparent;
  }

  :host([kind='outlined']) {
    --bg-default: var(--plus-color-background-surface);
    --border: var(--plus-color-border-default);
  }

  :host([invert]) {
    --bg-default: var(--plus-color-background-invert-neutral-default);
    --bg-hovered: var(--plus-color-background-invert-neutral-hovered);
    --bg-pressed: var(--plus-color-background-invert-neutral-pressed);
    --text-color: var(--plus-color-text-base);
  }

  :host([disabled]) {
    --bg-default: var(--plus-color-background-disabled);
    --bg-hovered: var(--plus-color-background-disabled); 
    --bg-pressed: var(--plus-color-background-disabled);
    --text-color: var(--plus-color-text-disabled);
  }
`;
