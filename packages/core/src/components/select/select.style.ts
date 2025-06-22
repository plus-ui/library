import { tv } from 'tailwind-variants';

export const selectStyle = tv({
  base: [
    'select-box antialiased flex flex-col max-w-80 max-h-80 absolute z-10 w-auto  shadow-lg overflow-y-auto',
  ],
  variants: {
    isOpen: {
      true: '',
      false: 'hidden',
    },
  },
});
