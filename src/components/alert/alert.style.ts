import { tv } from 'tailwind-variants';

export const alertStyle = tv({
  slots: {
    base: [
      'alert font-sans',
      'text-[var(--text-color,var(--i-text-color))]',
      'border-color-dynamic',
      'bg-color-dynamic-default',
    ],
    statusIcon: 'status-icon',
    content: 'content',
    label: 'label',
    description: 'description',
    dismiss: 'dismiss',
  },
  variants: {
    kind: {
      filled: 'filled',
      outlined: 'outlined',
      dashed: 'dashed border-dashed',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    status: {
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info',
    },
    invert: {
      true: '',
      false: '',
    },
    dismissible: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    kind: 'filled',
    status: 'info',
    invert: false,
    dismissible: true,
  },
});
