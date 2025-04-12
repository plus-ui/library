import { tv } from 'tailwind-variants';

export const popconfirmStyle = tv({
  slots: {
    host: 'plus-ui-element popconfirm fixed z-[1000] shadow-md bg-color-surface rounded-lg flex-col transition-all duration-200 ease-in-out transform opacity-0 scale-95',
    arrow:
      'arrow absolute size-2 rotate-45 bg-inherit',
    headerWrapper:
      'header-wrapper flex flex-row justify-between',
    headerLeft:
      'left-side flex flex-row items-center text-inherit',
    title:
      'header font-semibold text-color-default',
    headerRight:
      'right-side cursor-pointer text-color-default',
    content: 'content-area',
    footer: 'footer',
    footerActions:
      'footer-actions flex flex-row justify-end',
  },
  variants: {
    size: {
      sm: {
        host: 'w-60 p-3 gap-3',
        headerLeft: 'text-md gap-1.5',
        headerRight: 'text-md',
        content: 'text-sm',
        footer: 'text-sm',
        footerActions: 'gap-1.5',
      },
      md: {
        host: 'w-64 p-4 gap-4',
        headerLeft: 'text-lg gap-2',
        headerRight: 'text-lg',
        content: 'text-base',
        footer: 'text-base',
        footerActions: 'gap-2',
      },
      lg: {
        host: 'w-72 p-4 gap-4',
        headerLeft: 'text-xl gap-3',
        headerRight: 'text-xl',
        content: 'text-lg',
        footer: 'text-lg',
        footerActions: 'gap-3',
      },
    },
    isVisible: {
      true: {
        host: 'flex opacity-100 scale-100',
      },
      false: {
        host: 'opacity-0 scale-95 pointer-events-none hidden',
      },
    },
    status: {
      success: {
        headerWrapper: 'text-color-success',
      },
      warning: {
        headerWrapper: 'text-color-warning',
      },
      danger: {
        headerWrapper: 'text-color-danger',
      },
      primary: {
        headerWrapper: 'text-color-primary',
      },
      default: {
        headerWrapper: 'text-color-default',
      },
      info: {
        headerWrapper: 'text-color-info',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isVisible: false,
    status: 'default',
  },
});
