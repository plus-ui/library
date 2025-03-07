import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { PlusAlert } from './alert.js';

describe('PlusAlert', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<PlusAlert>(html`<plus-alert></plus-alert>`);
      await expect(el).to.be.accessible();
    });
  });
});
