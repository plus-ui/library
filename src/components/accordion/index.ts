import { PlusAccordion } from './accordion.js';
import { PlusAccordionGroup } from './accordion-group.js';
import { PlusAccordionHeader } from './accordion-header.js';
import { PlusAccordionHelper } from './accordion-helper.js';
import { PlusAccordionPanel } from './accordion-panel.js';

export type * from './accordion.js';
export type * from './accordion-group.js';
export type * from './accordion-header.js';
export type * from './accordion-helper.js';
export type * from './accordion-panel.js';

customElements.define('plus-accordion', PlusAccordion);
customElements.define('plus-accordion-group', PlusAccordionGroup);
customElements.define('plus-accordion-header', PlusAccordionHeader);
customElements.define('plus-accordion-helper', PlusAccordionHelper);
customElements.define('plus-accordion-panel', PlusAccordionPanel);
