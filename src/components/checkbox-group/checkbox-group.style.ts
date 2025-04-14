import { tv } from 'tailwind-variants';

export const checkboxGroupStyle = tv({
  slots: {
    base: [
      'plus-checkbox-group',
      'flex w-full relative gap-0.5',
    ],
  },
  variants: {
    vertical: {
      true: {
        base: 'flex-col items-start',
      },
      false: {
        base: 'flex-row items-center flex-wrap',
      },
    },
  },
  compoundVariants: [
    {
      vertical: false,
      class: {
        base: 'gap-x-5 gap-y-2',
      },
    },
    {
      vertical: true,
      class: {
        base: 'gap-2',
      },
    },
  ],
  defaultVariants: {
    vertical: false,
  },
});
