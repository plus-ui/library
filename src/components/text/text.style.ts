import { tv } from 'tailwind-variants';

export const textStyle = tv({
  base: ['plus-text', 'plus-ui-element'],
  variants: {
    kind: {
      display:
        'font-bold text-6xl text-color-default',
      heading1:
        'font-semibold text-3xl text-color-default',
      heading2:
        'font-semibold text-2xl text-color-default',
      title1:
        'font-medium text-xl text-color-default',
      title2:
        'font-medium text-lg text-color-default',
      body: 'font-normal text-base text-color-default',
      'body-accent':
        'font-medium text-base text-color-default',
      helper:
        'font-medium text-sm text-color-placeholder',
      caption:
        'font-normal text-sm text-color-caption',
    },
  },
  defaultVariants: {
    kind: 'body',
  },
});
