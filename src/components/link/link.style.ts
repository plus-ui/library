import { tv } from 'tailwind-variants';

export const linkStyle = tv({
  base: [
    'link plus-ui-element',
    'font-normal appearance-none',
  ],
  variants: {
    size: {
      sm: 'small text-sm',
      md: 'medium text-base',
      lg: 'large text-lg',
      inherit: '',
    },
    disabled: {
      true: 'disabled text-color-disabled cursor-not-allowed',
    },
    readonly: {
      true: 'readonly text-color-caption cursor-default',
    },
    notAllowed: {
      true: '',
      false:
        'text-color-link visited:text-color-visited focus-visible:ring-default cursor-pointer',
    },
    underline: {
      hover: 'hover:underline',
      always: 'underline hover:underline',
      never: 'hover:underline-none',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
    readonly: false,
    underline: 'hover',
    notAllowed: false,
  },
});
