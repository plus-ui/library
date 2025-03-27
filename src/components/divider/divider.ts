import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseDividerStyle } from './divider.style';
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

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        --divider-color: var(--plus-color-background-divider);
        --divider-thickness-thin: 1px;
        --divider-thickness-medium: 2px;
        --divider-thickness-thick: 4px;
        --divider-spacing: 8px;
        --divider-type: solid;
      }

      :host([orientation='horizontal']) {
        width: 100%;
        display: block;
        margin: var(--divider-spacing) 0;
      }

      :host([orientation='vertical']) {
        height: 100%;
        margin: 0 var(--divider-spacing);
        display: inline-block;
      }

      // .plus-divider {
      //   position: relative;
      //   border: 0;
      //   margin: 0;
      // }

      :host([orientation='horizontal']) .plus-divider {
        height: 0;
        width: 100%;
      }
      :host([orientation='horizontal']) .plus-divider-line {
        height: 0;
        width: 100%;
        border-top-width: var(
          --divider-thickness,
          var(--divider-thickness-thin)
        );
        border-top-style: var(--divider-type, solid);
        border-color: var(--divider-color);
      }

      :host([orientation='vertical']) .plus-divider {
        width: 0;
        height: 100%;
      }
      :host([orientation='vertical']) .plus-divider-line {
        width: 0;
        height: 100%;
        border-left-width: var(
          --divider-thickness,
          var(--divider-thickness-thin)
        );
        border-left-style: var(--divider-type, solid);
        border-color: var(--divider-color);
        display: inline-block;
      }

      :host([Kind='dashed'][orientation='horizontal']) .plus-divider-line {
        border-top-style: dashed;
      }

      :host([Kind='dotted'][orientation='horizontal']) .plus-divider-line {
        border-top-style: dotted;
      }

      :host([Kind='dashed'][orientation='vertical']) .plus-divider-line {
        border-left-style: dashed;
      }

      :host([Kind='dotted'][orientation='vertical']) .plus-divider-line {
        border-left-style: dotted;
      }

      :host([thickness='thin']) {
        --divider-thickness: var(--divider-thickness-thin);
      }

      :host([thickness='medium']) {
        --divider-thickness: var(--divider-thickness-medium);
      }

      :host([thickness='thick']) {
        --divider-thickness: var(--divider-thickness-thick);
      }

      // /* Styles for divider with content */
      // :host([has-content]) {
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      // }

      // :host([has-content][orientation='vertical']) {
      //   flex-direction: column;
      // }

      // :host([has-content][content-position='left']) .divider-content {
      //   margin-right: auto;
      // }

      // :host([has-content][content-position='right']) .divider-content {
      //   margin-left: auto;
      // }

      // :host([has-content][orientation='horizontal']) .plus-divider {
      //   flex-grow: 1;
      // }

      // :host([has-content][orientation='vertical']) .plus-divider {
      //   flex-grow: 1;
      // }

      // .divider-content {
      //   padding: 0 16px;
      //   font-size: 14px;
      //   color: var(--plus-color-text-secondary, #6b7280);
      // }
    `,
  ];

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
