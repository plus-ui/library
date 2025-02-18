/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      textColor: {
        color: {
          dynamic: 'var(--text-color,var(--i-text-color))',
          base: 'var(--plus-color-text-base)',
          default: 'var(--plus-color-text-default)',
          primary: 'var(--plus-color-text-primary)',
          info: 'var(--plus-color-text-info)',
          success: 'var(--plus-color-text-success)',
          warning: 'var(--plus-color-text-warning)',
          danger: 'var(--plus-color-text-danger)',
          placeholder: 'var(--plus-color-text-placeholder)',
          caption: 'var(--plus-color-text-caption)',
          link: 'var(--plus-color-text-link)',
          visited: 'var(--plus-color-text-visited)',
          loading: 'var(--plus-color-text-loading)',
          disabled: 'var(--plus-color-text-disabled)',
          'base-invert': 'var(--plus-color-text-base-invert)',
          'default-invert': 'var(--plus-color-text-default-invert)',
          'primary-invert': 'var(--plus-color-text-primary-invert)',
          'info-invert': 'var(--plus-color-text-info-invert)',
          'success-invert': 'var(--plus-color-text-success-invert)',
          'warning-invert': 'var(--plus-color-text-warning-invert)',
          'danger-invert': 'var(--plus-color-text-danger-invert)',
          'placeholder-invert': 'var(--plus-color-text-placeholder-invert)',
          'caption-invert': 'var(--plus-color-text-caption-invert)',
          'link-invert': 'var(--plus-color-text-link-invert)',
          'visited-invert': 'var(--plus-color-text-visited-invert)',
          'loading-invert': 'var(--plus-color-text-loading-invert)',
        },
      },
      placeholderColor: {
        color: {
          default: 'var(--plus-color-text-placeholder)',
          invert: {
            default: 'var(--plus-color-text-invert-placeholder)',
          },
        },
      },
      borderColor: {
        DEFAULT: 'var(--plus-color-border-default)',
        color: {
          dynamic: 'var(--border-color,var(--i-border-color))',
          base: 'var(--plus-color-border-base)',
          default: 'var(--plus-color-border-default)',
          primary: 'var(--plus-color-border-primary)',
          info: 'var(--plus-color-border-info)',
          success: 'var(--plus-color-border-success)',
          warning: 'var(--plus-color-border-warning)',
          danger: 'var(--plus-color-border-danger)',
          ring: 'var(--plus-color-border-ring)',
          disabled: 'var(--plus-color-border-disabled)',
        },
      },
      backgroundColor: {
        color: {
          dynamic: {
            default: 'var(--bg-default,var(--i-bg-default))',
            hovered: 'var(--bg-hovered,var(--i-bg-hovered))',
            pressed: 'var(--bg-pressed,var(--i-bg-pressed))',
            focused: 'var(--bg-focused,var(--i-bg-focused))',
          },
          surface: 'var(--plus-color-background-surface)',
          disabled: 'var(--plus-color-background-disabled)',
          transparent: 'var(--plus-color-background-transparent)',
          default: {
            default: 'var(--plus-color-background-default-default)',
            hovered: 'var(--plus-color-background-default-hovered)',
            pressed: 'var(--plus-color-background-default-pressed)',
            focused: 'var(--plus-color-background-default-focused)',
            loading: 'var(--plus-color-background-default-loading)',
            invert: {
              default: 'var(--plus-color-background-default-invert-default)',
              hovered: 'var(--plus-color-background-default-invert-hovered)',
              pressed: 'var(--plus-color-background-default-invert-pressed)',
              focused: 'var(--plus-color-background-default-invert-focused)',
              loading: 'var(--plus-color-background-default-invert-loading)',
            },
          },
          primary: {
            default: 'var(--plus-color-background-primary-default)',
            hovered: 'var(--plus-color-background-primary-hovered)',
            pressed: 'var(--plus-color-background-primary-pressed)',
            focused: 'var(--plus-color-background-primary-focused)',
            loading: 'var(--plus-color-background-primary-loading)',
            invert: {
              default: 'var(--plus-color-background-primary-invert-default)',
              hovered: 'var(--plus-color-background-primary-invert-hovered)',
              pressed: 'var(--plus-color-background-primary-invert-pressed)',
              focused: 'var(--plus-color-background-primary-invert-focused)',
              loading: 'var(--plus-color-background-primary-invert-loading)',
            },
          },
          info: {
            default: 'var(--plus-color-background-info-default)',
            hovered: 'var(--plus-color-background-info-hovered)',
            pressed: 'var(--plus-color-background-info-pressed)',
            focused: 'var(--plus-color-background-info-focused)',
            loading: 'var(--plus-color-background-info-loading)',
            invert: {
              default: 'var(--plus-color-background-info-invert-default)',
              hovered: 'var(--plus-color-background-info-invert-hovered)',
              pressed: 'var(--plus-color-background-info-invert-pressed)',
              focused: 'var(--plus-color-background-info-invert-focused)',
              loading: 'var(--plus-color-background-info-invert-loading)',
            },
          },
          success: {
            default: 'var(--plus-color-background-success-default)',
            hovered: 'var(--plus-color-background-success-hovered)',
            pressed: 'var(--plus-color-background-success-pressed)',
            focused: 'var(--plus-color-background-success-focused)',
            loading: 'var(--plus-color-background-success-loading)',
            invert: {
              default: 'var(--plus-color-background-success-invert-default)',
              hovered: 'var(--plus-color-background-success-invert-hovered)',
              pressed: 'var(--plus-color-background-success-invert-pressed)',
              focused: 'var(--plus-color-background-success-invert-focused)',
              loading: 'var(--plus-color-background-success-invert-loading)',
            },
          },
          warning: {
            default: 'var(--plus-color-background-warning-default)',
            hovered: 'var(--plus-color-background-warning-hovered)',
            pressed: 'var(--plus-color-background-warning-pressed)',
            focused: 'var(--plus-color-background-warning-focused)',
            loading: 'var(--plus-color-background-warning-loading)',
            invert: {
              default: 'var(--plus-color-background-warning-invert-default)',
              hovered: 'var(--plus-color-background-warning-invert-hovered)',
              pressed: 'var(--plus-color-background-warning-invert-pressed)',
              focused: 'var(--plus-color-background-warning-invert-focused)',
              loading: 'var(--plus-color-background-warning-invert-loading)',
            },
          },
          danger: {
            default: 'var(--plus-color-background-danger-default)',
            hovered: 'var(--plus-color-background-danger-hovered)',
            pressed: 'var(--plus-color-background-danger-pressed)',
            focused: 'var(--plus-color-background-danger-focused)',
            loading: 'var(--plus-color-background-danger-loading)',
            invert: {
              default: 'var(--plus-color-background-danger-invert-default)',
              hovered: 'var(--plus-color-background-danger-invert-hovered)',
              pressed: 'var(--plus-color-background-danger-invert-pressed)',
              focused: 'var(--plus-color-background-danger-invert-focused)',
              loading: 'var(--plus-color-background-danger-invert-loading)',
            },
          },
        },
      },
      // ringColor: {
      //   DEFAULT: 'var(--plus-color-border-ring)',
      //   color: {
      //     default: 'var(--plus-color-border-ring)',
      //   },
      // },
    },
  },
};
