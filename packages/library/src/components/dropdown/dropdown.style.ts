import { tv } from 'tailwind-variants';

export const dropdownStyle = tv({
  base: [
    'dropdown-box antialiased flex flex-col max-w-80 max-h-80 absolute z-10 w-full shadow-lg overflow-y-auto',
  ],
  variants: {
    isOpen: {
      true: '',
      false: 'hidden',
    },
  },
});
