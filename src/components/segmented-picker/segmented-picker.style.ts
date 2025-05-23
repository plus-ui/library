import { tv } from 'tailwind-variants';

export const segmentedPickerStyle = tv({
  slots: {
    host: 'plus-ui-element flex items-center p-0.5 gap-0.5 h-fit w-fit relative bg-color-disabled',
    animationOverlay:
      'selection-overlay absolute p-0.5 transition-all duration-300 ease-out',
  },
  variants: {
    size: {
      sm: {
        // host: 'h-8',
        animationOverlay: 'h-7',
      },
      md: {
        // host: 'h-10',
        animationOverlay: 'h-9',
      },
      lg: {
        // host: 'h-12',
        animationOverlay: 'h-11',
      },
    },
    shape: {
      circle: {
        host: 'rounded-full',
        animationOverlay: 'rounded-full',
      },
      square: {
        host: 'rounded-sm',
        animationOverlay: 'rounded-sm',
      },
    },
    status: {
      default: {
        animationOverlay: 'bg-color-surface',
      },
      primary: {
        animationOverlay:
          'bg-color-primary-default hover:bg-color-primary-hovered active:bg-color-primary-pressed',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'square',
    status: 'default',
  },
});
