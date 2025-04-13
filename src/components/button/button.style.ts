import { tv } from 'tailwind-variants';

export const baseButtonStyle = tv({
  slots: {
    base: [
      'button plus-button plus-ui-element',
      'inline-flex items-center justify-center',
      'rounded-default',
      'border',

      'text-(--d-text)',
      'border-(--d-border)',
      'bg-(--d-bg-default)',
      'enabled:hover:bg-(--d-bg-hovered)',
      'enabled:active:bg-(--d-bg-pressed)',
      'focus-visible:bg-(--d-bg-focused)',
      'focus-visible:ring-default',
    ],
    loading: [
      'loading cursor-not-allowed relative',
    ],
  },
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
      true: {
        base: ['disabled cursor-not-allowed'],
      },
      false: {
        base: ['cursor-pointer'],
      },
    },
    loading: {
      false: '',
      true: 'loading cursor-not-allowed relative overflow-hidden',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    size: 'md',
    kind: 'filled',
    status: 'default',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
});
