import { tv } from 'tailwind-variants';

export const checkboxStyle = tv({
  slots: {
    base: [
      'plus-checkbox',
      'inline-flex items-center gap-2 group/base cursor-pointer',
    ],
    control: [
      'relative flex items-center justify-center flex-shrink-0',
    ],
    checkbox: [
      'flex items-center justify-center border rounded',
      'bg-color-surface text-color-transparent',
      'transition-colors duration-200 ease-in-out',
    ],
    icon: [
      'transition-transform duration-200 ease-in-out scale-0',
    ],
    label: ['text-color-default'],
  },
  variants: {
    size: {
      sm: {
        base: 'text-sm',
        control: 'w-4 h-4',
        checkbox: 'w-4 h-4',
        icon: 'text-[10px]',
        label: 'text-sm',
      },
      md: {
        base: 'text-base',
        control: 'w-4.5 h-4.5',
        checkbox: 'w-4.5 h-4.5',
        icon: 'text-[12px]',
        label: 'text-base',
      },
      lg: {
        base: 'text-lg',
        control: 'w-5 h-5',
        checkbox: 'w-5 h-5',
        icon: 'text-[14px]',
        label: 'text-lg',
      },
    },
    checked: {
      true: {
        checkbox:
          'bg-color-primary-default border-transparent text-color-base',
        icon: 'scale-100',
      },
    },
    indeterminate: {
      true: {
        checkbox:
          'bg-color-primary-default border-transparent text-color-base',
        icon: 'scale-100',
      },
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed',
        checkbox:
          'bg-color-disabled border-color-disabled text-color-disabled',
        label: 'text-color-disabled',
      },
    },
    error: {
      true: {
        checkbox:
          'bg-color-danger-invert-default border-color-danger',
        label: '',
      },
    },
  },
  compoundVariants: [
    {
      disabled: false,
      checked: false,
      indeterminate: false,
      error: false,
      class: {
        checkbox: [
          'border-color-default group-hover/base:bg-color-default-hovered group-active/base:bg-color-default-pressed',
        ],
      },
    },
    {
      disabled: false,
      checked: true,
      indeterminate: false,
      error: false,
      class: {
        checkbox: [
          'group-hover/base:bg-color-primary-hover',
          'group-active/base:bg-color-primary-pressed',
        ],
      },
    },
    {
      disabled: false,
      checked: false,
      indeterminate: true,
      error: false,
      class: {
        checkbox: [
          'group-hover/base:bg-color-primary-hover',
          'group-active/base:bg-color-primary-pressed',
        ],
      },
    },
    {
      disabled: false,
      checked: false,
      indeterminate: false,
      error: true,
      class: {
        checkbox: [
          'border-color-danger group-hover/base:bg-color-danger-invert-hovered group-active/base:bg-color-danger-invert-pressed',
        ],
        label: '',
      },
    },
    {
      disabled: false,
      checked: true,
      indeterminate: false,
      error: true,
      class: {
        checkbox: [
          'bg-color-danger-default',
          'group-hover/base:bg-color-danger-hovered',
          'group-active/base:bg-color-danger-pressed',
        ],
        label: '',
      },
    },
    {
      disabled: false,
      checked: false,
      indeterminate: true,
      error: true,
      class: {
        checkbox: [
          'bg-color-danger-default',
          'group-hover/base:bg-color-danger-hovered',
          'group-active/base:bg-color-danger-pressed',
        ],
        label: '',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
  },
});
