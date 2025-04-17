import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// Import the container definition to ensure it's registered
import '../toast-container/toast-container.js';

/**
 * @tag plus-service
 * @summary A utility component to automatically set up the UI infrastructure for global services.
 * Currently sets up the necessary containers for the ToastService.
 * Place this component once at the root of your application.
 * @dependency plus-toast-container
 */
@customElement('plus-service')
export class PlusService extends LitElement {
  // This component doesn't need its own shadow DOM or complex styles
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <plus-toast-container position="top-left"></plus-toast-container>
      <plus-toast-container position="top-right"></plus-toast-container>
      <plus-toast-container position="bottom-left"></plus-toast-container>
      <plus-toast-container position="bottom-right"></plus-toast-container>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'plus-service': PlusService;
  }
}
