import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ratingStyle, labelStyle, captionStyle } from './rating.style';
import Tailwind from '../base/tailwind-base';
import { booleanConverter } from '../../utils/boolean-converter';

// Import SVG icon component - Adjust path if necessary
import '../svg-icon/svg-icon.js';

/**
 * @tag plus-rating
 * @summary A rating component to display and optionally set a rating value.
 *
 * @csspart host - The main container element.
 * @csspart star-container - The container for each star.
 * @csspart star-icon - Each individual star icon.
 * @csspart star-partial - The element used to display partial stars.
 *
 * @event plus-change - Emitted when the rating value changes via user interaction.
 * @event plus-hover - Emitted when the user hovers over a star, includes the potential value.
 *
 * @cssprop [--star-color-active=--color-warning-500] - Color of active/selected stars.
 * @cssprop [--star-color-inactive=--color-neutral-300] - Color of inactive stars.
 * @cssprop [--star-color-hover=--plus-color-text-primary] - Color of stars on hover.
 */
export default class PlusRating extends Tailwind {
  static override styles = [...Tailwind.styles];

  @property({ type: Number, reflect: true }) value = 0;
  @property({ type: Number }) max = 5;
  @property({ type: Number }) precision = 1; // Steps: 1 for full stars, 0.5 for half, 0.1 etc.
  @property({ type: Boolean, converter: booleanConverter }) readonly = false;
  @property({ type: Boolean, converter: booleanConverter }) disabled = false;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property() name?: string; // For potential form integration later

  /** The name of the icon to use for empty rating items. */
  @property({ attribute: 'empty-icon-name' }) emptyIconName = 'regular-star';

  /** The name of the icon to use for filled rating items. */
  @property({ attribute: 'filled-icon-name' }) filledIconName = 'solid-star';

  /** The label for the rating component. */
  @property({ type: String }) label?: string;

  /** The caption text displayed below the rating. */
  @property({ type: String }) caption?: string;

  @property({ type: Boolean, converter: booleanConverter }) required = false; // Add required property if not already present

  // Internal state for hover effect
  @state() private hoverValue = 0;
  @state() private isHovering = false;
  @state() private error = false; // Add error state

  // Styles computed by tailwind-variants
  // Initialize styles in constructor or connectedCallback if needed,
  // or call ratingStyle directly in render.

  // Add connectedCallback to clamp initial value
  override connectedCallback() {
    super.connectedCallback();
    this.value = this.clampValue(this.value);
  }

  private clampValue(value: number): number {
    const roundedValue = Math.round(value / this.precision) * this.precision;
    return Math.max(0, Math.min(roundedValue, this.max));
  }

  private getStarValue(index: number): number {
    // Calculate the value this star represents (e.g., 1, 2, 3, ...)
    return index + 1;
  }

  // Helper function for ARIA value text and tooltips
  private getStarLabel(value: number): string {
    // Simple label, can be customized further (e.g., localization)
    const roundedValue = this.clampValue(value);
    return `${roundedValue} out of ${this.max} stars`;
  }

  private handleMouseOver(index: number) {
    if (this.readonly || this.disabled) return;
    this.isHovering = true;
    this.hoverValue = this.getStarValue(index);
    this.emit('plus-hover', {
      detail: { phase: 'start', value: this.hoverValue },
    });
  }

  private handleMouseLeave() {
    if (this.readonly || this.disabled) return;
    this.isHovering = false;
    this.hoverValue = 0;
    this.emit('plus-hover', { detail: { phase: 'end', value: 0 } });
  }

  private handleClick(index: number) {
    if (this.readonly || this.disabled) return;
    const newValue = this.clampValue(this.getStarValue(index));
    this.value = newValue;
    this.error = false; // Clear error on interaction
    this.emit('plus-change', { detail: { value: this.value } });
  }

  // --- Keyboard Navigation ---
  private handleKeyDown(event: KeyboardEvent) {
    if (this.readonly || this.disabled) {
      return;
    }

    let newValue = this.value;
    let valueChanged = false;

    switch (event.key) {
      case 'ArrowLeft':
        newValue = Math.max(0, this.value - this.precision);
        valueChanged = true;
        break;
      case 'ArrowRight':
        newValue = Math.min(this.max, this.value + this.precision);
        valueChanged = true;
        break;
      case 'Home':
        newValue = 0;
        valueChanged = true;
        break;
      case 'End':
        newValue = this.max;
        valueChanged = true;
        break;
      default:
        // Ignore other keys
        return;
    }

    if (valueChanged) {
      event.preventDefault(); // Prevent browser scrolling etc.
      const clampedNewValue = this.clampValue(newValue);
      if (clampedNewValue !== this.value) {
        this.value = clampedNewValue;
        this.error = false; // Clear error on interaction
        this.emit('plus-change', { detail: { value: this.value } });
      }
    }
  }
  // --- End Keyboard Navigation ---

