import { html } from 'lit';
import { Tailwind } from '../base/tailwind-base';
import { property, state } from 'lit/decorators.js';
import { segmentedPickerItemStyle } from './segmented-picker-item.style';

/**
 * @tag plus-segmented-picker-item
 * @summary An item component for the segmented picker.
 *
 * @slot - The content of the item.
 *
 * @csspart label - The label element.
 * @csspart input - The input element.
 */
export default class PlusSegmentedPickerItem extends Tailwind {
  /**
   * Whether the item is checked.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * The status of the item.
   * @type {'default' | 'primary'}
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  status: 'default' | 'primary' = 'default';

  /**
   * Whether the item is disabled.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The shape of the item.
   * @type {'square' | 'circle'}
   * @default 'square'
   */
  @property({ type: String, reflect: true })
  shape: 'square' | 'circle' = 'square';

  /**
   * The size of the item.
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * The name of the group this item belongs to.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true })
  groupName = '';

  /**
   * The value of the item.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true })
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
        part="input"
      />
      <label
        for=${id}
        aria-checked=${this.checked}
        aria-disabled=${this.disabled}
        role="radio"
        part="label"
        class=${segmentedPickerItemStyle({
          status: this.status,
          checked: this.checked,
          disabled: this.disabled,
          shape: this.shape,
          size: this.size,
        })}
        ><slot></slot
      ></label>`;
  }
}

export { PlusSegmentedPickerItem };
