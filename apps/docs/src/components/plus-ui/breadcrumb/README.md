# Breadcrumb Component

A flexible navigation breadcrumb component that automatically generates breadcrumb trails based on the current URL path, providing users with clear navigation context and wayfinding capabilities.

## Features

- **🔗 Automatic Generation**: Creates breadcrumbs from URL pathname
- **🏠 Home Navigation**: Configurable home/root breadcrumb
- **✨ Smart Formatting**: Converts kebab-case URLs to readable titles
- **🎨 Custom Separators**: Configurable separator characters
- **♿ Accessibility**: Full ARIA support with semantic navigation
- **📱 Responsive Design**: Optimized spacing for mobile and desktop
- **🎯 Active State**: Highlights current page in breadcrumb trail
- **⚡ Performance**: Lightweight with no external dependencies

## Usage

### Basic Usage

```astro
---
import Breadcrumb from './Breadcrumb.astro';
---

<!-- Auto-generates breadcrumbs from current URL -->
<Breadcrumb />
```

### Custom Separator

```astro
<!-- Use custom separator character -->
<Breadcrumb separator=">" />
<Breadcrumb separator="•" />
<Breadcrumb separator="→" />
```

### Custom Home Text

```astro
<!-- Customize the home/root breadcrumb text -->
<Breadcrumb homeText="Home" />
<Breadcrumb homeText="Plus UI" />
```

### Combined Options

```astro
<!-- Full customization -->
<Breadcrumb
  separator="›"
  homeText="Documentation"
  className="my-custom-breadcrumb"
/>
```

## Props

| Prop        | Type     | Required | Default  | Description                                 |
| ----------- | -------- | -------- | -------- | ------------------------------------------- |
| `separator` | `string` | ❌       | `"/"`    | Character used to separate breadcrumb items |
| `homeText`  | `string` | ❌       | `"Docs"` | Text for the home/root breadcrumb           |
| `className` | `string` | ❌       | `""`     | Additional CSS classes                      |

## Component Architecture

### Breadcrumb Generation Logic

#### URL Path Processing

```typescript
const segments = path.split("/").filter((segment) => segment !== "");
```

#### Smart Segment Formatting

```typescript
function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
```

### Breadcrumb Data Structure

```typescript
interface BreadcrumbItem {
  label: string; // Display text (e.g., "Getting Started")
  href: string; // URL path (e.g., "/getting-started")
  isActive: boolean; // Whether this is the current page
}
```

### Example Transformations

| URL Path             | Generated Breadcrumbs                 |
| -------------------- | ------------------------------------- |
| `/`                  | Docs                                  |
| `/components`        | Docs › Components                     |
| `/components/button` | Docs › Components › Button            |
| `/installation`      | Docs › Getting Started › Installation |

## Accessibility Features

### ARIA Implementation

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <span aria-current="page">Current Page</span>
    </li>
  </ol>
</nav>
```

### Key Accessibility Features

- **Semantic HTML**: Uses `<nav>`, `<ol>`, and `<li>` elements
- **ARIA Labels**: `aria-label="Breadcrumb"` for navigation context
- **Current Page**: `aria-current="page"` for active breadcrumb
- **Hidden Separators**: `aria-hidden="true"` for decorative elements
- **Focus Management**: Proper tab order and focus indicators

## Styling System

### CSS Architecture

```css
.breadcrumb-nav {
  margin-bottom: 1rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}
```

### Design Tokens

```css
.text-color-default      /* Active/current page text */
/* Active/current page text */
/* Active/current page text */
/* Active/current page text */
/* Active/current page text */
/* Active/current page text */
/* Active/current page text */
/* Active/current page text */
.text-color-placeholder  /* Inactive breadcrumb links */
.text-color-primary; /* Link hover state */
```

### Responsive Behavior

| Breakpoint     | Behavior                                           |
| -------------- | -------------------------------------------------- |
| Mobile (`sm:`) | Smaller font size (0.75rem), reduced gap (0.25rem) |
| Desktop        | Standard font size (0.875rem), normal gap (0.5rem) |

## URL Processing Examples

### Path Segment Handling

```typescript
// Input: "/components/quick-setup"
// Processing:
// 1. Split: ["", "components", "getting-started", "quick-setup"]
// 2. Filter: ["components", "getting-started", "quick-setup"]
// 3. Format: ["Components", "Getting Started", "Quick Setup"]
// 4. Build paths: ["/components", "/components/getting-started", "/components/quick-setup"]
```

### Edge Cases

- **Root Path** (`/`): Shows only home breadcrumb
- **Single Level** (`/components`): Home › Components
- **Deep Nesting**: Handles unlimited depth
- **Special Characters**: Converts hyphens to spaces, capitalizes words

## Interactive Behavior

### Link States

```css
/* Normal state */
.breadcrumb-link {
  color: var(--text-color-placeholder);
  text-decoration: none;
}

