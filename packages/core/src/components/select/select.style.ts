import { tv } from 'tailwind-variants';

export const selectStyle = tv({
  base: [
    'select-box antialiased flex flex-col max-h-80 absolute z-50 w-auto  shadow-lg overflow-y-auto bg-color-surface',
  ],
  variants: {
    isOpen: {
      true: '',
      false: 'hidden',
    },
    fullWidth: {
      true: 'w-full max-w-full',
      false: 'max-w-80',
    },
  },
});
