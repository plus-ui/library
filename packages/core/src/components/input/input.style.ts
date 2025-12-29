import { tv } from 'tailwind-variants';

export const inputStyle = tv({
  slots: {
    host: 'font-sans antialiased flex flex-col items-start justify-start w-full relative',
    base: '',
    inputElement:
      'focus:outline-none flex-1 w-full bg-transparent placeholder:text-color-placeholder',
    inputWrapper: [
      'flex flex-row items-center justify-start flex-1 w-full cursor-text',
      'rounded border border-solid',
      'placeholder-color-placeholder',
    ],
    prefix:
      'flex flex-row items-center justify-start',
    suffix:
      'flex flex-row items-center justify-start',
    clearButton:
      'cursor-pointer flex flex-row items-center justify-center hover:text-color-caption',
    passwordToggleButton:
      'cursor-pointer flex flex-row items-center justify-center hover:text-color-caption',
  },
  variants: {
    focus: {
      true: {
        inputWrapper:
          'ring-default z-[1] border-color-primary',
      },
      false: {
        inputWrapper:
          'border-color-default hover:border-color-primary',
      },
    },
    error: {
      true: {
        inputWrapper:
          'border-color-danger hover:border-color-danger',
      },
      false: {
        inputWrapper: 'border-color-default',
      },
    },
    disabled: {
      true: {
        inputWrapper: [
          'border-color-disabled cursor-not-allowed',
          'bg-color-disabled text-color-disabled',
          'hover:border-color-disabled',
        ],
        inputElement: [
          'cursor-not-allowed text-color-disabled',
          'placeholder:text-color-disabled',
        ],
      },
      false: {
        host: 'cursor-text',
        inputWrapper:
          'cursor-text bg-color-surface text-color-default',
      },
    },
    readonly: {
      true: {
        inputWrapper: [
          'bg-color-default border-color-default',
          'text-color-default pointer-events-none',
        ],
        inputElement: [
          'cursor-default text-color-default',
          'placeholder:text-color-default pointer-events-none',
        ],
      },
      false: {
        inputWrapper: 'pointer-events-auto',
      },
    },
    isSelect: {
      true: {
        inputWrapper: 'cursor-pointer',
        inputElement: 'cursor-pointer',
      },
      false: {
        inputWrapper: 'cursor-text',
        inputElement: 'cursor-text',
      },
    },
    size: {
      sm: {
        host: 'gap-0.5',
        inputWrapper: 'py-2 px-2 text-sm',
        prefix: 'pr-2',
        suffix: 'pl-2',
        clearButton: 'min-w-5 h-5',
        passwordToggleButton: 'min-w-5 h-5',
      },
      md: {
        host: 'gap-1',
        inputWrapper: 'py-2 px-3 text-base',
        prefix: 'pr-2.5',
        suffix: 'pl-2.5',
        clearButton: 'min-w-5 h-5',
        passwordToggleButton: 'min-w-5 h-5',
      },
      lg: {
        host: 'gap-1.5',
        inputWrapper: 'py-2 px-4 text-lg',
        prefix: 'pr-3',
        suffix: 'pl-3',
        clearButton: 'min-w-5 h-5',
        passwordToggleButton: 'min-w-5 h-5',
      },
    },
  },
  compoundVariants: [
    {
      error: true,
      focus: true,
      class: {
        inputWrapper: 'border-color-danger',
      },
    },
    {
      isSelect: true,
      disabled: false,
      readonly: false,
      class: {
        inputWrapper: 'cursor-pointer',
        inputElement: 'cursor-pointer',
      },
    },
  ],
  defaultVariants: {
    focus: false,
    error: false,
    disabled: false,
    size: 'md',
    isSelect: false,
    readonly: false,
  },
});
