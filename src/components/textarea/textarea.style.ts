import { tv } from 'tailwind-variants';

export const textareaStyle = tv({
  slots: {
    host: 'font-sans antialiased flex flex-col gap-1 items-start justify-start w-full relative',
    textareaElement: [
      'block',
      'w-full',
      'min-h-[60px]', // Default min height
      'rounded-md',
      'border',
      'border-solid',
      'border-color-default', // Use theme variable
      'bg-color-surface', // Use theme variable
      'px-3', // Horizontal padding
      'py-2', // Vertical padding
      'text-base', // Base font size
      'text-color-default', // Use theme variable
      'placeholder:text-color-placeholder', // Use theme variable
      'transition-colors',
      'duration-150',
      'ease-in-out',
      'focus:outline-none', // Focus handled by wrapper variant
    ],
    textareaWrapper: [
      // Added wrapper for focus ring similar to input
      'block w-full relative',
      'rounded', // Wrapper gets the border radius
      'focus-within:ring-default focus-within:border-color-primary focus-within:z-[1]', // Focus ring on wrapper
    ],
  },
  variants: {
    size: {
      sm: {
        textareaElement:
          'text-sm min-h-[52px] py-1.5 px-2.5',
      },
      md: {
        textareaElement:
          'text-base min-h-[60px] py-2 px-3',
      },
      lg: {
        textareaElement:
          'text-lg min-h-[68px] py-2.5 px-4',
      },
    },
    error: {
      true: {
        textareaElement:
          'border-color-danger text-color-danger placeholder:text-color-danger', // Error styles on element
        textareaWrapper:
          'focus-within:border-color-danger focus-within:ring-color-danger border-color-danger', // Error styles on wrapper
      },
      false: {
        textareaElement:
          'border-color-default hover:border-color-primary',
        textareaWrapper:
          'focus-within:border-color-primary focus-within:ring-default',
      },
    },
    disabled: {
      true: {
        textareaElement: [
          'border-color-disabled cursor-not-allowed',
          'bg-color-disabled text-color-disabled',
          'placeholder:text-color-disabled',
          'hover:border-color-disabled',
        ],
        textareaWrapper: 'border-color-disabled', // Ensure wrapper also gets disabled border
        host: 'cursor-not-allowed',
      },
      false: {
        host: 'cursor-text',
      },
    },
    readonly: {
      true: {
        textareaElement: [
          'bg-color-default border-color-default',
          'text-color-default pointer-events-none cursor-default',
          'placeholder:text-color-default',
        ],
      },
      false: {},
    },
    resize: {
      none: { textareaElement: 'resize-none' },
      vertical: { textareaElement: 'resize-y' },
      horizontal: { textareaElement: 'resize-x' },
      both: { textareaElement: 'resize' },
    },
    fullWidth: {
      true: {
        host: 'max-w-none',
      },
      false: {
        host: 'max-w-md', // Or your default max-width
      },
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
    disabled: false,
    readonly: false,
    resize: 'vertical',
    fullWidth: false,
  },
});

// Keep label and caption styles consistent
export { labelStyle } from '../label/label.style';
export { captionStyle } from '../caption/caption.style';
