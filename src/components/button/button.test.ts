import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import { PlusButton } from './index.js';

describe('PlusButton', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<PlusButton>(
        html`<plus-button>My Button</plus-button>`
      );
      await expect(el).to.be.accessible();
    });

    it('kind are accessible', async () => {
      const el = await fixture<PlusButton>(html`
        <plus-button kind="filled">My Button</plus-button>
        <plus-button kind="outlined">My Button</plus-button>
        <plus-button kind="dashed">My Button</plus-button>
        <plus-button kind="text">My Button</plus-button>
      `);
      debugger;
      await expect(el).to.be.accessible();
    });

    it('disabled is accessible', async () => {
      const el = await fixture<PlusButton>(
        html`<plus-button disabled>My Button</plus-button>`
      );
      const button = el.shadowRoot?.querySelector('button');

      await expect(el).to.be.accessible();
      await expect(button?.hasAttribute('disabled')).to.be.true;
    });
  });
});
