import { css } from 'lit';
import { tv } from 'tailwind-variants';

export const baseDividerStyle = tv({
  slots: {
    base: [
      'plus-divider',
      'plus-ui-element',
      'flex items-center justify-center',
    ],
    line: 'plus-divider-line',
    slotArea: 'text-sm text-color-caption',
  },
  variants: {
    orientation: {
      horizontal: {
        base: 'horizontal-divider',
        line: '',
      },
      vertical: {
        base: 'vertical-divider',
        line: '',
      },
    },
    kind: {
      solid: {
        base: 'divider-solid',
        line: '',
      },
      dashed: {
        base: 'divider-dashed',
        line: '',
      },
      dotted: {
        base: 'divider-dotted',
        line: '',
      },
    },
    hasContent: {
      true: {
        slotArea: 'mx-(--divider-spacing)',
      },
      false: {
        slotArea: '',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    kind: 'solid',
    hasContent: false,
  },
});

export const dividerStyle = css`
  :host {
    --divider-color: var(
      --plus-color-background-divider
    );
    --divider-thickness-thin: 1px;
    --divider-thickness-medium: 2px;
    --divider-thickness-thick: 4px;
    --divider-spacing: 8px;
    --divider-type: solid;
  }

  :host([orientation='horizontal']) {
    width: 100%;
    display: block;
    margin: var(--divider-spacing) 0;
  }

  :host([orientation='vertical']) {
    height: 100%;
    margin: 0 var(--divider-spacing);
    display: inline-block;
  }

  :host([orientation='horizontal'])
    .plus-divider {
    height: 0;
    width: 100%;
  }
  :host([orientation='horizontal'])
    .plus-divider-line {
    height: 0;
    width: 100%;
    border-top-width: var(
      --divider-thickness,
      var(--divider-thickness-thin)
    );
    border-top-style: var(--divider-type, solid);
    border-color: var(--divider-color);
  }

  :host([orientation='vertical']) .plus-divider {
    width: 0;
    height: 100%;
  }
  :host([orientation='vertical'])
    .plus-divider-line {
    width: 0;
    height: 100%;
    border-left-width: var(
      --divider-thickness,
      var(--divider-thickness-thin)
    );
    border-left-style: var(--divider-type, solid);
    border-color: var(--divider-color);
    display: inline-block;
  }

  :host([Kind='dashed'][orientation='horizontal'])
    .plus-divider-line {
    border-top-style: dashed;
  }

  :host([Kind='dotted'][orientation='horizontal'])
    .plus-divider-line {
    border-top-style: dotted;
  }

  :host([Kind='dashed'][orientation='vertical'])
    .plus-divider-line {
    border-left-style: dashed;
  }

  :host([Kind='dotted'][orientation='vertical'])
    .plus-divider-line {
    border-left-style: dotted;
  }

  :host([thickness='thin']) {
    --divider-thickness: var(
      --divider-thickness-thin
    );
  }

  :host([thickness='medium']) {
    --divider-thickness: var(
      --divider-thickness-medium
    );
  }

  :host([thickness='thick']) {
    --divider-thickness: var(
      --divider-thickness-thick
    );
  }
`;
