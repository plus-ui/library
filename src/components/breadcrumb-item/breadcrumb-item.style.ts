import { tv } from 'tailwind-variants';

export const breadcrumbItemStyle = tv({
  slots: {
    base: 'plus-breadcrumb-item flex items-center gap-1 text-color-caption',
    prefix:
      'plus-breadcrumb-item__prefix flex items-center empty:hidden',
    suffix:
      'plus-breadcrumb-item__suffix flex items-center empty:hidden',
    separator:
      'plus-breadcrumb-item__separator flex items-center text-color-default text-sm ml-1 mr-2',
  },
  variants: {
    size: {
      sm: {
        base: 'text-sm',
        // separator: 'text-xs mx-1',
      },
      md: {
        base: 'text-base',
        // separator: 'text-sm mx-1.5',
      },
      lg: {
        base: 'text-lg',
        // separator: 'text-base mx-2',
      },
    },
    isLastItem: {
      true: {
        separator: 'hidden',
      },
      false: {
        separator: '',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isLastItem: false,
  },
});
