import { tv } from 'tailwind-variants';

export const segmentedPickerItemStyle = tv({
  base: 'plus-ui-element min-w-9 flex flex-row gap-2 items-center cursor-pointer justify-center font-medium relative text-sm text-color-default select-none',
  variants: {
    size: {
      sm: 'text-sm py-1 px-3',
      md: 'text-base py-1.5 px-3',
      lg: 'text-lg py-1.5 px-4',
    },
    status: {
      default: '',
      primary: '',
    },
    checked: {
      true: '',
      false:
        'hover:bg-color-default-hovered active:bg-color-default-pressed',
    },
    disabled: {
      true: 'cursor-not-allowed text-color-disabled',
      false: '',
    },
    shape: {
      square: 'rounded-md',
      circle: 'rounded-full',
    },
  },
  compoundVariants: [
    {
      status: 'default',
      checked: true,
      class: 'text-color-default',
    },
    {
      status: 'primary',
      checked: true,
      class: 'text-color-base',
    },
  ],
  defaultVariants: {
    size: 'md',
    status: 'default',
    checked: false,
    disabled: false,
    shape: 'square',
  },
});
