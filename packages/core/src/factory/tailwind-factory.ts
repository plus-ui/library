import { css, unsafeCSS, LitElement, CSSResult } from 'lit';
import tailwindCss from '../styles/global.css';

export const createTailwind = (customCss: CSSResult): typeof LitElement => {
  return class extends LitElement {
    static override styles = [
      css`
        ${unsafeCSS(tailwindCss)}
      `,
      ...(customCss
        ? [
            css`
              ${unsafeCSS(customCss)}
            `,
          ]
        : []),
    ];
  };
};
