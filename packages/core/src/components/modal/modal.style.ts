import { tv } from 'tailwind-variants';

export const modalStyle = tv({
  slots: {
    dialog: [
      'plus-modal fixed inset-0 m-0 p-0 w-full max-w-full h-full max-h-full',
      'border-none bg-transparent',
      'backdrop:bg-color-overlay/50',
      'backdrop:transition-opacity backdrop:duration-300',
    ],
    container: [
      'fixed inset-0 flex items-start justify-center p-4',
      'overflow-y-auto overscroll-contain',
    ],
    modal: [
      'relative bg-color-surface text-color-default',
      'rounded-lg shadow-elevation-lg',
      'transform transition-all duration-300 ease-in-out',
      'flex flex-col',
    ],
    header: [
      'flex justify-between items-start',
      'py-3 px-4',
      'bg-color-base text-color-default',
      'font-semibold text-lg',
      'rounded-t-lg',
      'border-b border-color-disabled',
    ],
    headerContent: [
      'flex-1 min-w-0 flex items-center gap-2',
    ],
    body: ['flex-1 p-4', 'overflow-y-auto'],
    footer: [
      'flex justify-end items-center',
      'py-3 px-4 gap-2',
      'rounded-b-lg',
      'bg-color-surface',
      'border-t border-color-disabled',
    ],
    closeButton: [
      'absolute top-1.5 right-2 p-2',
      'text-color-default',
      'cursor-pointer',
      'hover:text-color-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-primary',
      'transition-colors duration-200 ease-in-out',
      'rounded-full hover:bg-color-default/10',
      'bg-transparent border-none',
      'flex items-center justify-center',
      'w-10 h-10',
    ],
  },
  variants: {
    size: {
      sm: {
        modal: 'max-w-sm',
      },
      md: {
        modal: 'max-w-md',
      },
      lg: {
        modal: 'max-w-lg',
      },
      xl: {
        modal: 'max-w-xl',
      },
      '2xl': {
        modal: 'max-w-2xl',
      },
      full: {
        modal: 'max-w-[calc(100%-2rem)]',
      },
    },
    open: {
      true: {
        modal:
          'opacity-100 translate-y-0 scale-100',
      },
      false: {
        modal:
          'opacity-0 -translate-y-4 scale-95',
      },
    },
    placement: {
      center: {
        container: 'items-center',
      },
      top: {
        container: 'items-start pt-20',
      },
    },
    fullWidth: {
      true: {
        modal: 'max-w-[calc(100%-2rem)] w-full',
      },
    },
    fullScreen: {
      true: {
        modal:
          'rounded-none w-screen h-screen max-w-none max-h-none',
        container: 'p-0',
      },
    },
    shake: {
      true: {
        modal: 'animate-shake',
      },
    },
    noHeader: {
      true: {
        header: 'hidden',
      },
    },
    noFooter: {
      true: {
        footer: 'hidden',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    open: false,
    placement: 'center',
    fullWidth: false,
    fullScreen: false,
    shake: false,
    noHeader: false,
    noFooter: false,
  },
});
