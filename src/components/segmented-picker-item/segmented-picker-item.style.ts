import { tv } from 'tailwind-variants';

export const segmentedPickerItemStyle = tv({
  base: 'plus-ui-element p-2 min-w-9 max-h-8 flex flex-row gap-2 items-center cursor-pointer justify-center font-semibold relative text-sm text-color-placeholder select-none',
  variants: {
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
      true: 'cursor-not-allowed bg-color-disabled text-color-disabled',
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
    status: 'default',
    checked: false,
    disabled: false,
  },
});
