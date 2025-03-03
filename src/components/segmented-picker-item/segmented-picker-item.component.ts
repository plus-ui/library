import { html } from 'lit';
import { Tailwind } from '../base/tailwind-base';
import { property, state } from 'lit/decorators.js';
import { segmentedPickerItemStyle } from './segmented-picker-item.style';

export default class PlusSegmentedPickerItem extends Tailwind {
  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String })
  status: 'default' | 'primary' = 'default';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  shape: 'square' | 'circle' = 'square';

  @property({ type: String })
  groupName = '';

  @property({ type: String })
  value = '';

  @state()
  internalId = Math.random().toString(36).substr(2, 9);

  private handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (!this.checked) {
      this.checked = true;
    }
  }

  override updated(changedProps: Map<string, string>) {
    if (changedProps.has('checked') && this.checked) {
      this.emit('item-changed', {
        detail: {
          item: this,
          value: this.value,
        },
      });
    }
  }

  override render() {
    const id = this.id ? this.id + '-item' : this.internalId + '-item';
    return html` <input
        id=${id}
        type="radio"
        class="radio-input appearance-none hidden"
        name=${this.groupName}
        value=${this.value}
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      />
      <label
        for=${id}
        aria-checked=${this.checked}
        class=${segmentedPickerItemStyle({
          status: this.status,
          checked: this.checked,
          disabled: this.disabled,
          shape: this.shape,
        })}
        ><slot></slot
      ></label>`;
  }
}

export { PlusSegmentedPickerItem };
