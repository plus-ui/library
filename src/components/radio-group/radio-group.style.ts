import { tv } from 'tailwind-variants';

export const radioGroupStyle = tv({
  slots: {
    base: 'flex',
  },
  variants: {
    orientation: {
      horizontal: { base: 'flex-row gap-4' },
      vertical: { base: 'flex-col' },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
