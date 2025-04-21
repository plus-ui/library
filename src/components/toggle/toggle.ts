import { property, query, state } from 'lit/decorators.js';
import { html, css } from 'lit';
import { live } from 'lit/directives/live.js';
import Tailwind from '../base/tailwind-base';
import { captionStyle } from '../caption/caption.style';
import { labelStyle } from '../label/label.style';
import { toggleStyle } from './toggle.style';
import '../svg-icon/index.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @tag plus-toggle
 * @summary Toggle component that provides a switch with various styles and states.
 *
 * @slot - The default slot for toggle text content when no text property is specified
 *
 * @csspart base - The component's base wrapper
 * @csspart label - The label element
 * @csspart control - The control element containing the toggle and text
 * @csspart switch - The switch element
 * @csspart dot - The dot element inside the switch
 * @csspart text - The text element
 * @csspart icon - The icon element when an icon is used
 * @csspart caption - The caption element
 *
 * @cssproperty --text-color - Controls the text color
 * @cssproperty --border-color - Controls the border color of the toggle
 * @cssproperty --switch-bg - Controls the background color of the switch
 * @cssproperty --switch-bg-hover - Controls the background color when hovered
 * @cssproperty --switch-bg-active - Controls the background color when pressed
 * @cssproperty --dot-bg - Controls the background color of the dot
 * @cssproperty --dot-text - Controls the text color of the icon in the dot
 *
 * @event plus-change - Emitted when the toggle state changes
 * @event plus-input - Emitted when the toggle state changes (for input event compatibility)
 * @event plus-focus - Emitted when the toggle gains focus
 * @event plus-blur - Emitted when the toggle loses focus
 * @event plus-invalid - Emitted when the toggle validation fails
 *
 * @example
 * ```html
 * <plus-toggle label="Dark Mode" size="md">Enable dark mode</plus-toggle>
 * ```
 */
