import { tv } from 'tailwind-variants';

/**
 * Base styles for the button group component
 */
export const buttonGroupStyle = tv({
  base: [
    'plus-button-group inline-flex plus-ui-element',
    'gap-0',
  ],
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    kind: {
      filled: 'button-group-filled',
      outlined: 'button-group-outlined',
      dashed: 'button-group-dashed',
      text: 'button-group-text',
    },
    status: {
      default: 'button-group-default',
      primary: 'button-group-primary',
      success: 'button-group-success',
      warning: 'button-group-warning',
      danger: 'button-group-danger',
      info: 'button-group-info',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    loading: {
      true: 'opacity-50 cursor-wait',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
    kind: 'filled',
    status: 'default',
    disabled: false,
    loading: false,
  },
});
