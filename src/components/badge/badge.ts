import { property, state } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { html } from 'lit';
import badgeHostStyle from './badge.host.style';
import { badgeStyle } from './badge.style';
import { styleMap } from 'lit/directives/style-map.js';

export default class PlusBadge extends Tailwind {


  static override styles = [...Tailwind.styles, badgeHostStyle];

  @property({ type: String })
  kind: 'dot' | 'text' = 'text';

  @property({ type: String })
  status: 'success' | 'warning' | 'danger' | 'info' | 'default' = 'default';

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean })
  invert = false;

  @property({ type: String })
  orientation: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | '' = 'top-right';

  @state()
  hasSlot = false;


  @property({
    type: Array,
    converter: value => {
      const split = value ? value.split(',') : [];
      if (split?.length > 1) {
        return [split[0], split[1]];
      } else {
        return [value, value];
      }
    },
  })
  offset!: [string, string];


  override render() {
    const { offset } = this;
    return html`
    <slot></slot>
      <div
        role="status"
        aria-live="polite"
        data-invert=${this.invert}
        style=${styleMap({
          ...(offset && { transform: `translate(${offset[0]}, ${offset[1]})` }),
        })}
        class=${badgeStyle({
          size: this.size,
          kind: this.hasSlot ? 'text' : this.kind,
          orientation: this.orientation,
          status: this.status as 'success' | 'warning' | 'danger' | 'info' | 'default',
        })}
      >
        ${this.kind === 'text' ? html`<slot name="badge-content" @slotchange=${()=> this.hasSlot = true} ></slot>` : ''}
      </div>
    `;
  }
}

export { PlusBadge };
