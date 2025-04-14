import { property, queryAssignedElements } from 'lit/decorators.js';
import { html } from 'lit';
import Tailwind from '../base/tailwind-base';
import { breadcrumbStyle } from './breadcrumb.style';
import type { PlusBreadcrumbItem } from '../breadcrumb-item/index.js';

/**
 * @tag plus-breadcrumb
 *
 * Displays a hierarchical navigation path, typically showing the user's location within a site or app.
 * It uses `plus-breadcrumb-item` components slotted inside for each step in the path.
 *
 * @slot - Default slot for `plus-breadcrumb-item` elements.
 *
 * @csspart base - The main container element (`nav`).
 */
export class PlusBreadcrumb extends Tailwind {
  @queryAssignedElements({ flatten: true })
  private _items!: Array<PlusBreadcrumbItem>;

  /** Defines the visual style of the breadcrumb container. */
  @property({ type: String })
  kind: 'non-framed' | 'framed' = 'non-framed';

  /** The type of separator to display between items. */
  @property({ type: String })
  separator: 'arrow' | 'slash' = 'arrow';

  /** The size of the breadcrumb items and separators. */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  private handleSlotChange() {
    this._items.forEach((item, index) => {
      item.isLastItemInternal = index === this._items.length - 1;
      item.sizeInternal = this.size;
      item.separatorInternal = this.separator;
    });
  }

  override render() {
    const baseClass = breadcrumbStyle({ kind: this.kind, size: this.size });

    return html`
      <nav part="base" class=${baseClass} aria-label="Breadcrumb">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>
    `;
  }
}
