import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import { buttonGroupStyle } from './button-group.style';
import Tailwind from '../base/tailwind-base';

/**
 * Orientation type for button group
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * @tag plus-button-group
 * @summary Button group component that groups related buttons together.
 *
 * @slot - The default slot for the buttons
 *
 * @cssproperty --button-group-gap - Gap between buttons in the group
 *
 * @example
 * ```html
 * <plus-button-group orientation="horizontal" override>
 *   <plus-button>First</plus-button>
 *   <plus-button>Second</plus-button>
 *   <plus-button>Third</plus-button>
 * </plus-button-group>
 * ```
 */
export default class PlusButtonGroup extends Tailwind {
  /**
   * The orientation of the button group.
   */
  @property({ type: String, reflect: true })
  orientation: Orientation = 'horizontal';

  /**
   * Determines whether the button group's properties override the properties of its child buttons.
   * When true, all buttons in the group will have the same appearance.
   * When false, each button can have its own properties.
   * @default false
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
    reflect: true,
  })
  override = false;

  /**
   * Determines the visual style of the button
   * - filled: Solid background color
   * - outlined: Transparent background with border
   * - dashed: Transparent background with dashed border
   * - text: Text only without background or border
   * @default 'filled'
   */
  @property({ type: String })
  kind: 'filled' | 'outlined' | 'dashed' | 'text' = 'filled';

  /**
   * Sets the status/color variant of the button
   * - default: Neutral color scheme
   * - primary: Brand color scheme
   * - success: Green color scheme
   * - warning: Yellow color scheme
   * - danger: Red color scheme
   * - info: Blue color scheme
   * @default 'default'
   */
  @property({ type: String })
  status: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' =
    'default';

  /**
   * Sets the size of the button
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disables the button interaction
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  disabled = false;

  /**
   * Shows loading spinner and disables interaction
   * @default false
   */
  @property({ type: Boolean, converter: booleanConverter, reflect: true })
  loading = false;

  @state()
  private _buttons: HTMLElement[] = [];

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  /**
   * Gets all child buttons in the group
   */
  private get buttons() {
    return this._buttons;
  }

  /**
   * Apply shared properties to buttons in the group.
   * This method either overrides the properties of child buttons or respects their individual properties
   * based on the override prop.
   */
  private applyPropertiesToButtons() {
    const isVertical = this.orientation === 'vertical';

    this.buttons.forEach((button) => {
      if (this.override) {
        // Override button properties with group properties
        button.setAttribute('size', this.size);
        button.setAttribute('kind', this.kind);
        button.setAttribute('status', this.status);

        // Override disabled and loading states
        if (this.disabled) {
          button.setAttribute('disabled', '');
        } else {
          button.removeAttribute('disabled');
        }

        if (this.loading) {
          button.setAttribute('loading', '');
        } else {
          button.removeAttribute('loading');
        }
      }

      // Always set full-width attribute on buttons when orientation is vertical
      if (isVertical) {
        button.setAttribute('full-width', '');
      } else {
        button.removeAttribute('full-width');
      }
    });
  }

  /**
   * Apply styles to buttons based on their position in the group
   */
  private applyStylesToButtons() {
    const buttons = this.buttons;
    const totalButtons = buttons.length;
    const isHorizontal = this.orientation === 'horizontal';

    // Apply styles to buttons
    buttons.forEach((button, index) => {
      // Reset all border radius custom properties
      button.style.removeProperty('--border-top-left-radius');
      button.style.removeProperty('--border-top-right-radius');
      button.style.removeProperty('--border-bottom-left-radius');
      button.style.removeProperty('--border-bottom-right-radius');
      button.style.removeProperty('margin-left');
      button.style.removeProperty('margin-top');

      // Apply styles based on position
      if (isHorizontal) {
        // Horizontal orientation
        if (index > 0) {
          // Not the first button
          button.style.setProperty('--border-top-left-radius', '0px');
          button.style.setProperty('--border-bottom-left-radius', '0px');
          button.style.marginLeft = '-1px';
        }

        if (index < totalButtons - 1) {
          // Not the last button
          button.style.setProperty('--border-top-right-radius', '0px');
          button.style.setProperty('--border-bottom-right-radius', '0px');
        }
      } else {
        // Vertical orientation
        if (index > 0) {
          // Not the first button
          button.style.setProperty('--border-top-left-radius', '0px');
          button.style.setProperty('--border-top-right-radius', '0px');
          button.style.marginTop = '-1px';
        }

        if (index < totalButtons - 1) {
          // Not the last button
          button.style.setProperty('--border-bottom-left-radius', '0px');
          button.style.setProperty('--border-bottom-right-radius', '0px');
        }
      }
    });
  }

  /**
   * Updates the properties and styles of all buttons in the group
   */
  private updateButtons() {
    this.applyPropertiesToButtons();
    this.applyStylesToButtons();
  }

  /**
   * Handle slot changes: update button list and styles
   */
  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._buttons = slot
      .assignedElements()
      .filter(
        (element) => element.tagName.toLowerCase() === 'plus-button'
      ) as HTMLElement[];
    this.updateButtons();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    this.updateButtons();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    // Initial update when connected to DOM
    requestAnimationFrame(() => this.updateButtons());
  }

  override render() {
    return html`
      <div
        class=${buttonGroupStyle({
          orientation: this.orientation,
          size: this.size,
          kind: this.kind,
          status: this.status,
          disabled: this.disabled,
          loading: this.loading,
        })}
        part="base"
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

export { PlusButtonGroup };
