import { tv } from 'tailwind-variants';

export const badgeStyle = tv({
  base: [
    'plus-badge antialiased flex flex-row items-center justify-center font-sans rounded-full',
    'absolute z-10',
    'text-(--d-text)',
    'bg-(--d-bg-default)',
    'border border-(--d-border)',
  ],
  variants: {
    size: {
      sm: 'h-4 min-w-4 text-xs px-1',
      md: 'h-5 min-w-5 text-sm px-1.5',
      lg: 'h-6 min-w-6 text-base px-2',
    },
    hasContent: {
      true: 'py-0.5',
      false: 'min-w-0 px-0 py-0',
    },
    status: {
      default: 'default',
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info',
    },
    orientation: {
      'top-right':
        'top-0 right-0 translate-x-[50%] translate-y-[-50%]',
      'top-left':
        'top-0 left-0 translate-x-[-50%] translate-y-[-50%]',
      'bottom-right':
        'bottom-0 right-0 translate-x-[50%] translate-y-[50%]',
      'bottom-left':
        'bottom-0 left-0 translate-x-[-50%] translate-y-[50%]',
      '': '',
    },
  },
  compoundVariants: [
    {
      hasContent: false,
      size: 'sm',
      class: 'p-0 w-1.5 h-1.5',
    },
    {
      hasContent: false,
      size: 'md',
      class: 'p-0 w-2 h-2',
    },
    {
      hasContent: false,
      size: 'lg',
      class: 'p-0 w-2.5 h-2.5',
    },
  ],
  defaultVariants: {
    size: 'md',
    hasContent: false,
    orientation: 'top-right',
    status: 'default',
  },
});
