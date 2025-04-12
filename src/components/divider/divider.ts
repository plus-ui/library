import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseDividerStyle, dividerStyle } from './divider.style';
import Tailwind from '../base/tailwind-base';

/**
 * @tag plus-divider
 * @since 0.0.0
 * @status stable
 *
 * PlusDivider component is used to visually separate content in a list or group.
 *
 * @slot - The default slot for optional divider content (for text dividers)
 *
 * @csspart divider - The component's base wrapper
 * @csspart label - The text content container
 *
 * @cssproperty --divider-color - Controls the color of the divider
 * @cssproperty --divider-thickness - Controls the thickness of the divider
 * @cssproperty --divider-spacing - Controls the spacing around the divider
 */
export default class PlusDivider extends Tailwind {
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * The Kind of the divider.
   * @default 'solid'
   */
  @property({ type: String, reflect: true })
  kind: 'solid' | 'dashed' | 'dotted' = 'solid';

  /**
   * The position of the text content (only applicable with hasContent=true)
   * @default 'center'
   */
  @property({ type: String, reflect: true })
  contentPosition: 'left' | 'center' | 'right' = 'center';

  /**
   * The thickness of the divider
   * @default 'thin'
   */
  @property({ type: String, reflect: true })
  thickness: 'thin' | 'medium' | 'thick' = 'thin';

  /**
   * Whether the divider has content or not
   * @default false
   */
  @state()
  hasContent = false;

  static override styles = [...Tailwind.styles, dividerStyle];

  handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasContent = slot.assignedNodes().length > 0;
  }

  override render() {
    const { base, line, slotArea } = baseDividerStyle({
      orientation: this.orientation,
      kind: this.kind,
      hasContent: this.hasContent,
    });

    // // For a divider with content
    // if (this.hasContent) {
    //   // For horizontal divider with content
    //   if (this.orientation === 'horizontal') {
    //     return html`
    //       <div class=${base()} part="divider">
    //         ${this.contentPosition !== 'right'
    //           ? html`<hr class="plus-divider" />`
    //           : ''}
    //         <div class="divider-content" part="label">
    //           <slot></slot>
    //         </div>
    //         ${this.contentPosition !== 'left'
    //           ? html`<hr class="plus-divider" />`
    //           : ''}
    //       </div>
    //     `;
    //   }
    //   // For vertical divider with content
    //   return html`
    //     <div class=${base()} part="divider">
    //       ${this.contentPosition !== 'right'
    //         ? html`<div class="plus-divider"></div>`
    //         : ''}
    //       <div class="divider-content" part="label">
    //         <slot></slot>
    //       </div>
    //       ${this.contentPosition !== 'left'
    //         ? html`<div class="plus-divider"></div>`
    //         : ''}
    //     </div>
    //   `;
    // }

    // For a simple divider without content
    return html`
      <div class=${base()} part="divider">
        <div class=${line()}></div>
        <div class=${slotArea()}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div class=${line()}></div>
      </div>
    `;
  }
}

export { PlusDivider };
