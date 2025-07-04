import { property } from 'lit/decorators.js';
import { html, nothing, TemplateResult } from 'lit';
import { booleanConverter } from '../../utils/boolean-converter';
import { SlotController } from '../../controllers/slot-controller.js';
import Tailwind from '../base/tailwind-base';
import { breadcrumbItemStyle } from './breadcrumb-item.style';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @tag plus-breadcrumb-item
 *
 * Represents a single item within a breadcrumb trail.
 * Should be used inside a `plus-breadcrumb` component.
 *
 * @slot - The default slot for the item's label content.
 * @slot prefix - Optional slot for content/icon to display before the label. Overrides `prefix-icon` property.
 * @slot suffix - Optional slot for content/icon to display after the label. Overrides `suffix-icon` property.
 *
 * @csspart base - The component's base wrapper element.
 * @csspart link - The `plus-link` element (if `href` is provided).
 * @csspart text - The `span` element (if `href` is not provided).
 * @csspart prefix - The prefix container (slot or icon).
 * @csspart suffix - The suffix container (slot or icon).
 * @csspart separator - The separator element.
 */
export class PlusBreadcrumbItem extends Tailwind {
  private readonly slotController = new SlotController(this);

  /** The URL to navigate to when the item is clicked. If omitted, the item is rendered as text. */
  @property({ type: String })
  href?: string;

  /** Name of the optional icon to display before the label. Used only if the `prefix` slot is empty. */
  @property({ type: String, attribute: 'prefix-icon' })
  prefixIcon?: string;

  /** Name of the optional icon to display after the label. Used only if the `suffix` slot is empty. */
  @property({ type: String, attribute: 'suffix-icon' })
  suffixIcon?: string;

  // Internal properties managed by the parent breadcrumb
  /** @internal */
  @property({ type: Boolean, attribute: false, converter: booleanConverter })
  isLastItemInternal = false;

  /** @internal */
  @property({ type: String, attribute: false })
  sizeInternal: 'sm' | 'md' | 'lg' = 'md';

  /** @internal */
  @property({ type: String, attribute: false })
  separatorInternal: 'arrow' | 'slash' = 'arrow';

  private renderSeparator(): TemplateResult | typeof nothing {
    if (this.isLastItemInternal) return nothing;

    const { separator } = breadcrumbItemStyle({
      size: this.sizeInternal,
      isLastItem: this.isLastItemInternal,
    });
    const iconName =
      this.separatorInternal === 'arrow' ? 'angle-right' : 'slash-forward';
    const separatorContent =
      this.separatorInternal === 'slash'
        ? '/'
        : html`<plus-icon icon-name=${iconName}></plus-icon>`;

    return html`<span part="separator" class=${separator()}
      >${separatorContent}</span
    >`;
  }

  private renderPrefix(): TemplateResult | typeof nothing {
    const { prefix } = breadcrumbItemStyle({ size: this.sizeInternal });
    const hasPrefixSlot = this.slotController.hasNamedSlot('prefix');

    return html`
      <span part="prefix" class=${prefix()}
        >${hasPrefixSlot
          ? html`<slot name="prefix"></slot>`
          : this.prefixIcon
            ? html`<plus-icon icon-name=${this.prefixIcon}></plus-icon>`
            : nothing}</span
      >
    `;
  }

  private renderSuffix(): TemplateResult | typeof nothing {
    const { suffix } = breadcrumbItemStyle({ size: this.sizeInternal });
    const hasSuffixSlot = this.slotController.hasNamedSlot('suffix');

    return html`
      <span part="suffix" class=${suffix()}
        >${hasSuffixSlot
          ? html`<slot name="suffix"></slot>`
          : this.suffixIcon
            ? html`<plus-icon icon-name=${this.suffixIcon}></plus-icon>`
            : nothing}</span
      >
    `;
  }

  override render() {
    const { base } = breadcrumbItemStyle({
      size: this.sizeInternal,
      isLastItem: this.isLastItemInternal,
    });

    const content = html`
      <div class="flex items-center gap-2">
        ${this.renderPrefix()}
        <slot></slot>
        ${this.renderSuffix()}
      </div>
    `;

    return html`
      <div part="base" class=${base()}>
        ${this.href
          ? html`<plus-link
              part="link"
              href=${this.href}
              size=${this.sizeInternal}
              ?disabled=${this.isLastItemInternal}
              aria-current=${ifDefined(
                this.isLastItemInternal ? 'page' : undefined
              )}
              >${content}</plus-link
            >`
          : html`<span
              part="text"
              aria-current=${ifDefined(
                this.isLastItemInternal ? 'page' : undefined
              )}
              >${content}</span
            >`}
        ${this.renderSeparator()}
      </div>
    `;
  }
}
