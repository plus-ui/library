import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { css, html,unsafeCSS } from 'lit';
import buttonCss from './button.css';
//import { createTailwind } from '../../factory/tailwind-factory';

/**
 * An example button component
 *
 * @tag my-button
 *
 * @csspart control - The button element
 * 
 * @cssproperty [--button-bg-color=#f0f0f0] - The background color of the button
 * @cssproperty [--button-fg-color=#333] - The text color of the button
 * @cssproperty [--button-border-color=transparent] - The border color of the button
 * 
 * @slot - The main content for the button
 *
 */

//const TailwindButton = createTailwind(buttonCss);

export default class MyButton extends Tailwind {

  static override styles = [
    ...Tailwind.styles,
    css`${unsafeCSS(buttonCss)}`
  ];

  constructor() {
    super();
  }
  
  @property()
  variation?: 'default' | 'primary' | 'hollow' | 'transparent';

  /** Controls the disabled property of the button */
  @property({ type: Boolean })
  disabled = false;

  override render() {
    return html`
      <button part="control" ?disabled=${this.disabled} class="py-2 px-4 border bg-[var(--button-bg-color)] cursor-pointer hover:bg-[var(--button-bg-color-hover)]" aria-disabled=${this.disabled} aria-pressed="false">
        <slot></slot>
      </button>
    `;
  }
}

export { MyButton };
