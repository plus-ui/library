import { tv } from 'tailwind-variants';

export const modalStyle = tv({
  slots: {
    base: ['plus-modal font-sans antialiased'],
    modalOverlay: [
      'modal-overlay fixed inset-0 z-40 bg-black/50',
      'transition-opacity duration-300 ease-in-out',
    ],
    modalClass: [
      'modal fixed z-50 inset-0 overflow-y-auto',
      'flex items-center justify-center',
      'transition-all duration-300 ease-in-out',
    ],
    modalContainer: [
      'modal-container relative w-full bg-color-surface shadow-xl text-base flex flex-col',
      'rounded-lg max-h-[90vh] mx-4',
      'transform transition-all duration-300 ease-in-out',
    ],
    modalHeader: [
      'modal-header flex justify-between items-center py-3 px-4 bg-color-base font-semibold text-lg rounded-t-lg border-b border-color-default',
    ],
    modalBody: [
      'modal-body flex-1 p-4 overflow-y-auto',
    ],
    modalFooter: [
      'modal-footer flex justify-end items-center py-3 px-4 gap-2 rounded-b-lg bg-color-surface border-t border-color-default',
    ],
    modalCloseButtonClass: [
      'modal-close-button absolute top-2 right-2 p-2 text-color-default',
      'hover:text-color-primary transition-colors duration-200 ease-in-out',
      'rounded-full hover:bg-color-default/10',
    ],
  },
  variants: {
    size: {
      sm: {
        modalContainer: 'max-w-sm',
      },
      md: {
        modalContainer: 'max-w-md',
      },
      lg: {
        modalContainer: 'max-w-lg',
      },
      xl: {
        modalContainer: 'max-w-xl',
      },
      '2xl': {
        modalContainer: 'max-w-2xl',
      },
      full: {
        modalContainer: 'max-w-[calc(100%-2rem)]',
      },
    },
    isOpen: {
      true: {
        modalClass:
          'opacity-100 pointer-events-auto',
        modalOverlay:
          'opacity-100 pointer-events-auto',
        modalContainer: 'scale-100 opacity-100',
      },
      false: {
        modalClass:
          'opacity-0 pointer-events-none',
        modalOverlay:
          'opacity-0 pointer-events-none',
        modalContainer: 'scale-95 opacity-0',
      },
    },

    fullWidth: {
      true: {
        modalContainer: 'max-w-[calc(100%-2rem)]',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isOpen: false,
    fullWidth: false,
  },
});
