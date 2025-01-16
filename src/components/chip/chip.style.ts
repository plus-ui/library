import { tv } from 'tailwind-variants';

export const chipStyle = tv({
  base: [
    'antialiased font-sans box-content select-none',
    'inline-flex items-center justify-center font-normal',

    'text-color-dynamic',
    'border-color-dynamic',

    '       bg-color-dynamic-default',
    ' hover:bg-color-dynamic-hovered',
    'active:bg-color-dynamic-pressed',
    ' focus:bg-color-dynamic-focused',
  ],
  variants: {
    size: {
      sm: 'py-0.5 px-1.5 text-xs gap-1',
      md: 'py-1 px-2 text-sm gap-1.5',
      lg: 'py-1.5 px-2.5 text-base gap-2',
    },
    kind: {
      filled: '',
      outlined: 'border',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
    type: {
      avatar: '',
      default: '',
    },
    shape: {
      full: 'rounded-full',
      rounded: 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'md',
    kind: 'filled',
    type: 'default',
    disabled: false,
    shape: 'full',
  },
});
