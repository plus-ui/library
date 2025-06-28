import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
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
   * Indicates whether the panel is currently active/visible.
   */
  @property({ type: Boolean, reflect: true, converter: booleanConverter })
  active = false;

  /**
   * An optional class to apply to the panel container.
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
