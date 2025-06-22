import { tv } from 'tailwind-variants';

export const listBoxItemStyle = tv({
  base: [
    'plus-list-box-item',
    'antialiased',
    'font-sans',
    'font-normal',
    'flex',
    'items-center',
    'justify-start',
    'min-w-full',
    'py-2',
    'text-[var(--i-text-color)]',
    'cursor-pointer',
    'transition-colors',
    'duration-200',
    'ease-in-out',
  ],
  variants: {
    size: {
      sm: 'small px-3 text-sm gap-2.5',
      md: 'medium px-3 text-base gap-2.5',
      lg: 'large px-4 text-lg gap-3',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
    selected: {
      true: 'bg-[var(--i-selected-bg)]',
      false:
        'bg-[var(--i-bg-default)] hover:bg-[var(--i-bg-hovered)] active:bg-[var(--i-bg-pressed)]',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
    selected: false,
  },
});
