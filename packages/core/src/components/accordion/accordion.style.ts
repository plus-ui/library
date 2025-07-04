import { tv } from 'tailwind-variants';

/**
 * Style configuration for the accordion component
 */
export const accordionStyle = tv({
  slots: {
    base: 'accordion-base font-sans antialiased border border-color-default rounded bg-color-surface ',
    header:
      'header flex cursor-pointer flex-row items-center justify-between font-medium text-color-default',
    panel: '',
    icon: 'text-base text-center',
    helper: 'text-color-caption font-normal',
    headerContainer:
      'flex flex-row items-center gap-3',
  },
  variants: {
    size: {
      sm: {
        header: 'py-2 px-4 text-base gap-2',
        panel: 'p-4 gap-4 text-base',
        helper: 'text-base',
      },
      md: {
        header:
          'py-2.5 px-5 text-lg gap-3 h-[48px]',
        panel: 'p-5 gap-5 text-lg',
        helper: 'text-lg',
      },
      lg: {
        header:
          'py-3 px-6 text-xl gap-3  h-[52px]',
        panel: 'p-6 gap-6 text-xl',
        helper: 'text-xl',
      },
    },
    expand: {
      true: {
        panel: 'block',
        icon: 'text-base text-center',
      },
      false: {
        panel: 'hidden',
        icon: 'text-base text-center',
      },
    },
    isGrouped: {
      true: {
        base: 'border-t-0 border-l-0 border-r-0 rounded-b-0',
      },
      false: {
        base: '',
      },
    },
    isLast: {
      true: {
        base: 'border-b-0',
      },
      false: {
        base: 'border-b',
      },
    },
    isFirst: {
      true: {
        base: '',
      },
      false: {
        base: '',
      },
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed',
        header:
          'cursor-not-allowed bg-color-disabled text-color-disabled',
        panel: 'bg-color-disabled',
      },
    },
    // hasHelper: {
    //   true: {
    //     headerContainer: 'justify-between',
    //   },
    //   false: {
    //     headerContainer: 'justify-end',
    //   },
    // },
  },
  defaultVariants: {
    expand: false,
    disabled: false,
    isFirst: false,
    hasHelper: false,
  },
});
