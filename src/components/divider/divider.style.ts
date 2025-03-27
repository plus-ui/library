import { tv } from 'tailwind-variants';

export const baseDividerStyle = tv({
  slots: {
    base: [
      'plus-divider',
      'plus-ui-element',
      'flex items-center justify-center',
    ],
    line: 'plus-divider-line',
    slotArea: '',
  },
  variants: {
    orientation: {
      horizontal: {
        base: 'horizontal-divider',
        line: '',
      },
      vertical: {
        base: 'vertical-divider',
        line: '',
      },
    },
    kind: {
      solid: {
        base: 'divider-solid',
        line: '',
      },
      dashed: {
        base: 'divider-dashed',
        line: '',
      },
      dotted: {
        base: 'divider-dotted',
        line: '',
      },
    },
    hasContent: {
      true: {
        slotArea: 'mx-(--divider-spacing)',
      },
      false: {
        slotArea: '',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    kind: 'solid',
    hasContent: false,
  },
});
