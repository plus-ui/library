/* badge.host.style.ts */

import { tv } from 'tailwind-variants';

export const badgeStyle = tv({
  base: ['plus-badge inner-host antialiased flex flex-row items-center justify-center font-sans rounded-full', 'absolute z-10',
    'bg-[var(--inline-bg-color)] text-[var(--inline-text-color)]'
],
  variants: {
    status: {
        success: '![--inline-bg-color:var(--plus-color-background-status-success-default)] ![--inline-text-color:var(--plus-color-text-base)]',
        warning: '',
        danger: '',
        info: '',
        default: '',
    },
    size: {
      sm: 'h-4 min-w-4 text-xs px-1',
      md: 'h-5 min-w-5 text-sm px-1.5',
      lg: 'h-6 min-w-6 text-base px-2',
    },
    kind: {
      dot: 'min-w-0 px-0 py-0',
      text: 'py-0.5',
    },
    orientation: {
      'top-right': 'top-[-6px] right-[-6px] translate-x-[50%] translate-y-[-50%]',
      'top-left': 'top-[-6px] left-[-6px] translate-x-[-50%] translate-y-[-50%]',
      'bottom-right': 'bottom-[-6px] right-[-6px] translate-x-[50%] translate-y-[50%]',
      'bottom-left': 'bottom-[-6px] left-[-6px] translate-x-[-50%] translate-y-[50%]',
      '': '',
    },
  },
  compoundVariants: [
    {
      kind: 'dot',
      size: 'sm',
      class: 'size-1.5',
    },
    {
      kind: 'dot',
      size: 'md',
      class: 'size-2',
    },
    {
      kind: 'dot',
      size: 'lg',
      class: 'size-2.5',
    },
    {
      kind: 'text',
      size: 'sm',
      class: 'px-1 text-xs',
    },
    {
      kind: 'text',
      size: 'md',
      class: 'px-1.5 text-sm',
    },
    {
      kind: 'text',
      size: 'lg',
      class: 'px-1.5 text-base',
    },
  ],
  defaultVariants: {
    size: 'md',
    kind: 'text',
    orientation: 'top-right',
    status: 'default' as 'success' | 'warning' | 'danger' | 'info' | 'default',
  },
});
