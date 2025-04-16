import { tv } from 'tailwind-variants';

export const ratingStyle = tv({
  slots: {
    host: [
      'inline-flex',
      'items-center',
      'gap-1',
      'align-middle',
    ],
    starContainer: [
      'relative',
      'cursor-pointer',
      'leading-none',
    ],
    starIcon: [
      'transition-colors',
      'duration-150',
      'ease-in-out',
      'fill-current',
    ],
    starPartial:
      'absolute top-0 left-0 h-full overflow-hidden',
  },
  variants: {
    size: {
      sm: {
        host: 'text-base',
        starContainer: 'text-base',
      },
      md: {
        host: 'text-xl',
        starContainer: 'text-xl',
      },
      lg: {
        host: 'text-2xl',
        starContainer: 'text-2xl',
      },
    },
    disabled: {
      true: {
        host: 'opacity-50 cursor-not-allowed',
        starContainer: 'cursor-not-allowed',
      },
    },
    readonly: {
      true: {
        host: 'cursor-default',
        starContainer: 'cursor-default',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
    readonly: false,
  },
});

// Keep label and caption styles consistent
export { labelStyle } from '../label/label.style';
export { captionStyle } from '../caption/caption.style';
