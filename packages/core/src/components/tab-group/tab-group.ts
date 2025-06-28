import { html, css } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { booleanConverter } from '../../utils/boolean-converter';
import Tailwind from '../base/tailwind-base';
import { tabStyle } from '../tab/styles';

// Import Tab and TabPanel component types
import { PlusTab } from '../tab/tab';
import { PlusTabPanel } from '../tab-panel/tab-panel';

/**
 * @tag plus-tab-group
 * @summary Tab group component that manages a set of tabs and panels.
 *
 * @slot tablist - Slot for tabs
 * @slot panels - Slot for tab panels
 *
 * @csspart group - The component's base wrapper
 * @csspart tablist - The tabs container
 * @csspart panels - The tab panels container
 * @csspart indicator - The animated indicator element (when animated=true)
 *
 * @cssproperty --tabs-gap - Controls the gap between tabs
 * @cssproperty --tabs-indicator-color - Controls the color of the active tab indicator
 * @cssproperty --tabs-indicator-height - Controls the height of the animated indicator
 *
 * @event plus-tabs-change - Emitted when a tab is selected with the tab's value
 *
 * @example
 * ```html
 * <plus-tab-group>
 *   <plus-tab value="tab1" slot="tablist">Tab 1</plus-tab>
 *   <plus-tab value="tab2" slot="tablist">Tab 2</plus-tab>
 *   <plus-tab-panel value="tab1" slot="panels">Content 1</plus-tab-panel>
 *   <plus-tab-panel value="tab2" slot="panels">Content 2</plus-tab-panel>
 * </plus-tab-group>
 * ```
 */
