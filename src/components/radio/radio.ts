import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { radioStyle } from './radio.style';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-radio
 * @since 0.0.0
 * @status experimental
 *
 * PlusRadio component provides a radio button element with customizable styles and states.
 * Supports different sizes and interactive states such as checked, disabled, readonly, and error.
 *
 * @slot - The default slot for radio button label content
 *
 * @csspart radio - The component's radio input element
 */
export default class PlusRadio extends Tailwind {
  @query('input[type="radio"]')
  input!: HTMLInputElement;

  /**
   * Sets the size of the radio button
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Defines the text label for the radio button
   * @default undefined
   */
  @property({ type: String })
  text?: string;

  /**
   * Indicates whether the radio button is checked
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Indicates if the radio button is in an error state
   * @default false
   */
  @property({ type: Boolean })
  error = false;

  /**
   * Disables the radio button interaction
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Makes the radio button readonly (non-interactive but not disabled)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * The name of the radio button, used for form submission and radio grouping
   */
  @property()
  name = '';

  /**
   * Indicates if the radio input is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The value associated with the radio button
   */
  @property()
  value = '';

  /**
   * Internal state to track if the radio button has focus
   * @default false
   */
  @state()
  hasFocus = false;

  /**
   * Handles the change event when the radio button is toggled
   */
  handleChange() {
    if (!this.readonly && !this.disabled) {
      this.checked = this.input.checked;
      this.emit('plus-change', {
        detail: {
          checked: this.checked,
          value: this.value || this.input.value,
          name: this.name || this.input.name,
        },
        bubbles: true,
        composed: true,
      });
    }
  }

  /**
   * Handles the focus event when the radio button gains focus
   */
  private handleFocus() {
    this.hasFocus = true;
    this.emit('plus-focus');
  }

  /**
   * Handles the blur event when the radio button loses focus
   */
  private handleBlur() {
    this.hasFocus = false;
    this.emit('plus-blur');
  }

  override render() {
    const { host, wrapper, radio, dot, label } = radioStyle({
      size: this.size,
      disabled: this.disabled,
      readonly: this.readonly,
    });

    const baseStyles = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-bg-hovered': 'var(--plus-color-background-default-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-default-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-default-focused)',
      '--i-text-color': 'var(--plus-color-text-default)',
      '--i-border-color': 'var(--plus-color-border-default)',
      '--i-bg-checked': 'var(--plus-color-background-primary-default)',
    };

    const errorStyles = {
      '--i-bg-default': 'var(--plus-color-background-danger-invert-default)',
      '--i-bg-hovered': 'var(--plus-color-background-danger-invert-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-danger-invert-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-danger-focused)',
      '--i-border-color': 'var(--plus-color-border-danger)',
      '--i-bg-checked': 'var(--plus-color-background-danger-default)',
    };

    const disabledStyles = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-bg-hovered': 'transparent',
      '--i-bg-pressed': 'transparent',
      '--i-bg-focused': 'transparent',
      '--i-text-color': 'var(--plus-color-text-disabled)',
      '--i-border-color': 'var(--plus-color-border-disabled)',
      '--i-bg-checked': 'var(--plus-color-background-disabled)',
    };

    const readonlyStyles = {
      '--i-bg-default': 'var(--plus-color-background-surface)',
      '--i-bg-hovered': 'transparent',
      '--i-bg-pressed': 'transparent',
      '--i-bg-focused': 'transparent',
      '--i-border-color': 'var(--plus-color-border-disabled)',
      '--i-bg-checked': 'var(--plus-color-background-default-invert-default)',
    };

    const checkedStyles = {
      '--i-border-color': 'var(--plus-color-border-primary)',
      '--i-bg-hovered': 'var(--plus-color-background-primary-invert-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-primary-invert-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-primary-invert-focused)',
    };

    const dynamicStyles = {
      '--d-text': 'var(--text-color, var(--i-text-color))',
      '--d-border': 'var(--border-color, var(--i-border-color))',
      '--d-bg-default': 'var(--bg-default, var(--i-bg-default))',
      '--d-bg-hovered': 'var(--bg-hovered, var(--i-bg-hovered))',
      '--d-bg-pressed': 'var(--bg-pressed, var(--i-bg-pressed))',
      '--d-bg-focused': 'var(--bg-focused, var(--i-bg-focused))',
      '--d-bg-checked': 'var(--bg-checked, var(--i-bg-checked))',
    };

    const globalStyles = {
      ...baseStyles,
      ...(this.checked && checkedStyles),
      ...(this.error && errorStyles),
      ...(this.disabled && disabledStyles),
      ...(this.readonly && readonlyStyles),
      ...dynamicStyles,
    };

    const radioId = `radio-${this.id || Math.random().toString(36).substring(2, 9)}`;

    return html`
      <div class=${host()} style=${styleMap(globalStyles)}>
        <div class=${wrapper()}>
          <input
            part="radio"
            type="radio"
            id=${radioId}
            class=${radio()}
            .name=${this.name}
            .value=${this.value}
            .checked=${this.checked}
            ?disabled=${this.disabled || this.readonly}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @change=${this.handleChange}
            ?required=${this.required}
            aria-checked=${this.checked}
            aria-disabled=${this.disabled || this.readonly}
          />
          <div class=${dot()}></div>
        </div>
        <label for=${radioId} class=${label()}>
          <slot>${this.text}</slot>
        </label>
      </div>
    `;
  }
}

export { PlusRadio };
