import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { baseButtonGroupStyle } from './button-group.style';
import Tailwind from '../base/tailwind-base';

/**
 * Orientation type for button group
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Button group component that allows grouping related buttons together.
 *
 * @element plus-button-group
 *
 * @slot - The default slot for the buttons.
 *
 * @cssproperty --button-group-gap - Gap between buttons in the group.
 */
export default class PlusButtonGroup extends Tailwind {
  /**
   * The orientation of the button group.
   */
  @property({ type: String, reflect: true })
  orientation: Orientation = 'horizontal';
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
  @property({ type: Boolean })
  disabled = false;

  /**
   * Shows loading spinner and disables interaction
   * @default false
   */
  @property({ type: Boolean })
  loading = false;

  // Cache for the buttons to avoid re-querying the DOM
  private _buttons: HTMLElement[] | null = null;

  // Flag to determine if buttons need style update
  private _needsStyleUpdate = true;

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
    // Use cached buttons if available and slot hasn't changed
    if (this._buttons !== null) {
      return this._buttons;
    }

    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];

    this._buttons = slot
      .assignedElements()
      .filter(
        (element) => element.tagName.toLowerCase() === 'plus-button'
      ) as HTMLElement[];

    return this._buttons;
  }

  /**
   * Apply shared properties to buttons in the group
   */
  private applyPropertiesToButtons() {
    const isVertical = this.orientation === 'vertical';

    this.buttons.forEach((button) => {
      // Apply properties directly to buttons
      if (this.disabled) {
        button.setAttribute('disabled', '');
      }

      if (this.size && !button.hasAttribute('size')) {
        button.setAttribute('size', this.size);
      }

      if (this.kind && !button.hasAttribute('kind')) {
        button.setAttribute('kind', this.kind);
      }

      if (this.status && !button.hasAttribute('status')) {
        button.setAttribute('status', this.status);
      }

      // Set full-width attribute on buttons when orientation is vertical
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
    if (!this._needsStyleUpdate) return;

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

    this._needsStyleUpdate = false;
  }

  /**
   * Updates the properties and styles of all buttons in the group
   */
  private updateButtons() {
    this.applyPropertiesToButtons();
    this.applyStylesToButtons();
  }

  /**
   * Handle slot changes: reset button cache and update styles
   */
  private handleSlotChange() {
    this._buttons = null;
    this._needsStyleUpdate = true;
    this.updateButtons();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // Only trigger style recalculation if relevant properties changed
    if (changedProperties.has('orientation')) {
      this._needsStyleUpdate = true;
    }

    this.updateButtons();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    // Initial update when connected to DOM
    setTimeout(() => this.updateButtons(), 0);
  }

  override render() {
    const { base } = baseButtonGroupStyle({ orientation: this.orientation });

    return html`
      <div class=${base()} part="base">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

export { PlusButtonGroup };
