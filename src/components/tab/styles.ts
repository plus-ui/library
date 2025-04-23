import { tv } from 'tailwind-variants';

export const tabStyle = tv({
  slots: {
    tab: [
      'plus-ui-element',
      'tab',
      'flex items-center gap-2',
      'font-sans',
      'cursor-pointer',
      'border-0',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-default',
      'whitespace-nowrap',
    ],
    tabHeader: ['flex'],
    tabGroup: ['flex w-full'],
    tabPanel: [
      'w-full',
      'focus-visible:outline-none focus-visible:ring-default',
    ],
    tabDismiss: [
      'tab-dismiss',
      'ml-1 p-0.5',
      'text-color-muted',
      'hover:text-color-default',
      'focus:outline-none focus:ring-1 focus:ring-offset-1',
      'rounded-full',
      'transition-colors',
    ],
  },

  variants: {
    size: {
      sm: {
        tab: ['text-sm', 'px-3 py-1.5'],
      },
      md: {
        tab: ['text-base', 'px-4 py-2'],
      },
      lg: {
        tab: ['text-lg', 'px-5 py-2.5'],
      },
    },
    orientation: {
      vertical: {
        tabHeader: ['flex-col'],
        tabGroup: ['flex-row gap-4'],
        tab: [
          'justify-start text-left',
          'border-r-2 border-r-transparent',
          'hover:bg-color-subtle',
        ],
      },
      horizontal: {
        tabHeader: ['flex-row'],
        tabGroup: ['flex-col gap-4'],
        tab: [
          'justify-center text-center',
          'border-b-2 border-b-transparent',
          'hover:bg-color-subtle',
        ],
      },
    },
    active: {
      true: {
        tab: ['text-color-primary', 'border-color-primary'],
        tabPanel: ['block'],
      },
      false: {
        tab: ['text-color-default', 'border-color-default'],
        tabPanel: ['hidden'],
      },
    },
    disabled: {
      true: {
        tab: ['cursor-not-allowed', 'opacity-60', 'hover:bg-transparent'],
      },
    },
    truncated: {
      true: {
        tab: ['truncate'],
      },
    },
    animated: {
      true: {
        tab: [],
      },
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    active: false,
    disabled: false,
    truncated: false,
    animated: false,
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      active: true,
      animated: false,
      class: {
        tab: 'border-b-2 border-b-color-primary',
      },
    },
    {
      orientation: 'vertical',
      active: true,
      animated: false,
      class: {
        tab: 'border-r-2 border-r-color-primary',
      },
    },
    {
      orientation: 'horizontal',
      active: true,
      animated: true,
      class: {
        tab: 'border-b-transparent z-10',
      },
    },
    {
      orientation: 'vertical',
      active: true,
      animated: true,
      class: {
        tab: 'border-r-transparent z-10',
      },
    },
  ],
});
