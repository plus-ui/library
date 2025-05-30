import { tv } from 'tailwind-variants';

export const toggleStyle = tv({
  slots: {
    base: [
      'plus-toggle',
      'antialiased font-sans flex flex-col items-start justify-start w-full relative',
    ],
    label: [
      // Style comes from labelStyle import in component
    ],
    control: [
      'flex flex-row items-center justify-start group/base cursor-pointer text-(--d-text)',
    ],
    inputElement: ['sr-only'],
    switch: [
      'relative rounded-full box-content border border-(--d-border)',
      'bg-(--d-switch-bg)',
      'flex-shrink-0',
      'transition-colors duration-300',
      'group-hover/base:bg-(--d-switch-bg-hover)',
      'group-active/base:bg-(--d-switch-bg-active)',
      'overflow-hidden',
    ],
    text: ['text-(--d-text)'],
    dot: [
      'absolute rounded-full bg-(--d-dot-bg) transform',
      'flex items-center justify-center',
      'text-(--d-dot-text)',
      'transition-all duration-300',
      'group-hover/base:shadow-sm',
    ],
    icon: [''],
    caption: [
      // Style comes from captionStyle import in component
    ],
  },
  variants: {
    focus: {
      true: {
        switch: 'ring-default z-[1]',
      },
    },
    error: {
      true: {},
    },
    checked: {
      true: {
        dot: ['origin-left'],
      },
      false: {
        dot: ['origin-right'],
      },
    },
    readonly: {
      true: {
        control: ['cursor-default'],
        switch: [
          'group-hover/base:!bg-(--d-switch-bg)',
          'group-active/base:!bg-(--d-switch-bg)',
        ],
        dot: [
          'group-hover/base:!shadow-none',
          'group-active/base:!transform-none',
        ],
      },
    },
    disabled: {
      true: {
        control: [
          'cursor-not-allowed opacity-60',
        ],
        switch: [
          'group-hover/base:!bg-(--d-switch-bg)',
          'group-active/base:!bg-(--d-switch-bg)',
        ],
        dot: [
          'group-hover/base:!shadow-none',
          'group-active/base:!transform-none',
        ],
      },
    },
    animation: {
      default: {
        dot: [
          'transition-all duration-300 ease-in-out',
        ],
      },
      bounce: {
        dot: [
          'transition-all duration-400 ease-bounce',
        ],
      },
      smooth: {
        dot: [
          'transition-all duration-500 ease-in-out',
        ],
      },
    },
    size: {
      sm: {
        base: 'text-sm gap-0.5',
        label: 'text-sm',
        control: 'gap-1.5',
        switch: 'w-10 h-5',
        dot: 'top-0.5 left-0.5 w-4 h-4 text-[6px] leading-[6px]',
        text: 'text-sm',
        caption: 'text-xs',
      },
      md: {
        base: 'text-base gap-1',
        label: 'text-base',
        control: 'gap-2',
        switch: 'w-13 h-6.5',
        dot: 'top-1 left-1 w-4.5 h-4.5 text-[8px] leading-[8px]',
        text: 'text-base',
        caption: 'text-sm',
      },
      lg: {
        base: 'text-lg gap-1.5',
        label: 'text-lg',
        control: 'gap-2.5',
        switch: 'w-14 h-7',
        dot: 'top-1 left-1 w-5 h-5 text-[10px] leading-[10px]',
        text: 'text-lg',
        caption: 'text-base',
      },
    },
    fullWidth: {
      true: {
        base: 'max-w-none',
      },
      false: {
        base: 'max-w-[256px]',
      },
    },
  },
  compoundVariants: [
    // Checked + Size combinations (for dot positioning)
    {
      checked: true,
      size: 'sm',
      class: {
        dot: [
          'translate-x-[calc(theme(width.10)-theme(width.5))]',
        ],
      },
    },
    {
      checked: true,
      size: 'md',
      class: {
        dot: [
          'translate-x-[calc(var(--spacing)*13-var(--spacing)*6.5)]',
        ],
      },
    },
    {
      checked: true,
      size: 'lg',
      class: {
        dot: [
          'translate-x-[calc(theme(width.14)-theme(width.7))]',
        ],
      },
    },

    // Interactive states for dot (press animation)
    // FALSE state (dot expands to the right)
    {
      disabled: false,
      readonly: false,
      checked: false,
      size: 'sm',
      class: {
        dot: [
          'group-active/base:w-5 group-active/base:h-4',
        ],
      },
    },
    {
      disabled: false,
      readonly: false,
      checked: false,
      size: 'md',
      class: {
        dot: [
          'group-active/base:w-6 group-active/base:h-4.5',
        ],
      },
    },
    {
      disabled: false,
      readonly: false,
      checked: false,
      size: 'lg',
      class: {
        dot: [
          'group-active/base:w-6.5 group-active/base:h-5',
        ],
      },
    },

    // TRUE state (dot expands to the left)
    {
      disabled: false,
      readonly: false,
      checked: true,
      size: 'sm',
      class: {
        dot: [
          'group-active/base:w-5 group-active/base:h-4 group-active/base:-ml-1',
        ],
      },
    },
    {
      disabled: false,
      readonly: false,
      checked: true,
      size: 'md',
      class: {
        dot: [
          'group-active/base:w-6 group-active/base:h-4.5 group-active/base:-ml-1.5',
        ],
      },
    },
    {
      disabled: false,
      readonly: false,
      checked: true,
      size: 'lg',
      class: {
        dot: [
          'group-active/base:w-6.5 group-active/base:h-5 group-active/base:-ml-1.5',
        ],
      },
    },
  ],
  defaultVariants: {
    focus: false,
    error: false,
    disabled: false,
    readonly: false,
    checked: false,
    size: 'md',
    fullWidth: false,
    animation: 'default',
  },
});
