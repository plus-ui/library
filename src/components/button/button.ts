import { html } from 'lit';
import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { baseButtonStyle } from './button.style';

import style from './button.styles';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Add a description here
 *
 * @tag plus-button
 * @since 0.0.0
 * @status experimental
 *
 * @slot - The default slot
 *
 **/
export default class PlusButton extends Tailwind {
  static override styles = [...Tailwind.styles, style];

  @property() kind: 'filled' | 'outlined' | 'dashed' | 'text' = 'filled';
  @property() status: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean }) loading = false;

  @property() size: 'sm' | 'md' | 'lg' = 'md';

  constructor() {
    super();
  }

  get classes() {
    return baseButtonStyle({
      size: this.size,
      kind: this.kind,
      status: this.status,
      disabled: this.disabled,
      loading: this.loading,
    });
  }

  override render() {
    const { status } = this;

    const filledStyles = {
      '--i-bg-default': `var(--plus-color-background-${status}-default)`,
      '--i-bg-hovered': `var(--plus-color-background-${status}-hovered)`,
      '--i-bg-focused': `var(--plus-color-background-${status}-pressed)`,
      '--i-bg-pressed': `var(--plus-color-background-${status}-focused)`,
      '--i-text-color': `var(--plus-color-text-${status === 'default' ? 'default' : 'base'})`,
      '--i-border-color': 'transparent',
    };

    const commonStyles = {
      '--i-bg-hovered': 'var(--plus-color-background-default-hovered)',
      '--i-bg-pressed': 'var(--plus-color-background-default-pressed)',
      '--i-bg-focused': 'var(--plus-color-background-default-focused)',
      '--i-bg-loading': 'var(--plus-color-background-default-loading)',
      '--i-text-color': `var(--plus-color-text-${status})`,
      '--i-border-color': `var(--plus-color-border-${status})`,
    };

    const styles = {
      filled: {
        ...filledStyles,
      },
      outlined: {
        ...commonStyles,
      },
      dashed: {
        ...commonStyles,
      },
      text: {
        ...commonStyles,
        '--i-border-color': 'transparent',
      },
    };

    const style = styleMap(styles[this.kind]);

    return html`
      <button class=${this.classes} part="button" ?disabled=${this.disabled} style=${style}>
        <slot></slot>
      </button>
    `;
  }
}

export { PlusButton };
