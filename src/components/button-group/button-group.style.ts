import { tv } from 'tailwind-variants';

/**
 * Base styles for the button group component
 */
export const baseButtonGroupStyle = tv({
  slots: {
    base: ['inline-flex', 'plus-ui-element'],
  },
  variants: {
    orientation: {
      horizontal:
        'flex-row button-group-horizontal',
      vertical: 'flex-col button-group-vertical',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
