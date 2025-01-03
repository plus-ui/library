/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      textColor: {
        color: {
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
          invert: {
            base: 'var(--plus-color-text-invert-base)',
            default: 'var(--plus-color-text-invert-default)',
            primary: 'var(--plus-color-text-invert-primary)',
            info: 'var(--plus-color-text-invert-info)',
            success: 'var(--plus-color-text-invert-success)',
            warning: 'var(--plus-color-text-invert-warning)',
            danger: 'var(--plus-color-text-invert-danger)',
            placeholder: 'var(--plus-color-text-invert-placeholder)',
            caption: 'var(--plus-color-text-invert-caption)',
            link: 'var(--plus-color-text-invert-link)',
            visited: 'var(--plus-color-text-invert-visited)',
            loading: 'var(--plus-color-text-invert-loading)',
          },
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
          surface: 'var(--plus-color-background-surface)',
          disabled: 'var(--plus-color-background-disabled)',
          transparent: 'var(--plus-color-background-transparent)',

          neutral: {
            default: 'var(--plus-color-background-neutral-default)',
            hovered: 'var(--plus-color-background-neutral-hovered)',
            pressed: 'var(--plus-color-background-neutral-pressed)',
            focused: 'var(--plus-color-background-neutral-focused)',
            loading: 'var(--plus-color-background-neutral-loading)',
          },
          primary: {
            default: 'var(--plus-color-background-primary-default)',
            hovered: 'var(--plus-color-background-primary-hovered)',
            pressed: 'var(--plus-color-background-primary-pressed)',
            focused: 'var(--plus-color-background-primary-focused)',
            loading: 'var(--plus-color-background-primary-loading)',
          },
          invert: {
            neutral: {
              default: 'var(--plus-color-background-invert-neutral-default)',
              hovered: 'var(--plus-color-background-invert-neutral-hovered)',
              pressed: 'var(--plus-color-background-invert-neutral-pressed)',
              focused: 'var(--plus-color-background-invert-neutral-focused)',
              loading: 'var(--plus-color-background-invert-neutral-loading)',
            },
            primary: {
              default: 'var(--plus-color-background-invert-primary-default)',
              hovered: 'var(--plus-color-background-invert-primary-hovered)',
              pressed: 'var(--plus-color-background-invert-primary-pressed)',
              focused: 'var(--plus-color-background-invert-primary-focused)',
              loading: 'var(--plus-color-background-invert-primary-loading)',
            },
          },
          status: {
            info: {
              default: 'var(--plus-color-background-status-info-default)',
              hovered: 'var(--plus-color-background-status-info-hovered)',
              pressed: 'var(--plus-color-background-status-info-pressed)',
              focused: 'var(--plus-color-background-status-info-focused)',
              loading: 'var(--plus-color-background-status-info-loading)',
            },
            success: {
              default: 'var(--plus-color-background-status-success-default)',
              hovered: 'var(--plus-color-background-status-success-hovered)',
              pressed: 'var(--plus-color-background-status-success-pressed)',
              focused: 'var(--plus-color-background-status-success-focused)',
              loading: 'var(--plus-color-background-status-success-loading)',
            },
            warning: {
              default: 'var(--plus-color-background-status-warning-default)',
              hovered: 'var(--plus-color-background-status-warning-hovered)',
              pressed: 'var(--plus-color-background-status-warning-pressed)',
              focused: 'var(--plus-color-background-status-warning-focused)',
              loading: 'var(--plus-color-background-status-warning-loading)',
            },
            danger: {
              default: 'var(--plus-color-background-status-danger-default)',
              hovered: 'var(--plus-color-background-status-danger-hovered)',
              pressed: 'var(--plus-color-background-status-danger-pressed)',
              focused: 'var(--plus-color-background-status-danger-focused)',
              loading: 'var(--plus-color-background-status-danger-loading)',
            },
            invert: {
              info: {
                default: 'var(--plus-color-background-status-invert-info-default)',
                hovered: 'var(--plus-color-background-status-invert-info-hovered)',
                pressed: 'var(--plus-color-background-status-invert-info-pressed)',
                focused: 'var(--plus-color-background-status-invert-info-focused)',
                loading: 'var(--plus-color-background-status-invert-info-loading)',
              },
              success: {
                default: 'var(--plus-color-background-status-invert-success-default)',
                hovered: 'var(--plus-color-background-status-invert-success-hovered)',
                pressed: 'var(--plus-color-background-status-invert-success-pressed)',
                focused: 'var(--plus-color-background-status-invert-success-focused)',
                loading: 'var(--plus-color-background-status-invert-success-loading)',
              },
              warning: {
                default: 'var(--plus-color-background-status-invert-warning-default)',
                hovered: 'var(--plus-color-background-status-invert-warning-hovered)',
                pressed: 'var(--plus-color-background-status-invert-warning-pressed)',
                focused: 'var(--plus-color-background-status-invert-warning-focused)',
                loading: 'var(--plus-color-background-status-invert-warning-loading)',
              },
              danger: {
                default: 'var(--plus-color-background-status-invert-danger-default)',
                hovered: 'var(--plus-color-background-status-invert-danger-hovered)',
                pressed: 'var(--plus-color-background-status-invert-danger-pressed)',
                focused: 'var(--plus-color-background-status-invert-danger-focused)',
                loading: 'var(--plus-color-background-status-invert-danger-loading)',
              },
            },
          },
        },
      },
      ringColor: {
        DEFAULT: 'var(--plus-color-border-ring)',
        color: {
          default: 'var(--plus-color-border-ring)',
        },
      },
    },
  },
};
