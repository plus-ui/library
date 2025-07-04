export interface ChangelogEntry {
  version: string;
  date: string;
  component: string;
  type:
    | "feature"
    | "fix"
    | "refactor"
    | "docs"
    | "deps"
    | "release"
    | "breaking"
    | "improvement"
    | "performance";
  description: string;
  details?: string[];
}

const changelogData: ChangelogEntry[] = [
  // v1.0.1
  {
    version: "1.0.1",
    date: "2025-07-05",
    component: "global",
    type: "improvement",
    description:
      "Simplified the documentation overview page for a more user-friendly and focused getting-started experience.",
    details: [
      "Removed lengthy sections to reduce cognitive load.",
      "Introduced 'Core Features' and 'Where to Start?' sections to provide clear guidance for new users.",
      "Re-added the hero image to create a better visual balance.",
    ],
  },
  {
    version: "1.0.1",
    date: "2025-07-05",
    component: "global",
    type: "docs",
    description: "Improved getting started documentation.",
    details: [
      "Updated the overview page to be more concise and beginner-friendly.",
    ],
  },

  // 🚀 INITIAL RELEASE - v1.0.0
  {
    version: "1.0.0",
    date: "2025-07-01",
    component: "global",
    type: "release",
    description: "🎉 Plus UI Library Initial Release",
    details: [
      "Complete design system with 30+ components",
      "Built with Lit 3.x and TypeScript",
      "Tailwind CSS integration with custom design tokens",
      "Full accessibility support (WCAG 2.1 AA)",
      "Cross-browser compatibility",
      "Comprehensive documentation and examples",
      "MIT License for commercial use",
    ],
  },

  // EPIC #73 - Icon System Unification
  {
    version: "1.0.0",
    date: "2025-06-28",
    component: "global",
    type: "breaking",
    description: "Unified the icon system and removed FontAwesome dependency.",
    details: [
      "Replaced FontAwesome with a custom, in-house SVG icon system to improve performance and reduce bundle size.",
      "This is a breaking change for any implementation that relied on FontAwesome classes or the `<plus-icon>` component's previous API.",
      "See the new Icon documentation for migration details.",
      'This change is part of the "Icon System Unification" EPIC (#73).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-28",
    component: "global",
    type: "performance",
    description: "Reduced icon system bundle size by ~82% (~450KB).",
    details: [
      "Eliminating the FontAwesome dependency significantly cut down on the library's footprint.",
      'This change is part of the "Icon System Unification" EPIC (#73).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-28",
    component: "icon",
    type: "feature",
    description:
      "Introduced a new, unified SVG icon system with expanded features.",
    details: [
      "Added a local registry for 32+ core icons with CDN fallback.",
      "Implemented `solid`, `regular`, and `light` style variants.",
      "Added `sm`, `md`, `lg`, and `xl` size variants.",
      'This change is part of the "Icon System Unification" EPIC (#73).',
    ],
  },

  // EPIC #72 - Form System Critical Fixes
  {
    version: "1.0.0",
    date: "2025-06-26",
    component: "button",
    type: "fix",
    description: "Fixed the `full-width` prop not working correctly.",
    details: [
      "Adjusted host element CSS (`display: inline-block`) that was preventing the component from expanding to full width.",
      'This change is part of the "Form System Critical Fixes" EPIC (#72).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-26",
    component: "input",
    type: "fix",
    description:
      "Corrected the icon mapping for the password visibility toggle.",
    details: [
      "The `eye` and `eye-slash` icons were reversed and now show the correct state.",
      'This change is part of the "Form System Critical Fixes" EPIC (#72).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-26",
    component: "select",
    type: "fix",
    description: "Resolved dropdown positioning and z-index issues.",
    details: [
      "Fixed issues where the select dropdown would be overlapped by other elements or misaligned.",
      'This change is part of the "Form System Critical Fixes" EPIC (#72).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-26",
    component: "checkbox-group",
    type: "fix",
    description:
      "Ensured the `disabled` state correctly propagates to all child checkboxes.",
    details: [
      "When a checkbox group was disabled, child checkboxes were not inheriting the state. This is now fixed.",
      'This change is part of the "Form System Critical Fixes" EPIC (#72).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-26",
    component: "button-group",
    type: "fix",
    description: "Fixed broken property override logic for child buttons.",
    details: [
      "Properties set on the button group now correctly apply to the child buttons.",
      'This change is part of the "Form System Critical Fixes" EPIC (#72).',
    ],
  },

  // EPIC #71 - Boolean Props Standardization
  {
    version: "1.0.0",
    date: "2025-06-24",
    component: "global",
    type: "breaking",
    description:
      'Changed boolean attribute handling: `attr="false"` now correctly evaluates to `false`.',
    details: [
      'Previously, the presence of a boolean attribute (e.g., `<plus-button disabled="false">`) was treated as `true`. Now, the string `"false"` correctly evaluates to `false`.',
      "This change makes component behavior more predictable and aligned with web standards.",
      "This is a breaking change for any implementation that relied on the old behavior.",
      'This change is part of the "Boolean Props Standardization" EPIC (#71).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-24",
    component: "global",
    type: "refactor",
    description: "Standardized boolean property reflection to attributes.",
    details: [
      "Applied `reflect: true` to all state-affecting boolean properties across multiple components.",
      "Ensures component state (e.g., `disabled`, `checked`, `readonly`) is mirrored to a DOM attribute.",
      "Improves styleability with CSS and component interoperability.",
      'This change is part of the "Boolean Props Standardization" EPIC (#71).',
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-24",
    component: "global",
    type: "refactor",
    description:
      "Standardized boolean property handling via `booleanConverter` utility.",
    details: [
      "Refactored all components with boolean properties to use a single, consistent converter.",
      "Eliminated 4 different patterns for boolean conversion, improving maintainability.",
      "Ensures correct behavior for both property binding and HTML attributes (e.g., `<plus-button disabled>`).",
      'This change is part of the "Boolean Props Standardization" EPIC (#71).',
    ],
  },

  // INITIAL FEATURES
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "button",
    type: "feature",
    description: "Added Button component with multiple variants",
    details: [
      "4 visual styles: filled, outlined, dashed, text",
      "6 status variants: default, primary, success, warning, danger, info",
      "3 sizes: sm, md, lg",
      "Loading state with spinner",
      "Full-width support",
      "Form integration with proper ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "input",
    type: "feature",
    description: "Added Input component with validation support",
    details: [
      "Multiple input types: text, email, password, number, search, tel, url",
      "Built-in validation with error states",
      "Prefix and suffix icons",
      "Clear button functionality",
      "Password visibility toggle",
      "Full accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "textarea",
    type: "feature",
    description: "Added Textarea component for multi-line input",
    details: [
      "Resizable textarea with size controls",
      "Character count and limits",
      "Validation with error messages",
      "Auto-resize functionality",
      "Form integration",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "checkbox",
    type: "feature",
    description: "Added Checkbox component with group support",
    details: [
      "Individual checkbox with label",
      "Indeterminate state support",
      "Form integration with proper validation",
      "Accessibility with ARIA attributes",
      "Custom styling with design tokens",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "checkbox-group",
    type: "feature",
    description: "Added Checkbox Group for multiple selections",
    details: [
      "Horizontal and vertical layouts",
      "Group-level disabled state",
      "Value array management",
      "Form integration",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "radio",
    type: "feature",
    description: "Added Radio component for single selection",
    details: [
      "Individual radio with label",
      "Form integration",
      "Accessibility support",
      "Custom styling",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "radio-group",
    type: "feature",
    description: "Added Radio Group for single selection groups",
    details: [
      "Horizontal and vertical layouts",
      "Group-level disabled state",
      "Form integration",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "select",
    type: "feature",
    description: "Added Select component with dropdown",
    details: [
      "Customizable dropdown with floating UI",
      "Multiple selection support",
      "Search and filter functionality",
      "Keyboard navigation",
      "Accessibility with ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "toggle",
    type: "feature",
    description: "Added Toggle component for boolean states",
    details: [
      "On/off state management",
      "Custom icons for active/inactive states",
      "Form integration",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "tab",
    type: "feature",
    description: "Added Tab component for navigation",
    details: [
      "Horizontal and vertical orientations",
      "Prefix and suffix icons",
      "Dismissible tabs",
      "Animated indicators",
      "Accessibility with ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "tab-group",
    type: "feature",
    description: "Added Tab Group for tab management",
    details: [
      "Tab state management",
      "Keyboard navigation",
      "Accessibility support",
      "Event handling",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "breadcrumb",
    type: "feature",
    description: "Added Breadcrumb component for navigation",
    details: [
      "Hierarchical navigation display",
      "Prefix and suffix icons",
      "Separator customization",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "accordion",
    type: "feature",
    description: "Added Accordion component for collapsible content",
    details: [
      "Individual accordion with expand/collapse",
      "Group support with single/multiple expansion",
      "Custom icons and animations",
      "Accessibility with ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "alert",
    type: "feature",
    description: "Added Alert component for user feedback",
    details: [
      "5 status variants: default, success, warning, danger, info",
      "Dismissible alerts",
      "Custom icons and messages",
      "Accessibility with ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "toast",
    type: "feature",
    description: "Added Toast component for notifications",
    details: [
      "Multiple status variants",
      "Auto-dismiss functionality",
      "Custom duration settings",
      "Position management",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "tooltip",
    type: "feature",
    description: "Added Tooltip component for contextual help",
    details: [
      "Multiple positioning options",
      "Custom content support",
      "Hover and focus triggers",
      "Accessibility with ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "popover",
    type: "feature",
    description: "Added Popover component for rich content",
    details: [
      "Rich content support with slots",
      "Multiple positioning options",
      "Custom triggers (click, hover)",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "avatar",
    type: "feature",
    description: "Added Avatar component for user representation",
    details: [
      "Image, icon, and text fallbacks",
      "Multiple sizes: xs, sm, md, lg, xl",
      "Circle and square shapes",
      "Inverted color scheme support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "badge",
    type: "feature",
    description: "Added Badge component for status indicators",
    details: [
      "Multiple status variants",
      "Dot and count styles",
      "Customizable content",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "chip",
    type: "feature",
    description: "Added Chip component for tags and labels",
    details: [
      "Multiple status variants",
      "Dismissible chips",
      "Custom icons",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "rating",
    type: "feature",
    description: "Added Rating component for star ratings",
    details: [
      "Customizable star count",
      "Half-star precision support",
      "Read-only and interactive modes",
      "Custom icons support",
      "Accessibility with ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "modal",
    type: "feature",
    description: "Added Modal component for dialogs",
    details: [
      "Multiple sizes: sm, md, lg",
      "Custom header, body, and footer slots",
      "Backdrop click to close",
      "Keyboard navigation (Escape to close)",
      "Accessibility with ARIA attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "drawer",
    type: "feature",
    description: "Added Drawer component for side panels",
    details: [
      "4 positions: left, right, top, bottom",
      "Multiple sizes: sm, md, lg",
      "Custom header, body, and footer slots",
      "Smooth animations",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "dropdown",
    type: "feature",
    description: "Added Dropdown component for menus",
    details: [
      "Customizable trigger elements",
      "Multiple positioning options",
      "Keyboard navigation",
      "Accessibility support",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "divider",
    type: "feature",
    description: "Added Divider component for content separation",
    details: [
      "Horizontal and vertical orientations",
      "Content support with positioning",
      "Multiple styles: solid, dashed, dotted",
      "Customizable thickness",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "link",
    type: "feature",
    description: "Added Link component for navigation",
    details: [
      "Internal and external link support",
      "Multiple visual styles",
      "Icon support",
      "Accessibility attributes",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "text",
    type: "feature",
    description: "Added Text component for typography",
    details: [
      "Multiple heading levels",
      "Body text variants",
      "Customizable colors and sizes",
      "Semantic HTML elements",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "segmented-picker",
    type: "feature",
    description: "Added Segmented Picker for option selection",
    details: [
      "Multiple selection modes",
      "Customizable options",
      "Accessibility support",
      "Form integration",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-20",
    component: "popconfirm",
    type: "feature",
    description: "Added Popconfirm for confirmation dialogs",
    details: [
      "Confirmation before action",
      "Customizable messages",
      "Multiple status variants",
      "Accessibility support",
    ],
  },

  // TECHNICAL IMPROVEMENTS
  {
    version: "1.0.0",
    date: "2025-06-18",
    component: "global",
    type: "improvement",
    description: "Design system foundation",
    details: [
      "CSS custom properties for theming",
      "Consistent spacing scale",
      "Typography system",
      "Color palette with semantic variants",
      "Icon system with SVG icons",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-18",
    component: "global",
    type: "improvement",
    description: "Accessibility features",
    details: [
      "WCAG 2.1 AA compliance",
      "Keyboard navigation support",
      "Screen reader compatibility",
      "Focus management",
      "ARIA attributes implementation",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-06-18",
    component: "global",
    type: "improvement",
    description: "Performance optimizations",
    details: [
      "Tree-shaking support",
      "Minimal bundle size",
      "Lazy loading capabilities",
      "Efficient rendering with Lit",
      "Optimized CSS delivery",
    ],
  },
];

export default changelogData;
