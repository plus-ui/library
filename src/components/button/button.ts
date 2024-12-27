import { html, LitElement, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import baseStyle from './button.css';
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
export default class MyButton extends LitElement {
  static override styles = css`${unsafeCSS(baseStyle)}`;

  /** Changes the display of the button */
  @property()
  variation?: 'default' | 'primary' | 'hollow' | 'transparent';

  /** Controls the disabled property of the button */
  @property({ type: Boolean })
  disabled = false;

  override render() {
    return html`
      <button part="control" ?disabled=${this.disabled} class="button bg-red-500 py-2 px-4  border" aria-disabled=${this.disabled} aria-pressed="false">
        <slot></slot>
      </button>
    `;
  }
}

export { MyButton };
