import { tv } from 'tailwind-variants';

export const alertStyle = tv({
  slots: {
    base: [
      'alert plus-ui-element',
      'flex items-start justify-between',
      'w-full rounded',
      'bg-[var(--bg-color,var(--i-bg-color))]',
      'border-[var(--border-color,var(--i-border-color))] border border-solid',
      'transition-all duration-200 ease-out',
      'opacity-100 transform scale-100',
      'motion-reduce:transition-none',
    ],
    statusIcon:
      'status-icon text-[var(--icon-color,var(--i-icon-color))] ',
    content:
      'content-area flex flex-col gap-2 flex-1',
    message:
      'message block font-medium text-[var(--message-color,var(--i-message-color))] ',
    description:
      'description block font-normal text-[var(--description-color,var(--i-description-color))] empty:hidden',
    dismiss:
      'dismiss flex items-center justify-center text-[var(--dismiss-color,var(--i-dismiss-color))] w-[1em] cursor-pointer',
  },
  variants: {
    kind: {
      filled: 'filled',
      outlined: 'outlined',
      dashed: 'dashed border-dashed',
    },
    size: {
      sm: {
        base: 'p-3 gap-2',
        content: 'gap-2',
        icon: 'text-sm',
        message: 'text-sm',
        description: 'text-xs',
        dismiss: 'text-sm',
      },
      md: {
        base: 'p-3.5 gap-2.5',
        content: 'gap-2.5',
        icon: 'text-base',
        message: 'text-base ',
        description: 'text-sm',
        dismiss: 'text-base',
      },
      lg: {
        base: 'p-4 gap-3',
        content: 'gap-3',
        icon: 'text-lg',
        message: 'text-lg',
        description: 'text-lg',
      },
    },
    status: {
      default: 'default',
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
    hidden: {
      true: 'hidden',
    },
  },
  defaultVariants: {
    size: 'md',
    kind: 'filled',
    status: 'info',
    invert: false,
    dismissible: true,
    hidden: false,
  },
});
