import { tv } from 'tailwind-variants';

export const linkStyle = tv({
  slots: {
    base: [
      'link antialiased appearance-none',
      'flex flex-row items-center justify-center',
      'font-sans font-normal',
      'text-color-link',
      'hover:underline',
      'visited:text-color-visited',
      'focus-visible:ring-default',
      'w-max',
    ],
    mainSlot: '',
  },
  variants: {
    size: {
      sm: {
        base: 'small gap-1 text-sm',
      },
      md: {
        base: 'medium gap-2 text-base',
      },
      lg: {
        base: 'large gap-3 text-lg',
      },
    },
    disabled: {
      true: {
        base: 'disabled cursor-not-allowed text-color-disabled hover:no-underline visited:text-color-disabled focus-visible:ring-0',
        mainSlot: '',
      },
      false: '',
    },
    readonly: {
      true: {
        base: 'readonly cursor-default text-color-caption visited:text-color-caption hover:no-underline focus-visible:ring-0',
        mainSlot: '',
      },
      false: '',
    },
    truncated: {
      true: {
        base: 'overflow-hidden whitespace-nowrap',
        mainSlot:
          'max-w-[80px] truncate text-center',
      },
      false: {
        base: '',
        mainSlot: 'flex-1',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
    readonly: false,
    truncated: false,
  },
});
