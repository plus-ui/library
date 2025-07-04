# ContributingLinks Component

A reusable component that displays a set of branded links to community and contribution platforms.

## Features

- **🔗 Centralized Links**: Manages all community links in one data structure.
- **🎨 Tailwind Styled**: Fully styled with Tailwind CSS for consistency with the project's design system.
- **⚫ Dynamic Rendering**: Links are dynamically rendered from an array, making it easy to add, remove, or update them.
- **✨ Icon Support**: Uses Starlight icons for visual branding of each link.
- **♿ Accessibility**: Links include `target="_blank"` and `rel="noopener noreferrer"` for security and user experience.

## Usage

```astro
---
import ContributingLinks from './plus-ui/contributing-links/ContributingLinks.astro';
---

<ContributingLinks />
```

## Component Architecture

### Data Structure

The component uses a simple array of objects to define the links. Each object has `href`, `icon`, and `text` properties.

```typescript
const links = [
  { href: "https://www.figma.com/@plusui", icon: "figma", text: "Figma" },
  { href: "https://github.com/plus-ui", icon: "github", text: "GitHub" },
  // ... more links
];
```

### Rendering

The component iterates over the `links` array and renders an `<a>` tag for each entry, styled with Tailwind CSS classes.

## Customization

To add or remove a community link, simply modify the `links` array within the `ContributingLinks.astro` component's script section. No other changes are needed.
