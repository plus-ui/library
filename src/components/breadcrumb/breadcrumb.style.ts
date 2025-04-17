import { tv } from 'tailwind-variants';

export const breadcrumbStyle = tv({
  base: 'plus-breadcrumb flex items-center',
  variants: {
    kind: {
      'non-framed': '',
      framed:
        'bg-color-surface border border-color-default rounded',
    },
    size: {
      sm: 'text-sm p-1',
      md: 'text-base p-1.5',
      lg: 'text-lg p-2',
    },
  },
  compoundVariants: [
    {
      kind: 'non-framed',
      size: 'sm',
      class: 'p-0',
    },
    {
      kind: 'non-framed',
      size: 'md',
      class: 'p-0',
    },
    {
      kind: 'non-framed',
      size: 'lg',
      class: 'p-0',
    },
  ],
  defaultVariants: {
    kind: 'non-framed',
    size: 'md',
  },
});
