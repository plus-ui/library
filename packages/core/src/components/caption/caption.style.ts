import { tv } from 'tailwind-variants';

export const captionStyle = tv({
  base: 'block plus-ui-element font-normal text-color-caption',
  variants: {
    error: {
      true: 'text-color-danger',
      false: '',
    },
    size: {
      sm: 'text-xs h-4',
      md: 'text-sm h-5',
      lg: 'text-base h-6',
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
