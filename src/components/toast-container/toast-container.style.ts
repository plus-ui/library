import { tv } from 'tailwind-variants';

export const toastContainerStyle = tv({
  slots: {
    base: [
      'plus-container fixed w-fit flex flex-col gap-2 z-10',
    ],
  },
  variants: {
    position: {
      'top-left': {
        base: ['top-5 left-5 items-start'],
      },
      'top-right': {
        base: ['top-5 right-5 items-end'],
      },
      'bottom-left': {
        base: ['bottom-5 left-5 items-start'],
      },
      'bottom-right': {
        base: ['bottom-5 right-5 items-end'],
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    position: 'top-right',
  },
});