export default class PlusTabGroup extends Tailwind {
  static override styles = [
    ...Tailwind.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .tab-panels {
        width: 100%;
      }

      .tablist-wrapper {
        position: relative;
      }

      .tab-indicator {
        position: absolute;
        bottom: 0;
        height: 2px;
        background-color: var(
          --tabs-indicator-color,
          var(--plus-color-background-primary-default)
        );
        transition: all 0.25s ease;
        z-index: 10;
        opacity: 1;
        visibility: visible;
      }

      :host([orientation='vertical']) .tab-indicator {
        width: 2px;
        right: 0;
        left: auto;
        height: auto;
        bottom: auto;
      }
    `,
  ];

  /**
   * Sets the size of the tabs
   * - sm: Small size
   * - md: Medium size
   * - lg: Large size
   * @default 'md'
   */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Sets the orientation of the tabs
   * - horizontal: Tabs arranged horizontally
   * - vertical: Tabs arranged vertically
   * @default 'horizontal'
   */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Disables all tabs
   * @default false
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
  })
  disabled = false;

  /**
   * Allows individual tabs to be dismissed (closed).
   * @default false
   */
  @property({
    type: Boolean,
    converter: booleanConverter,
  })
  dismissible = false;

  /**
   * Currently active tab value
   */
  @property({ type: String })
  value = '';

  /**
   * Enables animated sliding indicator for active tab
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: booleanConverter,
  })
  animated = false;

  /**
   * References to DOM elements
   */
  @query('slot[name="tablist"]') private tablistSlot!: HTMLSlotElement;
  @query('slot[name="panels"]') private panelsSlot!: HTMLSlotElement;
  @query('.tab-indicator') private indicator!: HTMLDivElement | null;

  /**
   * Internal state to track tabs and panels
   */
  @state() private tabs: PlusTab[] = [];
  @state() private panels: PlusTabPanel[] = [];

  // Observer instances for resize and mutation events
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;

  constructor() {
    super();
    this.addEventListener(
      'plus-tab-click',
      this.handleTabClick as EventListener
    );
    this.addEventListener(
      'plus-tab-dismiss',
      this.handleTabDismiss as EventListener
    );
  }

  override connectedCallback() {
    super.connectedCallback();
    // Initialize resize observer
    this.resizeObserver = new ResizeObserver(() => this.updateIndicator());
    this.resizeObserver.observe(this);

    // Initialize mutation observer to watch for DOM changes
    this.mutationObserver = new MutationObserver(() => this.updateIndicator());
    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['active'],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  /**
   * Get all tabs from the tablist slot
   */
  private getTabs(): PlusTab[] {
    if (!this.tablistSlot) return [];

    return [...this.tablistSlot.assignedElements({ flatten: true })].filter(
      (el): el is PlusTab => el.tagName.toLowerCase() === 'plus-tab'
    ) as PlusTab[];
  }

  /**
   * Get all panels from the panels slot
   */
  private getPanels(): PlusTabPanel[] {
    if (!this.panelsSlot) return [];

    return [...this.panelsSlot.assignedElements({ flatten: true })].filter(
      (el): el is PlusTabPanel => el.tagName.toLowerCase() === 'plus-tab-panel'
    ) as PlusTabPanel[];
  }

  /**
   * Handle tab slot change
   */
  private handleTabsSlotChange() {
    this.tabs = this.getTabs();
    this.syncTabsWithPanels();

    // Update indicator when tabs change
    setTimeout(() => this.updateIndicator(), 10);
  }

  /**
   * Handle panels slot change
   */
  private handlePanelsSlotChange() {
    this.panels = this.getPanels();
    this.syncTabsWithPanels();
  }

  /**
   * Updates the indicator position and size
   */
  private updateIndicator() {
    if (!this.animated || !this.indicator) return;

    // Find the active tab
    const activeTab = this.tabs.find((tab) => tab.active);
    if (!activeTab) return;

    const tabElement = activeTab as HTMLElement;
    const tabRect = tabElement.getBoundingClientRect();
    const containerRect = this.getBoundingClientRect();

    if (this.orientation === 'horizontal') {
      // Calculate position for horizontal orientation
      const left = tabRect.left - containerRect.left;
      const width = tabRect.width;

      // Set style properties
      this.indicator.style.left = `${left}px`;
      this.indicator.style.width = `${width}px`;
      this.indicator.style.top = '';
      this.indicator.style.height = '2px'; // Horizontal line thickness
    } else {
      // Calculate position for vertical orientation
      const top = tabRect.top - containerRect.top;
      const height = tabRect.height;

      // Set style properties
      this.indicator.style.top = `${top}px`;
      this.indicator.style.height = `${height}px`;
      this.indicator.style.left = '';
      this.indicator.style.width = '2px'; // Vertical line thickness
    }

    // Ensure indicator is visible
    this.indicator.style.display = 'block';
  }

  /**
   * Synchronize tabs with panels and apply properties
   */
  private syncTabsWithPanels() {
    // If there's no active tab and we have tabs, activate the first one
    if (!this.value && this.tabs.length > 0) {
      const firstTab = this.tabs[0];
      this.value = firstTab.value;
    }

    // Update all tabs with current properties
    this.tabs.forEach((tab) => {
      tab.active = tab.value === this.value;
      tab.size = this.size;
      tab.orientation = this.orientation;
      tab.disabled = this.disabled || tab.disabled;
      tab.dismissible = this.dismissible || tab.dismissible;
      tab.animated = this.animated;
    });

    // Update all panels
    this.panels.forEach((panel) => {
      panel.active = panel.value === this.value;
    });

    // Update indicator position
    setTimeout(() => this.updateIndicator(), 10);
  }

  /**
   * Handle tab click event
   */
  private handleTabClick(event: CustomEvent) {
    const newValue = event.detail.value;
    if (newValue !== this.value) {
      this.value = newValue;
      this.syncTabsWithPanels();
      this.emit('plus-tabs-change', { detail: { value: newValue } });
    }
  }

  /**
   * Handle tab dismiss event
   */
  private handleTabDismiss(event: CustomEvent) {
    const dismissedValue = event.detail.value;
    const dismissedTab = this.tabs.find((tab) => tab.value === dismissedValue);
    const dismissedPanel = this.panels.find(
      (panel) => panel.value === dismissedValue
    );

    // Remove dismissed tab and panel from DOM
    if (dismissedTab) dismissedTab.remove();
    if (dismissedPanel) dismissedPanel.remove();

    // Update internal state
    this.tabs = this.getTabs();
    this.panels = this.getPanels();

    // If we dismissed the active tab, activate the first remaining tab
    if (dismissedValue === this.value && this.tabs.length > 0) {
      const firstTab = this.tabs[0];
      this.value = firstTab.value;
      this.syncTabsWithPanels();
      this.emit('plus-tabs-change', { detail: { value: this.value } });
    }

    // Update indicator after dismissal
    setTimeout(() => this.updateIndicator(), 100);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // Update indicator after relevant property changes
    if (
      changedProperties.has('value') ||
      changedProperties.has('orientation') ||
      changedProperties.has('animated')
    ) {
      setTimeout(() => this.updateIndicator(), 10);
    }
  }

  override render() {
    const { orientation, animated } = this;
    const { tabGroup, tabHeader } = tabStyle({ orientation });

    return html`
      <div part="group" class=${tabGroup()}>
        <div part="tablist" class="tablist-wrapper ${tabHeader()}">
          <slot name="tablist" @slotchange=${this.handleTabsSlotChange}></slot>
          ${animated
            ? html`<div part="indicator" class="tab-indicator"></div>`
            : ''}
        </div>
        <div part="panels" class="tab-panels">
          <slot name="panels" @slotchange=${this.handlePanelsSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export { PlusTabGroup };