export class PlusToggle extends Tailwind {
  static formAssociated = true;
  @state() private internals!: ElementInternals;

  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 256px;
      }

      :host([full-width]) {
        max-width: none;
      }
    `,
  ];

  @query('#input') input!: HTMLInputElement;

  @state() private hasFocus = false;
  @state() private validationMessage = '';

  @property({ type: String }) name = '';
  @property({ type: String }) value = 'on';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String }) label?: string;
  @property({ type: String }) caption?: string;
  @property({ type: String }) text?: string;
  @property({ type: String, reflect: true, attribute: 'text-position' })
  textPosition: 'left' | 'right' = 'right';
  @property({ type: String, attribute: 'toggle-icon' }) toggleIcon?: string;
  @property({ type: String, attribute: 'toggle-active-icon' })
  toggleActiveIcon?: string;
  @property({ type: String, attribute: 'toggle-inactive-icon' })
  toggleInActiveIcon?: string;
  @property({ type: Number, attribute: 'icon-size' }) iconSize?: number;

  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;
  @property({ type: String, attribute: 'animation' })
  animation: 'default' | 'bounce' | 'smooth' = 'default';
  @property({ type: String, attribute: 'custom-aria-label' })
  customAriaLabel?: string;

  constructor() {
    super();
    if (this.attachInternals) {
      this.internals = this.attachInternals();
    } else {
      console.warn(
        'ElementInternals not supported in this browser for plus-toggle.'
      );
    }

    this.addEventListener('click', (event) => {
      if (event.target === this) {
        event.stopPropagation();
      }
    });
  }

  /**
   * Checks the validity of the toggle input
   * @returns True if the toggle is valid, false otherwise
   */
  public checkValidity(): boolean {
    if (!this.input) return true;
    const valid = this.input.checkValidity();
    return valid;
  }

  /**
   * Reports the validity of the toggle input
   * @returns True if the toggle is valid, false otherwise
   */
  public reportValidity(): boolean {
    if (!this.input) return true;
    const valid = this.input.reportValidity();
    if (!valid) {
      this.error = true;
      this.validationMessage =
        this.input.validationMessage || this.errorMessage;
      this.emit('plus-invalid', {
        detail: { message: this.validationMessage },
      });
    } else {
      this.error = false;
      this.validationMessage = '';
    }
    return valid;
  }

  /**
   * Sets a custom validity message for the toggle
   * @param message The custom validity message
   */
  public setCustomValidity(message: string): void {
    if (this.input) {
      this.input.setCustomValidity(message);
      this.validationMessage = message;
    }
  }

  private setFormValue() {
    if (this.internals) {
      this.internals.setFormValue(
        this.checked ? this.value : null,
        this.checked ? 'checked' : undefined
      );
    }
  }

  override updated(
    changedProperties: Map<string | symbol, unknown> | PropertyValues<this>
  ) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this.setFormValue();
    }
    if (this.input) {
      if (
        changedProperties.has('disabled') ||
        changedProperties.has('readonly')
      ) {
        this.input.disabled = this.disabled || this.readonly;
      }
      if (changedProperties.has('required')) {
        this.input.required = this.required;
      }
    }
  }

  formResetCallback() {
    const initialChecked = this.hasAttribute('checked');
    this.checked = initialChecked;
    this.setFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('plus-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('plus-focus');
  }

  /**
   * Gets the validation message for the toggle
   * @returns {string} The validation message
   * @private
   */
  private getValidationMessage(): string {
    const validity = this.input.validity;

    if (validity.valueMissing) {
      return 'This field is required';
    }

    return (
      this.input.validationMessage ||
      this.errorMessage ||
      'Please correct the error'
    );
  }

  // /**
  //  * Update the animation class name based on the animation type
  //  * @private
  //  */
  // private getAnimationClass(): string {
  //   switch (this.animation) {
  //     case 'bounce':
  //       return 'transition-all duration-400 ease-bounce';
  //     case 'smooth':
  //       return 'transition-all duration-500 ease-in-out';
  //     case 'default':
  //     default:
  //       return 'transition-all duration-300 ease-in-out';
  //   }
  // }

  /**
   * Validates the toggle input
   * @private
   */
  private validate() {
    const isValid = this.input.checkValidity();
    const validationMessage = this.getValidationMessage();

    this.validationMessage = validationMessage;
    this.error = !isValid;
  }

  /**
   * Called when the input is invalid
   * @param {Event} event The event object
   * @private
   */
  private handleInvalid(event: Event) {
    // Prevent the browser's default validation UI
    event.preventDefault();

    // Get validity state and message directly from the native input
    const isValid = this.input.validity.valid;
    const validationMessage = this.getValidationMessage();

    // Update component state
    this.validationMessage = validationMessage;
    this.error = !isValid;

    // Emit the custom invalid event if the input is truly invalid
    if (!isValid) {
      this.emit('plus-invalid', { detail: { validationMessage } });
    }
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.disabled || this.readonly) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.checked = target.checked;
    this.setFormValue();
    this.emit('plus-change');
    this.emit('plus-input');

    // Validate after change if required
    if (this.required) {
      this.validate();
    }
  }

  private handleControlClick(event: MouseEvent) {
    // Don't handle events on the input element, as input is already handled by @change
    if ((event.target as HTMLElement).id === 'input') return;

    if (this.disabled || this.readonly) return;

    // Forward the click event to the input
    this.input?.click();
  }

  override click() {
    if (!this.disabled && !this.readonly) {
      this.input?.click();
    }
  }

  override focus(options?: FocusOptions) {
    this.input?.focus(options);
  }

  override blur() {
    this.input?.blur();
  }

  getToggleIcon() {
    const {
      checked,
      toggleIcon,
      toggleActiveIcon,
      toggleInActiveIcon,
      iconSize,
    } = this;
    const { icon: iconCls } = toggleStyle({ checked });
    let iconName = '';
    if (checked && toggleActiveIcon) {
      iconName = toggleActiveIcon;
    } else if (!checked && toggleInActiveIcon) {
      iconName = toggleInActiveIcon;
    } else if (toggleIcon) {
      iconName = toggleIcon;
    }
    return iconName
      ? html`<plus-icon
          part="icon"
          class=${iconCls()}
          iconName=${iconName}
          size=${ifDefined(iconSize)}
        ></plus-icon>`
      : '';
  }

  override render() {
    const {
      label,
      hasFocus,
      error,
      disabled,
      caption,
      value,
      checked,
      name,
      required,
      textPosition,
      text,
      readonly,
      size,
      fullWidth,
      customAriaLabel,
      validationMessage,
      animation,
    } = this;

    // Default colors based on state
    const defaultStyles = {
      '--i-text-color': 'var(--plus-color-text-default)',
      '--i-border-color': 'transparent',
      '--i-switch-bg': 'var(--plus-color-background-default-invert-default)',
      '--i-switch-bg-hover':
        'var(--plus-color-background-default-invert-hovered)',
      '--i-switch-bg-active':
        'var(--plus-color-background-default-invert-pressed)',
      '--i-dot-bg': 'var(--plus-color-background-default-default)',
      '--i-dot-text': 'var(--plus-color-text-caption)',
    };

    // Checked state styles
    const checkedStyles = {
      '--i-switch-bg': 'var(--plus-color-background-primary-default)',
      '--i-switch-bg-hover': 'var(--plus-color-background-primary-hovered)',
      '--i-switch-bg-active': 'var(--plus-color-background-primary-pressed)',
      '--i-dot-text': 'var(--plus-color-text-primary)',
    };

    // Error state styles
    const errorStyles = {
      // '--i-border-color': 'var(--plus-color-border-danger)',
      '--i-switch-bg': 'var(--plus-color-background-danger-default)',
      '--i-switch-bg-hover': 'var(--plus-color-background-danger-hovered)',
      '--i-switch-bg-active': 'var(--plus-color-background-danger-pressed)',
      // '--i-dot-text': 'var(--plus-color-text-danger)',
    };

    // Readonly state styles
    const readonlyStyles = {
      '--i-border-color': 'var(--plus-color-border-default)',
      '--i-switch-bg': 'var(--plus-color-background-default-default)',
      '--i-dot-bg': 'var(--plus-color-background-default-invert-default)',
    };

    // Disabled state styles
    const disabledStyles = {
      '--i-text-color': 'var(--plus-color-text-disabled)',
      '--i-switch-bg': 'var(--plus-color-background-disabled)',
      '--i-border-color': 'var(--plus-color-border-disabled)',
      '--i-dot-bg': 'var(--plus-color-background-disabled)',
    };

    // Set the appropriate styles based on component state
    let stateStyles = defaultStyles;
    if (disabled) {
      stateStyles = { ...stateStyles, ...disabledStyles };
      if (checked) {
        stateStyles = {
          ...stateStyles,
          '--i-switch-bg': 'var(--plus-color-background-primary-default)',
          '--i-dot-bg': 'var(--plus-color-background-default-default)',
        };
      }
    } else if (readonly) {
      stateStyles = { ...stateStyles, ...readonlyStyles };
    } else if (error) {
      stateStyles = { ...stateStyles, ...errorStyles };
    } else if (checked) {
      stateStyles = { ...stateStyles, ...checkedStyles };
    }

    // Dynamic styles to allow custom CSS variable overrides
    const dynamicStyles = {
      '--d-text': 'var(--text-color, var(--i-text-color))',
      '--d-border': 'var(--border-color, var(--i-border-color))',
      '--d-switch-bg': 'var(--switch-bg, var(--i-switch-bg))',
      '--d-switch-bg-hover': 'var(--switch-bg-hover, var(--i-switch-bg-hover))',
      '--d-switch-bg-active':
        'var(--switch-bg-active, var(--i-switch-bg-active))',
      '--d-dot-bg': 'var(--dot-bg, var(--i-dot-bg))',
      '--d-dot-text': 'var(--dot-text, var(--i-dot-text))',
    };

    const {
      base,
      control,
      inputElement,
      switch: switchCls,
      text: textCls,
      dot,
    } = toggleStyle({
      focus: hasFocus,
      error,
      disabled,
      checked,
      readonly,
      size,
      fullWidth,
      animation,
    });

    const LabelTemplate = () =>
      label
        ? html`<label
            part="label"
            for="input"
            class=${labelStyle({ required, size })}
            @click=${this.focus}
            >${label}</label
          >`
        : null;
    const CaptionTemplate = () =>
      caption || (error && validationMessage)
        ? html`<div part="caption" class=${captionStyle({ error, size })}>
            ${error && validationMessage ? validationMessage : caption}
          </div>`
        : null;

    const switchContent = html`
      <div part="switch" class=${switchCls()} aria-hidden="true">
        <div part="dot" class=${dot()}>${this.getToggleIcon()}</div>
      </div>
    `;

    const textContent = html`
      <span part="text" class=${textCls()}>${text ?? html`<slot></slot>`}</span>
    `;

    return html`<div
      class=${base()}
      part="base"
      style=${styleMap({ ...stateStyles, ...dynamicStyles })}
    >
      ${LabelTemplate()}
      <div class=${control()} part="control" @click=${this.handleControlClick}>
        <input
          id="input"
          class=${inputElement()}
          type="checkbox"
          role="switch"
          name=${ifDefined(name)}
          value=${ifDefined(value)}
          .checked=${live(checked)}
          ?disabled=${disabled || readonly}
          ?required=${required}
          aria-checked=${checked ? 'true' : 'false'}
          aria-disabled=${disabled || readonly ? 'true' : 'false'}
          aria-invalid=${error ? 'true' : 'false'}
          aria-label=${label
            ? undefined
            : customAriaLabel || (text ? text : 'Toggle')}
          aria-labelledby=${label ? 'label' : undefined}
          aria-describedby=${caption || validationMessage
            ? 'caption'
            : undefined}
          @change=${this.handleChange}
          @invalid=${this.handleInvalid}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${(e: MouseEvent) => e.stopPropagation()}
        />
        ${textPosition === 'left' ? textContent : switchContent}
        ${textPosition === 'left' ? switchContent : textContent}
      </div>
      ${CaptionTemplate()}
    </div>`;
  }
}
