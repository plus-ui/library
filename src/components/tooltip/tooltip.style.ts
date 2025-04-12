import { tv } from 'tailwind-variants';

export const tooltipStyle = tv({
  slots: {
    base: 'plus-ui-element tooltip absolute z-[1000] pointer-events-none rounded py-1 bg-color-default-invert-default text-color-base text-center text-pretty shadow-md',
    arrow:
      'arrow absolute size-2 rotate-45 bg-inherit',
  },
  variants: {
    size: {
      sm: { base: 'px-2 text-xs' },
      md: { base: 'px-3 text-sm' },
      lg: { base: 'px-4 text-base' },
    },
    isVisible: { true: 'block', false: 'hidden' },
  },
});
