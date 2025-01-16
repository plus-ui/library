import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { PlusButton } from './button.js';

describe('PlusButton', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<PlusButton>(html`<plus-button></plus-button>`);
      await expect(el).to.be.accessible();
    });
  });
});
