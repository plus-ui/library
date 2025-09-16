import { tv } from 'tailwind-variants';

export const segmentedPickerStyle = tv({
  slots: {
    host: 'plus-ui-element flex items-center p-1 gap-0.5 h-fit w-fit relative bg-color-disabled',
    animationOverlay:
      'selection-overlay absolute transition-all duration-200 ease-out opacity-0 w-0 h-0',
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
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
