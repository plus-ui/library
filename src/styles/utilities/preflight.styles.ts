import { css } from 'lit';

export default css`
  @layer base {
    *,
    ::after,
    ::before,
    ::backdrop,
    ::file-selector-button {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0 solid;
    }

    html,
    :host {
      line-height: 1.5;
      -webkit-text-size-adjust: 100%;
      tab-size: 4;
      font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji');
      font-feature-settings: var(--default-font-feature-settings, normal);
      font-variation-settings: var(--default-font-variation-settings, normal);
      -webkit-tap-highlight-color: transparent;
    }

    body {
      line-height: inherit;
    }

    a {
      color: inherit;
      -webkit-text-decoration: inherit;
      text-decoration: inherit;
    }

    b,
    strong {
      font-weight: bolder;
    }

    :-moz-focusring {
      outline: auto;
    }

    progress {
      vertical-align: baseline;
    }

    summary {
      display: list-item;
    }

    ol,
    ul,
    menu {
      list-style: none;
    }

    img,
    svg {
      display: block;

      vertical-align: middle;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    button,
    input,
    select,
    optgroup,
    textarea,
    ::file-selector-button {
      font: inherit;

      font-feature-settings: inherit;

      font-variation-settings: inherit;

      letter-spacing: inherit;

      color: inherit;

      border-radius: 0;

      background-color: transparent;

      opacity: 1;
    }

    :where(select:is([multiple], [size])) optgroup {
      font-weight: bolder;
    }

    :where(select:is([multiple], [size])) optgroup option {
      padding-inline-start: 20px;
    }

    ::file-selector-button {
      margin-inline-end: 4px;
    }

    ::placeholder {
      opacity: 1;

      color: color-mix(in oklab, currentColor 50%, transparent);
    }

    textarea {
      resize: vertical;
    }

    ::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    ::-webkit-date-and-time-value {
      min-height: 1lh;

      text-align: inherit;
    }

    ::-webkit-datetime-edit {
      display: inline-flex;
    }

    ::-webkit-datetime-edit-fields-wrapper {
      padding: 0;
    }

    ::-webkit-datetime-edit,
    ::-webkit-datetime-edit-year-field,
    ::-webkit-datetime-edit-month-field,
    ::-webkit-datetime-edit-day-field,
    ::-webkit-datetime-edit-hour-field,
    ::-webkit-datetime-edit-minute-field,
    ::-webkit-datetime-edit-second-field,
    ::-webkit-datetime-edit-millisecond-field,
    ::-webkit-datetime-edit-meridiem-field {
      padding-block: 0;
    }

    :-moz-ui-invalid {
      box-shadow: none;
    }

    button,
    input:where([type='button'], [type='reset'], [type='submit']),
    ::file-selector-button {
      appearance: button;
    }

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      height: auto;
    }

    [hidden]:where(:not([hidden='until-found'])) {
      display: none !important;
    }
  }
`;
