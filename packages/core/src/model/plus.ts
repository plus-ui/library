export const Sizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const;

export type Size = (typeof Sizes)[keyof typeof Sizes];

// Type-safe size check
export const isValidSize = (size: string): size is Size => {
  return Object.values(Sizes).includes(size as Size);
};
