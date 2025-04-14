import { property } from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import Tailwind from '../base/tailwind-base';
import { textStyle } from './text.style';

/**
 * @tag plus-text
 *
 * Text component for displaying text with various styles based on the design system.
 * Renders the appropriate semantic HTML tag based on the `kind` property (e.g., h1, h2, p, div).
 *
 * @slot - The default slot for the text content.
 *
 * @csspart base - The component's base wrapper element (e.g., h1, p, div).
 *
 * @cssproperty --i-text-color - Inherited text color variable.
 */
export class PlusText extends Tailwind {
  /**
   * Defines the visual style and semantic meaning of the text.
   * - `display`: For large, prominent display text (rendered as div).
   * - `heading1`: For the main heading (rendered as h1).
   * - `heading2`: For secondary headings (rendered as h2).
   * - `title1`: For primary titles (rendered as h3 - adjust as needed).
   * - `title2`: For secondary titles (rendered as h4 - adjust as needed).
   * - `body`: For standard body text (rendered as p) (default).
   * - `body-accent`: For emphasized body text (rendered as p).
   * - `helper`: For helper text, often used with form elements (rendered as div).
   * - `caption`: For small caption text (rendered as div).
   * @default 'body'
   */
  @property({ type: String })
  kind:
    | 'display'
    | 'heading1'
    | 'heading2'
    | 'title1'
    | 'title2'
    | 'body'
    | 'body-accent'
    | 'helper'
    | 'caption' = 'body';

  private getTag() {
    switch (this.kind) {
      case 'heading1':
        return literal`h1`;
      case 'heading2':
        return literal`h2`;
      case 'title1':
        return literal`h3`; // Or another appropriate heading level
      case 'title2':
        return literal`h4`; // Or another appropriate heading level
      case 'body':
      case 'body-accent':
        return literal`p`;
      case 'display':
      case 'helper':
      case 'caption':
      default:
        return literal`div`; // Use div for non-paragraph/heading types
    }
  }

  /**
   * Renders the text component with the appropriate styles and semantic tag.
   * @returns The rendered template.
   */
  override render() {
    const classes = textStyle({ kind: this.kind });
    const tag = this.getTag();

    // Render the dynamic tag using the result from getTag()
    return html`
      <${tag} part="base" class=${classes}>
        <slot></slot>
      </${tag}>
    `;
  }
}
