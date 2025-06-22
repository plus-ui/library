import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { PlusAvatar } from './avatar.js';

describe('PlusAvatar', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<PlusAvatar>(html`<plus-avatar></plus-avatar>`);
      await expect(el).to.be.accessible();
    });
  });
});
