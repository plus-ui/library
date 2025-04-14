import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * A reactive controller that determines if a slot exists and if it has assigned content.
 */
export class SlotController implements ReactiveController {
  host: ReactiveControllerHost & Element;

  constructor(host: ReactiveControllerHost & Element) {
    (this.host = host).addController(this);
  }

  private hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      // Check for non-empty text nodes or any element node
      return (
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
        node.nodeType === Node.ELEMENT_NODE
      );
    });
  }

  public hasNamedSlot(name: string): boolean {
    const slot = this.host.shadowRoot?.querySelector<HTMLSlotElement>(
      `slot[name="${name}"]`
    );
    if (!slot) {
      // Fallback for light DOM usage or if shadowRoot is not yet available
      const slottedElements = this.host.querySelectorAll(`[slot="${name}"]`);
      return slottedElements.length > 0;
    }
    return slot.assignedNodes({ flatten: true }).length > 0;
  }

  /**
   * Checks if the specified slot (or the default slot if no name is passed) has content.
   * @param slotName - The name of the slot to check. Defaults to the default slot.
   * @returns True if the slot has assigned content, false otherwise.
   */
  test(slotName?: string): boolean {
    return slotName ? this.hasNamedSlot(slotName) : this.hasDefaultSlot();
  }

  hostConnected() {
    // No-op for this simple controller
  }

  hostDisconnected() {
    // No-op for this simple controller
  }
}
