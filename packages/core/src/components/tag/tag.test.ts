/* eslint-disable @typescript-eslint/no-unused-expressions */
import { fixture, html, expect } from '@open-wc/testing';
import './tag';

describe('PlusTag Component', () => {
  it('renders correctly with default properties', async () => {
    const el = await fixture(html`<plus-tag>Default Tag</plus-tag>`);
    expect(el.shadowRoot?.innerHTML.trim()).to.equal(
      `
      <div
        part="tag"
        role="status"
        aria-label="Default Tag"
        class="tag antialiased flex flex-row items-center justify-center font-sans overflow-hidden py-0.5 px-1.5 gap-1.5 text-sm rounded-full bg-[var(--tag-bg-color)] text-[var(--tag-text-color)]"
      >
        <slot></slot>
      </div>
    `.trim()
    );
  });

  it('applies status variant correctly', async () => {
    const el = await fixture(
      html`<plus-tag status="success">Success Tag</plus-tag>`
    );
    expect(
      el.shadowRoot
        ?.querySelector('div')
        ?.classList.contains('bg-color-status-success-default')
    ).to.be.true;
  });

  it('applies size variant correctly', async () => {
    const el = await fixture(html`<plus-tag size="lg">Large Tag</plus-tag>`);
    expect(el.shadowRoot?.querySelector('div')?.classList.contains('text-md'))
      .to.be.true;
  });

  it('applies radius variant correctly', async () => {
    const el = await fixture(
      html`<plus-tag radius="medium">Medium Radius Tag</plus-tag>`
    );
    expect(
      el.shadowRoot?.querySelector('div')?.classList.contains('rounded-md')
    ).to.be.true;
  });

  it('applies invert variant correctly', async () => {
    const el = await fixture(html`<plus-tag invert>Inverted Tag</plus-tag>`);
    expect(el.shadowRoot?.querySelector('div')?.classList.contains('invert')).to
      .be.true;
  });

  it('sets aria-label correctly', async () => {
    const el = await fixture(
      html`<plus-tag aria-label="Custom Label">Tag with Custom Label</plus-tag>`
    );
    expect(
      el.shadowRoot?.querySelector('div')?.getAttribute('aria-label')
    ).to.equal('Custom Label');
  });
});
