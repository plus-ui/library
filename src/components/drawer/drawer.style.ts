import { tv } from 'tailwind-variants';

export const drawerStyle = tv({
  slots: {
    base: ['plus-drawer font-sans antialiased'],
    drawerOverlay: [
      'drawer-overlay fixed inset-0 z-40',
      'bg-color-overlay/50',
      'transition-opacity duration-300 ease-in-out',
    ],
    drawerClass: [
      'drawer fixed z-50 h-full overflow-y-auto',
      'transition-all duration-300 ease-in-out',
      // 'max-w-96 w-full',
    ],
    drawerContainer: [
      'drawer-container relative w-full h-full',
      'bg-color-surface',
      'shadow-elevation-lg',
      'text-color-default',
      'flex flex-col justify-between',
    ],
    drawerHeader: [
      'drawer-header flex justify-between items-center',
      'py-3 px-4',
      'bg-color-base',
      'font-semibold',
      'rounded-t-lg',
      'border-b border-color-default',
    ],
    drawerBody: [
      'drawer-body flex-1 p-4',
      'overflow-y-auto',
    ],
    drawerFooter: [
      'drawer-footer flex justify-end items-center',
      'py-3 px-4 gap-2',
      'rounded-b-lg',
      'border-t border-color-default',
    ],
    drawerCloseButtonClass: [
      'drawer-close-button absolute top-0 right-0 p-3',
      'text-color-default',
      'cursor-pointer',
      'hover:text-color-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-primary',
      'transition-colors duration-200 ease-in-out',
    ],
  },
  variants: {
    size: {
      sm: {
        drawerHeader: ['text-sm'],
        // drawerClass: ['max-w-sm'],
      },
      md: {
        drawerHeader: ['text-base'],
        // drawerClass: ['max-w-md'],
      },
      lg: {
        drawerHeader: ['text-lg'],
        // drawerClass: ['max-w-lg'],
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
          'h-full w-96 inset-y-0 left-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
      },
      right: {
        drawerClass: [
          'h-full w-96 inset-y-0 right-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
      },
      top: {
        drawerClass: [
          'h-96 w-full inset-x-0 top-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
      },
      bottom: {
        drawerClass: [
          'h-96 w-full inset-x-0 bottom-0',
          'transform transition-transform duration-300 ease-in-out',
        ],
      },
    },
  },
  compoundVariants: [
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
