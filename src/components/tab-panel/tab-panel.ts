import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import Tailwind from '../base/tailwind-base';
import { tabStyle } from '../tab/styles';

/**
 * @tag plus-tab-panel
 * @summary Tab panel component that displays content associated with a tab.
 *
 * @slot - The default slot for tab panel content
 *
 * @csspart panel - The component's base wrapper
 *
 * @example
 * ```html
 * <plus-tab-panel value="tab1">Tab 1 Content</plus-tab-panel>
 * ```
 */
export default class PlusTabPanel extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }
    `,
  ];

  /**
   * Sets the value of the tab panel, used for matching with a tab
   */
  @property({ type: String })
  value = '';

  /**
   * Indicates if the panel is currently visible
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Custom CSS class to apply to the panel
   */
  @property({ type: String })
  panelClass = '';

  override render() {
    const { active, panelClass } = this;
    const { tabPanel } = tabStyle({ active });

    return html`
      <div
        part="panel"
        class=${tabPanel({ class: panelClass })}
        role="tabpanel"
        aria-hidden=${!active}
      >
        <slot></slot>
      </div>
    `;
  }
}

export { PlusTabPanel };
