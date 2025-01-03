import { css } from 'lit';

export default css`
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    box-sizing: border-box; /* 1 */
    margin: 0; /* 2 */
    padding: 0; /* 2 */
    border: 0 solid; /* 3 */
  }

  :host {
    line-height: 1.5; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    tab-size: 4; /* 3 */
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'); /* 4 */
    font-feature-settings: var(--default-font-feature-settings, normal); /* 5 */
    font-variation-settings: var(--default-font-variation-settings, normal); /* 6 */
    -webkit-tap-highlight-color: transparent; /* 7 */
  }

  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }

  :-moz-focusring {
    outline: auto;
  }

  summary {
    display: list-item;
  }

  button,
  input,
  select,
  optgroup,
  textarea,
  ::file-selector-button {
    font: inherit; /* 1 */
    font-feature-settings: inherit; /* 1 */
    font-variation-settings: inherit; /* 1 */
    letter-spacing: inherit; /* 1 */
    color: inherit; /* 1 */
    border-radius: 0; /* 2 */
    background-color: transparent; /* 3 */
    opacity: 1; /* 4 */
  }

  ::file-selector-button {
    margin-inline-end: 4px;
  }

  ::placeholder {
    opacity: 1; /* 1 */
    color: color-mix(in oklab, currentColor 50%, transparent); /* 2 */
  }

  textarea {
    resize: vertical;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-date-and-time-value {
    min-height: 1lh; /* 1 */
    text-align: inherit; /* 2 */
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
`;
