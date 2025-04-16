import { tv } from 'tailwind-variants';

export const captionStyle = tv({
  base: 'block plus-ui-element font-normal text-color-caption',
  variants: {
    error: {
      true: 'text-color-danger',
      false: '',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    disabled: {
      true: {
        base: 'text-color-disabled',
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    error: false,
    size: 'md',
    disabled: false,
  },
});
