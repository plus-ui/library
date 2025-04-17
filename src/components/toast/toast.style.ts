import { tv } from 'tailwind-variants';

export const toastStyle = tv({
  slots: {
    base: [
      'plus-toast  bg-color-modal font-sans antialiased flex flex-row items-center justify-between border rounded w-fit max-w-2xl transition duration-300 ease-in-out transform scale-95 shadow-lg pointer-events-auto',
    ],
    iconClass: ['plus-toast__icon'],
    messageClass: [
      'plus-toast__message flex items-center font-normal text-color-default',
    ],
    closeClass: [
      'plus-toast__close cursor-pointer relative',
      // Clicking area
      'before:absolute before:inset-0 before:z-10',
      "before:rounded-full before:cursor-pointer before:bg-transparent before:content-['']",
      'before:w-10 before:h-10 before:-top-1.5 before:-left-3 before:z-10',
    ],
    toastContainer: [
      'plus-toast-container fixed z-50',
    ],
    contentClass: 'flex flex-col',
    titleClass: 'font-medium text-color-default',
    footerClass:
      'flex flex-row items-center justify-end gap-2',
    containerClass:
      'plus-toast-container flex flex-row items-baseline justify-center flex-1',
  },
  variants: {
    size: {
      sm: {
        base: ['p-3 text-sm'],
        containerClass: 'gap-1.5',
        // messageClass: 'text-sm',
        // titleClass: 'text-base',
        // contentClass: 'gap-2',
      },
      md: {
        base: ['p-4 text-base'],
        containerClass: 'gap-2',
        // titleClass: 'text-lg',
        // messageClass: 'text-base',
        // contentClass: 'gap-2.5',
      },
      lg: {
        base: ['p-6 text-lg'],
        containerClass: 'gap-3',
        // messageClass: 'text-lg',
        // titleClass: 'text-xl',
        // contentClass: 'gap-3',
      },
    },
    kind: {
      default: {
        base: 'border-solid border-transparent',
      },
      outlined: {
        base: 'border-solid border-color-default',
      },
      dashed: {
        base: 'border-dashed border-color-default',
      },
    },
    status: {
      success: {
        iconClass: ['text-color-success'],
      },
      warning: {
        iconClass: ['text-color-warning'],
      },
      danger: {
        iconClass: ['text-color-danger'],
      },
      info: {
        iconClass: ['text-color-info'],
      },
      default: {
        base: [' text-color-default'],
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md',
    kind: 'default',
    status: 'default',
  },
});
