import { tv } from 'tailwind-variants';

export const radioStyle = tv({
  slots: {
    host: [
      'inline-flex',
      'items-center',
      'plus-ui-element',
    ],
    wrapper: ['relative', 'flex', 'items-center'],
    radio: [
      'radio-input',
      'peer',
      'appearance-none',
      'rounded-full',
      'border-2',
      'transition-all',
      'duration-200',
      'cursor-pointer',
      'border',
      'text-(--d-text)',
      'border-(--d-border)',
      'bg-(--d-bg-default)',
      'enabled:hover:bg-(--d-bg-hovered)',
      'enabled:active:bg-(--d-bg-pressed)',
      'enabled:focus-visible:bg-(--d-bg-focused)',
      'enabled:focus-visible:ring-default',
      'disabled:cursor-not-allowed',
    ],
    dot: [
      'absolute',
      'left-1/2',
      'top-1/2',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'rounded-full',
      'bg-(--d-bg-checked)',
      'transition-all',
      'duration-200',
      'cursor-pointer',
      'opacity-0',
      'peer-checked:opacity-100',
      'peer-checked:scale-100',
      'peer-disabled:cursor-not-allowed',
      'scale-0',
    ],
    label: [
      'select-none',
      'cursor-pointer',
      'text-(--d-text)',
    ],
  },
  variants: {
    size: {
      sm: {
        host: 'gap-1.5',
        radio: 'size-4',
        dot: 'size-2',
        label: 'text-sm',
      },
      md: {
        host: 'gap-2',
        radio: 'size-4.5',
        dot: 'size-2.5',
        label: 'text-base',
      },
      lg: {
        host: 'gap-2.5',
        radio: 'size-5',
        dot: 'size-3',
        label: 'text-lg',
      },
      inherit: {},
    },
    disabled: {
      true: {
        host: 'cursor-not-allowed',
        radio: ['cursor-not-allowed'],
        label: ['cursor-not-allowed'],
      },
    },
    readonly: {
      true: {
        host: 'cursor-default pointer-events-none',
        radio: 'cursor-default',
        label: ['cursor-default'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
    disabled: false,
    readonly: false,
  },
});
