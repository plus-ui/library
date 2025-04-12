import { tv } from 'tailwind-variants';

export const avatarStyle = tv({
  base: [
    'avatar align-middle inline-flex items-center justify-center font-sans uppercase overflow-hidden',
    'text-color-dynamic',
    'bg-color-dynamic-default',
  ],
  variants: {
    size: {
      xs: 'size-4 text-xs',
      sm: 'size-6 text-xs',
      md: 'size-9 text-sm',
      lg: 'size-10 text-base',
      xl: 'size-11 text-lg',
      custom: `size-[var(--size)] text-[calc(var(--size)/2.50)]`,
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});
