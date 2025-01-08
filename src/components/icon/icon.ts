import { property } from 'lit/decorators.js';
import { html, LitElement, css } from 'lit';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import type { IconPrefix, IconName, IconLookup } from '@fortawesome/fontawesome-common-types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

library.add(faUser, faHeart, faHome);

export default class PlusIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }
    svg {
      height: 1em;
      width: 1em;
      vertical-align: middle;
    }
  `;

  constructor() {
    super();
  }

  @property()
  iconName?: IconName;

  @property()
  override prefix: IconPrefix = 'fas';

  private getIconHtml() {
    if (!this.iconName) return '';
    
    try {
      const lookup: IconLookup = {
        prefix: this.prefix,
        iconName: this.iconName
      };

      const result = icon(lookup);
      return result ? unsafeHTML(result.html[0]) : '';
    } catch (error) {
      console.error('Icon not found:', error);
      return '';
    }
  }

  override render() {
    return html`
        ${this.getIconHtml()}
    `;
  }
}

export { PlusIcon };