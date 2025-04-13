import { tv } from 'tailwind-variants';

export const tagStyle = tv({
  base: [
    'tag antialiased flex flex-row items-center justify-center font-sans overflow-hidden',
    'py-0.5 px-1.5 gap-1.5',
    'text-(--d-text)',
    'bg-(--d-bg-default)',
    'border border-(--d-border)',
  ],
  variants: {
    size: {
      sm: 'text-xs px-1 gap-1',
      md: 'text-sm',
      lg: 'text-md',
    },
    radius: {
      full: 'rounded-full',
      medium: 'rounded-md',
      none: 'rounded-none',
    },
    status: {
      default: 'default',
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info',
    },
  },
  defaultVariants: {
    size: 'md',
    status: 'default',
    radius: 'full',
  },
});
