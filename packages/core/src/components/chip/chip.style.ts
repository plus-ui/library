import { tv } from 'tailwind-variants';

export const chipStyle = tv({
  slots: {
    base: [
      'chip antialiased',
      'font-sans font-normal',
      'inline-flex items-center justify-center',
      'border',
    ],
    icon: ['icon'],
  },
  variants: {
    size: {
      sm: 'small py-0.5 px-1 text-xs gap-1',
      md: 'medium py-1 px-1.5 text-sm gap-1.5',
      lg: 'large py-1.5 px-2 text-base gap-2',
    },
    kind: {
      filled: 'filled',
      outlined: 'outlined',
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
        base: [
          'disabled cursor-not-allowed',
          'bg-color-disabled text-color-disabled border-color-disabled',
        ],
        icon: [''],
      },
      false: {
        base: [
          'text-color-dynamic',
          'border-color-dynamic',
          'bg-color-dynamic-default',
          'hover:bg-color-dynamic-hovered',
          'active:bg-color-dynamic-pressed',
          'focus-visible:bg-color-dynamic-focused',
          'focus-visible:ring-default',
        ],
        icon: ['cursor-pointer'],
      },
    },
    type: {
      avatar: '',
      default: '',
    },
    shape: {
      full: 'full-rounded rounded-full',
      rounded: 'rounded rounded-md',
    },
  },
  defaultVariants: {
    size: 'md',
    kind: 'filled',
    type: 'default',
    disabled: false,
    shape: 'full',
    status: 'default',
  },
});