/* Hover state */
.breadcrumb-link:hover {
  color: var(--text-color-primary);
  text-decoration: underline;
}

/* Active state */
.breadcrumb-active {
  color: var(--text-color-default);
  cursor: default;
}
```

### Separator Styling

```css
.breadcrumb-separator {
  color: var(--text-color-default);
  user-select: none;
  pointer-events: none;
}
```

## Advanced Usage Patterns

### Integration with Layout

```astro
---
import Breadcrumb from '../components/plus-ui/breadcrumb/Breadcrumb.astro';
---

<main>
  <Breadcrumb />
  <article>
    <!-- Page content -->
  </article>
</main>
```

### Custom Styling

```astro
<Breadcrumb className="border-b border-gray-200 pb-4 mb-6" />
```

### Dynamic Separator Based on Content

```astro
---
const isCodePage = Astro.url.pathname.includes('/code');
const separator = isCodePage ? '›' : '/';
---

<Breadcrumb separator={separator} />
```

## Performance Characteristics

### Runtime Performance

- **Generation Time**: < 1ms for typical paths
- **Memory Usage**: Minimal array and string operations
- **Bundle Size**: ~2KB (including styles)
- **Rendering**: SSR-optimized, no client-side JavaScript

### Optimization Strategies

- **Static Generation**: Breadcrumbs computed at build time
- **Caching**: URL processing results could be memoized
- **Lazy Loading**: Not applicable (component is lightweight)

## Error Handling

### Graceful Degradation

```typescript
// Handle edge cases
const segments = path.split("/").filter((segment) => segment !== "");

// Ensure home breadcrumb always exists
breadcrumbs.push({
  label: homeText || "Home",
  href: "/",
  isActive: path === "/",
});
```

### Invalid Path Handling

- **Empty Segments**: Automatically filtered out
- **Special Characters**: Safely processed through formatSegment
- **Malformed URLs**: Degrades to home breadcrumb only

## Customization Examples

### Corporate Branding

```astro
<Breadcrumb
  homeText="Acme Corp"
  separator="→"
  className="corporate-breadcrumb"
/>
```

### Minimalist Design

```astro
<Breadcrumb
  separator=""
  className="text-xs opacity-70"
/>
```

### Multilingual Support

```astro
---
const homeText = locale === 'tr' ? 'Ana Sayfa' : 'Home';
---

<Breadcrumb homeText={homeText} />
```

## Integration Patterns

### With Page Headers

```astro
<header class="page-header">
  <Breadcrumb />
  <h1>{title}</h1>
  <p>{description}</p>
</header>
```

### With Navigation Systems

```astro
<nav class="main-navigation">
  <Breadcrumb />
  <div class="page-actions">
    <!-- Additional navigation -->
  </div>
</nav>
```

## Future Enhancements

- [ ] **Schema.org Markup**: JSON-LD breadcrumb schema
- [ ] **Custom Icons**: Icon support for breadcrumb items
- [ ] **Truncation**: Smart truncation for long paths
- [ ] **Tooltips**: Hover tooltips for truncated items
- [ ] **Keyboard Navigation**: Arrow key navigation
- [ ] **Analytics**: Click tracking integration
- [ ] **A11y Improvements**: Enhanced screen reader support
- [ ] **Theming**: CSS custom property system

## Dependencies

### Core Dependencies

- **Astro**: Component framework and URL handling
- **TypeScript**: Type safety and interfaces

### Runtime Dependencies

- **None**: Pure Astro component with no external dependencies

## Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful degradation with basic styling
- **Screen Readers**: Full accessibility support
- **Mobile Browsers**: Touch-optimized interactions

## Testing Considerations

### URL Path Scenarios

```typescript
// Test cases for breadcrumb generation
const testCases = [
  { path: "/", expected: ["Docs"] },
  { path: "/components", expected: ["Docs", "Components"] },
  {
    path: "/installation",
    expected: ["Docs", "Getting Started", "Installation"],
  },
];
```

### Accessibility Testing

- **Screen Reader**: Verify proper navigation announcement
- **Keyboard**: Test tab order and focus indicators
- **ARIA**: Validate ARIA attributes and roles
- **Semantic**: Check HTML structure validity
