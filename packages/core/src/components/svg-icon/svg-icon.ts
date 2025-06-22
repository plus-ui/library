import { html, LitElement, css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getIcon, IconName } from './icons';

export default class PlusSvgIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      height: fit-content;
      width: fit-content;
    }
    svg {
      height: 1em;
      //   width: 1em;
      vertical-align: middle;
      fill: currentColor;
    }
  `;

  @property({ type: String })
  iconName?: IconName;

  override render() {
    if (!this.iconName) return nothing;

    return html`${unsafeHTML(getIcon(this.iconName))}`;
  }
}

export { PlusSvgIcon };
