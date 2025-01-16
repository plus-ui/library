import { tv } from 'tailwind-variants';

export const baseButtonStyle = tv({
  base: [
    'button font-sans',
    'inline-flex items-center justify-center',
    'rounded-default',
    'border',

    'text-color-dynamic',
    'border-color-dynamic',

    '       bg-color-dynamic-default',
    ' hover:bg-color-dynamic-hovered',
    'active:bg-color-dynamic-pressed',
    ' focus:bg-color-dynamic-focused',
  ],

  variants: {
    size: {
      sm: 'small text-sm p-2 gap-2',
      md: 'medium text-base px-3 py-2 gap-2.5',
      lg: 'large text-lg px-4 py-2 gap-3',
    },
    kind: {
      filled: 'filled',
      outlined: 'outlined',
      dashed: 'dashed border-dashed',
      text: 'text',
    },
    status: {
      default: 'default',
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info',
    },
    disabled: {
      false: 'cursor-pointer',
      true: 'disabled',
    },
    loading: {
      false: '',
      true: 'loading',
    },
  },
  defaultVariants: {
    size: 'md',
    kind: 'filled',
    status: 'default',
    disabled: false,
    loading: false,
  },
});