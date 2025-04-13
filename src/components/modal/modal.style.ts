import { tv } from 'tailwind-variants';

export const modalStyle = tv({
  slots: {
    base: ['plus-modal font-sans antialiased'],
    modalOverlay: [
      'modal-overlay fixed inset-0 z-40',
      'bg-color-overlay/50',
      'transition-opacity duration-300 ease-in-out',
    ],
    modalClass: [
      'modal fixed z-50 inset-0 overflow-y-auto',
      'flex items-center justify-center',
      'transition-all duration-300 ease-in-out',
      'w-full mx-auto h-fit mt-10',
    ],
    modalContainer: [
      'modal-container relative w-full',
      'bg-color-surface',
      'shadow-elevation-lg',
      'text-color-default',
      'flex flex-col',
      'rounded-lg max-h-[90vh] mx-4',
      'transform transition-all duration-300 ease-in-out',
    ],
    modalHeader: [
      'modal-header flex justify-between items-center',
      'py-3 px-4',
      'bg-color-base',
      'font-semibold text-lg',
      'rounded-t-lg',
      'border-b border-color-default',
    ],
    modalBody: [
      'modal-body flex-1 p-4',
      'overflow-y-auto',
    ],
    modalFooter: [
      'modal-footer flex justify-end items-center',
      'py-3 px-4 gap-2',
      'rounded-b-lg',
      'bg-color-surface',
      'border-t border-color-default',
    ],
    modalCloseButtonClass: [
      'modal-close-button absolute top-2 right-2 p-2',
      'text-color-default',
      'cursor-pointer',
      'hover:text-color-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-primary',
      'transition-colors duration-200 ease-in-out',
      'rounded-full hover:bg-color-default/10',
    ],
  },
  variants: {
    size: {
      sm: {
        modalClass: 'max-w-sm',
      },
      md: {
        modalClass: 'max-w-md',
      },
      lg: {
        modalClass: 'max-w-lg',
      },
      xl: {
        modalClass: 'max-w-xl',
      },
      '2xl': {
        modalClass: 'max-w-2xl',
      },
      full: {
        modalClass: 'max-w-[calc(100%-2rem)]',
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
        modalClass: 'max-w-[calc(100%-2rem)]',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isOpen: false,
    fullWidth: false,
  },
});