  /** Checks validity and sets the error state. Returns true if valid, false otherwise. */
  public reportValidity(): boolean {
    const isValid = !(this.required && (!this.value || this.value <= 0));
    this.error = !isValid;
    if (!isValid) {
      // Optionally emit plus-invalid here if needed for consistency
      // this.emit('plus-invalid', { detail: { message: 'This field is required' } });
    }
    return isValid;
  }

  override render() {
    const displayValue = this.isHovering ? this.hoverValue : this.value;
    const styles = ratingStyle({
      size: this.size,
      disabled: this.disabled,
      readonly: this.readonly,
    });
    const hostTitle = this.isHovering
      ? this.getStarLabel(this.hoverValue)
      : this.getStarLabel(this.value);
    const labelId = 'rating-label';
    const captionId = 'rating-caption';

    // Label Template - Pass error state
    const LabelTemplate = () =>
      this.label
        ? html`<label
            id=${labelId}
            class=${labelStyle({
              size: this.size,
              required: this.required,
            })}
            for="rating-host"
            >${this.label}</label
          >`
        : nothing;

    // Caption Template - Pass error state
    const CaptionTemplate = () => {
      // Show error message if error state is true, otherwise show caption
      const message = this.error ? 'This field is required' : this.caption; // Basic error message
      return message
        ? html`<div
            id=${captionId}
            class=${captionStyle({ size: this.size, error: this.error })}
          >
            ${message}
          </div>`
        : nothing;
    };

    return html`
      <div class="flex flex-col items-start justify-start gap-1">
        ${LabelTemplate()}
        <div
          id="rating-host"
          class=${styles.host()}
          role="slider"
          aria-label=${ifDefined(this.label ? undefined : 'Rating')}
          aria-labelledby=${ifDefined(this.label ? labelId : undefined)}
          aria-describedby=${ifDefined(
            this.caption || this.error ? captionId : undefined
          )}
          aria-invalid=${this.error}
          aria-required=${this.required}
          aria-valuemin="0"
          aria-valuemax=${this.max}
          aria-valuenow=${this.value}
          aria-readonly=${this.readonly}
          aria-disabled=${this.disabled}
          aria-valuetext=${this.getStarLabel(this.value)}
          tabindex=${this.disabled ? '-1' : '0'}
          title=${hostTitle}
          @mouseleave=${this.handleMouseLeave}
          @keydown=${this.handleKeyDown}
        >
          ${[...Array(this.max)].map((_, i) => {
            const starValue = this.getStarValue(i);
            const shouldBeFilled = starValue <= displayValue;
            const isPartiallyActive =
              starValue - 1 < displayValue && displayValue < starValue;
            const partialWidth = isPartiallyActive
              ? `${(displayValue - (starValue - 1)) * 100}%`
              : '0%';

            const currentIconName = shouldBeFilled
              ? this.filledIconName
              : this.emptyIconName;
            const iconColorClass = shouldBeFilled
              ? 'text-color-primary'
              : 'text-color-placeholder';
            const currentIconColorClass =
              this.isHovering && shouldBeFilled
                ? 'text-color-primary'
                : iconColorClass;
            const starTooltip = this.getStarLabel(starValue);

            return html`
              <span
                class=${styles.starContainer()}
                title=${starTooltip}
                @mouseover=${() => this.handleMouseOver(i)}
                @click=${() => this.handleClick(i)}
              >
                <!-- Background Star -->
                <span class="${styles.starIcon()} ${currentIconColorClass}">
                  <plus-svg-icon iconName=${currentIconName}></plus-svg-icon>
                </span>

                <!-- Foreground Partial Star -->
                ${isPartiallyActive
                  ? html`
                      <span
                        class="${styles.starPartial()} ${styles.starIcon()} text-color-primary"
                        style=${styleMap({ width: partialWidth })}
                      >
                        <plus-svg-icon
                          iconName=${this.filledIconName}
                        ></plus-svg-icon>
                      </span>
                    `
                  : nothing}
              </span>
            `;
          })}
        </div>
        ${CaptionTemplate()}
      </div>
    `;
  }
}

export { PlusRating };
