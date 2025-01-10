import { tv } from 'tailwind-variants';

export const tagStyle = tv({
  base: [
  'tag antialiased flex flex-row items-center justify-center font-sans overflow-hidden',
  'py-0.5 px-1.5 gap-1.5'
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
    status:{
      default: 'bg-[var(--tag-bg-color)] text-[var(--tag-text-color)]',
      success: 'bg-color-status-success-default text-color-base',
      warning: 'bg-color-status-warning-default text-color-base',
      error: 'bg-color-status-error-default text-color-base',
      info: 'bg-color-status-info-default text-color-base',
    },
    invert: {
      false: '',
      true: '',
    },
  },
  compoundVariants: [
    {
      invert: true,
      status: 'default',
      class: 'bg-color-invert-neutral-default text-color-base',
    },
    {
      invert: true,
      status: 'success',
      class: 'bg-color-status-invert-success-default text-color-default',
    },
    {
      invert: true,
      status: 'warning',
      class: 'bg-color-status-invert-warning-default text-color-default',
    },
    {
      invert: true,
      status: 'error',
      class: 'bg-color-status-invert-error-default text-color-default',
    },
    {
      invert: true,
      status: 'info',
      class: 'bg-color-status-invert-info-default text-color-default',
    },
  ],
  defaultVariants: {
    size: 'md',
    invert: false,
    status: 'default',
    radius: 'full',
  },
});