import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import { PlusChip } from './index.js';

describe('PlusChip', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<PlusChip>(
        html`<plus-chip>Default Chip</plus-chip>`
      );
      await expect(el).to.be.accessible();
    });

    it('status variations are accessible', async () => {
      const el = await fixture<PlusChip>(html`
        <plus-chip status="success">Success Chip</plus-chip>
        <plus-chip status="warning">Warning Chip</plus-chip>
        <plus-chip status="danger">Danger Chip</plus-chip>
        <plus-chip status="info">Info Chip</plus-chip>
      `);
      await expect(el).to.be.accessible();
    });

    it('kinds are accessible', async () => {
      const el = await fixture<PlusChip>(html`
        <plus-chip kind="filled">Filled Chip</plus-chip>
        <plus-chip kind="outlined">Outlined Chip</plus-chip>
      `);
      await expect(el).to.be.accessible();
    });

    it('disabled state is accessible', async () => {
      const el = await fixture<PlusChip>(
        html`<plus-chip disabled>Disabled Chip</plus-chip>`
      );
      const chipElement = el.shadowRoot?.querySelector('div');

      await expect(el).to.be.accessible();
      expect(chipElement?.getAttribute('aria-disabled')).to.equal('true');
      expect(chipElement?.getAttribute('tabindex')).to.equal('-1');
    });

    it('dismiss button is accessible', async () => {
      const el = await fixture<PlusChip>(
        html`<plus-chip dismiss>Dismissible Chip</plus-chip>`
      );
      const dismissButton = el.shadowRoot?.querySelector('plus-icon');

      expect(dismissButton?.getAttribute('role')).to.equal('button');
      expect(dismissButton?.getAttribute('aria-label')).to.equal('Remove');
      expect(dismissButton?.getAttribute('tabindex')).to.equal('0');
    });
  });

  describe('functionality', () => {
    it('emits dismiss event when dismiss button is clicked', async () => {
      const el = await fixture<PlusChip>(
        html`<plus-chip dismiss>Dismissible Chip</plus-chip>`
      );
      const dismissButton = el.shadowRoot?.querySelector('plus-icon');

      let dismissed = false;
      el.addEventListener('dismiss', () => {
        dismissed = true;
      });

      dismissButton?.dispatchEvent(new MouseEvent('click'));
      expect(dismissed).to.equal(true);
    });

    it('does not emit dismiss event when disabled', async () => {
      const el = await fixture<PlusChip>(
        html`<plus-chip dismiss disabled>Disabled Dismissible Chip</plus-chip>`
      );
      const dismissButton = el.shadowRoot?.querySelector('plus-icon');

      let dismissed = false;
      el.addEventListener('dismiss', () => {
        dismissed = true;
      });

      dismissButton?.dispatchEvent(new MouseEvent('click'));
      expect(dismissed).to.equal(false);
    });
  });

  describe('styling', () => {
    it('applies correct status styles', async () => {
      const el = await fixture<PlusChip>(
        html`<plus-chip status="success">Success Chip</plus-chip>`
      );
      const chipElement = el.shadowRoot?.querySelector('div');

      expect(chipElement?.getAttribute('aria-label')).to.equal('success-chip');
    });

    it('applies correct size classes', async () => {
      const el = await fixture<PlusChip>(html`
        <plus-chip size="sm">Small Chip</plus-chip>
      `);
      const chipElement = el.shadowRoot?.querySelector('div');

      expect(chipElement?.classList.toString()).to.include('sm');
    });
  });
});
