import { tv } from 'tailwind-variants';

export const drawerStyle = tv({
  slots: {
    base: ['plus-drawer font-sans antialiased'],
    drawerOverlay: [
      'drawer-overlay fixed inset-0 z-40 bg-black/50',
      'transition-opacity duration-300 ease-in-out',
    ],
    drawerClass: [
      'drawer fixed z-50 h-full overflow-y-auto',
      'transition-all duration-300 ease-in-out',
    ],
    drawerContainer: [
      'drawer-container relative w-full h-full bg-color-surface shadow-xl text-base flex flex-col justify-between',
    ],
    drawerHeader: [
      'drawer-header flex justify-between items-center py-3 px-4 bg-color-base font-semibold text-lg rounded-t-lg border-b border-color-default',
    ],
    drawerBody: ['drawer-body flex-1 p-4'],
    drawerFooter: [
      'drawer-footer flex justify-end items-center py-3 px-4 gap-2 rounded-b-lg',
    ],
    drawerCloseButtonClass: [
      'drawer-close-button absolute top-0 right-0 p-3 text-color-default',
      'hover:text-color-primary transition-colors duration-200 ease-in-out',
    ],
  },
  variants: {
    size: {
      xs: {
        base: [],
        drawerContainer: [],
      },
      sm: {
        base: [],
        drawerContainer: [],
      },
      md: {
        base: [],
        drawerContainer: [],
      },
      lg: {
        base: [],
        drawerContainer: [],
      },
    },
    isOpen: {
      true: {
        drawerClass: ['block'],
        drawerOverlay: [
          'opacity-100 pointer-events-auto',
        ],
      },
      false: {
        drawerClass: ['pointer-events-none'],
        drawerOverlay: [
          'opacity-0 pointer-events-none',
        ],
      },
    },
    orientation: {
      left: {
        drawerClass: [
          'h-full max-w-lg inset-y-0 left-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
        drawerContainer: 'overflow-y-auto',
      },
      right: {
        drawerClass: [
          'h-full max-w-lg inset-y-0 right-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
        drawerContainer: 'overflow-y-auto',
      },
      top: {
        drawerClass: [
          'h-96 w-full inset-x-0 top-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
        drawerContainer: 'overflow-x-auto',
      },
      bottom: {
        drawerClass: [
          'bottom-0 h-96 w-full inset-x-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
        drawerContainer: 'overflow-x-auto',
      },
    },
  },
  compoundVariants: [
    // Açık/kapalı ve yönlendirme kombinasyonları için özel animasyonlar
    {
      isOpen: true,
      orientation: 'left',
      class: {
        drawerClass: 'translate-x-0',
      },
    },
    {
      isOpen: false,
      orientation: 'left',
      class: {
        drawerClass: '-translate-x-full',
      },
    },
    {
      isOpen: true,
      orientation: 'right',
      class: {
        drawerClass: 'translate-x-0',
      },
    },
    {
      isOpen: false,
      orientation: 'right',
      class: {
        drawerClass: 'translate-x-full',
      },
    },
    {
      isOpen: true,
      orientation: 'top',
      class: {
        drawerClass: 'translate-y-0',
      },
    },
    {
      isOpen: false,
      orientation: 'top',
      class: {
        drawerClass: '-translate-y-full',
      },
    },
    {
      isOpen: true,
      orientation: 'bottom',
      class: {
        drawerClass: 'translate-y-0',
      },
    },
    {
      isOpen: false,
      orientation: 'bottom',
      class: {
        drawerClass: 'translate-y-full',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    isOpen: false,
    orientation: 'right',
  },
});
