# Changelog Component

A comprehensive changelog display component that shows version history, updates, and changes for Plus UI components with filtering, grouping, and visual timeline features.

## Features

- **📊 Version Grouping**: Organizes entries by version for clear structure
- **🔍 Component Filtering**: Shows changes for specific components only
- **📅 Timeline Display**: Visual timeline with icons and dates
- **🎯 Type Classification**: Categorizes changes as features, fixes, improvements, or breaking changes
- **📱 Modal Support**: Optimized layouts for modal and page contexts
- **📑 Entry Limiting**: Configurable maximum number of entries
- **🎨 Visual Icons**: Emoji icons for different change types
- **📍 Date Formatting**: Human-readable date display

## Usage

### Basic Usage

```astro
---
import Changelog from './Changelog.astro';
---

<!-- Show all changelog entries -->
<Changelog />
```

### Component-Specific Changelog

```astro
<!-- Show only button component changes -->
<Changelog componentFilter="button" />
```

### Modal Changelog

```astro
<!-- Optimized for modal display with limited entries -->
<Changelog
  componentFilter="button"
  isModal={true}
  maxEntries={10}
/>
```

### Custom Entry Limit

```astro
<!-- Show only the 5 most recent entries -->
<Changelog maxEntries={5} />
```

## Props

| Prop              | Type      | Required | Default     | Description                       |
| ----------------- | --------- | -------- | ----------- | --------------------------------- |
| `componentFilter` | `string`  | ❌       | `undefined` | Filter entries by component name  |
| `isModal`         | `boolean` | ❌       | `false`     | Enable modal-optimized styling    |
| `maxEntries`      | `number`  | ❌       | `undefined` | Limit number of entries displayed |

## Data Structure

### ChangelogEntry Interface

```typescript
interface ChangelogEntry {
  version: string; // Semantic version (e.g., "1.3.0")
  date: string; // ISO date string (YYYY-MM-DD)
  component: string; // Component name (e.g., "button")
  type: "feature" | "fix" | "improvement" | "breaking";
  description: string; // Brief change description
  details?: string[]; // Optional detailed list of changes
}
```

### Example Data

```typescript
const changelogData: ChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "2024-12-15",
    component: "button",
    type: "feature",
    description: "Added new size variants",
    details: [
      "Added xs and xxl size options",
      "Improved button padding consistency",
    ],
  },
  {
    version: "1.2.6",
    date: "2024-12-01",
    component: "button",
    type: "breaking",
    description: "Updated default variant",
    details: [
      "Changed default variant from 'filled' to 'outlined'",
      "Updated theme variables",
    ],
  },
];
```

## Change Types & Visual System

### Type Classifications

| Type          | Icon | Color  | Purpose                            |
| ------------- | ---- | ------ | ---------------------------------- |
| `feature`     | ✨   | Green  | New functionality and capabilities |
| `fix`         | 🐛   | Red    | Bug fixes and error corrections    |
| `improvement` | ⚡   | Blue   | Performance and UX enhancements    |
| `breaking`    | 💥   | Orange | Breaking changes requiring updates |

### CSS Color Classes

```css
.text-color-success    /* Green for features */
/* Green for features */
.text-color-danger     /* Red for fixes */
.text-color-info       /* Blue for improvements */
.text-color-warning    /* Orange for breaking changes */
.text-color-caption; /* Gray for default/other */
```

## Component Architecture

### Data Processing Pipeline

1. **Filtering**: Filter entries by component if specified
2. **Limiting**: Apply maxEntries limit if provided
3. **Grouping**: Group entries by version for display
4. **Sorting**: Maintain chronological order (newest first)

### Grouping Logic

```typescript
const groupedEntries = filteredEntries.reduce((acc, entry) => {
  if (!acc[entry.version]) {
    acc[entry.version] = [];
  }
  acc[entry.version].push(entry);
  return acc;
}, {} as Record<string, ChangelogEntry[]>);
```

### Date Formatting

```typescript
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
```

## Styling System

### Component Variants

- **Page Changelog**: `.page-changelog` - Full-width page display
- **Modal Changelog**: `.modal-changelog` - Compact modal display

### Timeline Structure

```html
<div class="changelog-timeline">
  <div class="version-section">
    <div class="version-header">
      <div class="version-badge">
        <span class="version-number">v1.3.0</span>
        <span class="version-date">December 15, 2024</span>
      </div>
    </div>
    <div class="timeline-entries">
      <div class="timeline-entry">
        <div class="timeline-marker">
          <span class="timeline-icon">✨</span>
        </div>
        <div class="timeline-content">
          <!-- Entry content -->
        </div>
      </div>
    </div>
  </div>
</div>
```

### Key CSS Classes

```css
.changelog-container      /* Main wrapper */
/* Main wrapper */
.changelog-timeline       /* Timeline container */
.version-section         /* Version group wrapper */
.version-header          /* Version title area */
.version-badge           /* Version number/date badge */
.timeline-entries        /* Entry list container */
.timeline-entry          /* Individual entry */
.timeline-marker         /* Left-side icon marker */
.timeline-content        /* Entry content area */
.entry-meta             /* Type and component info */
.entry-description       /* Main description text */
.entry-details; /* Detailed change list */
```

## Visual Design

### Timeline Layout

- **Left Sidebar**: Visual markers with type icons
- **Main Content**: Version headers and change descriptions
- **Progressive Disclosure**: Expandable details for complex changes
- **Color Coding**: Type-based color system for quick scanning

### Responsive Behavior

- **Mobile**: Simplified timeline with reduced spacing
- **Desktop**: Full timeline with generous whitespace
- **Modal**: Compact layout optimized for overlay display

## Empty States

### No Entries Found

```html
<div class="text-center py-8">
  <p class="text-color-caption">
    No changelog entries found for {component} component.
  </p>
</div>
```

### Conditional Messages

- **Component Filter**: "No changelog entries found for {component} component."
- **General**: "No changelog entries available."

## Data Management

### Current Implementation

- **Static Data**: Hardcoded changelog array in component
- **In-Memory Processing**: All filtering and grouping client-side
- **Future-Ready**: Structured for external JSON/API integration

### Future Data Sources

```typescript
// External JSON file
import changelogData from "./changelog.json";

// API endpoint
const response = await fetch("/api/changelog");
const changelogData = await response.json();

// CMS integration
const changelogData = await fetchFromCMS("changelog");
```

## Performance Considerations

### Optimization Strategies

- **Lazy Loading**: Only load visible entries initially
- **Virtual Scrolling**: For large changelog datasets
- **Caching**: Store processed data in memory/localStorage
- **Pagination**: Break large datasets into chunks

### Current Performance

- **Memory**: Minimal footprint with static data
- **Rendering**: Fast client-side filtering and grouping
- **Bundle Size**: Lightweight with no external dependencies

## Accessibility Features

### Semantic HTML

- **Headings**: Proper heading hierarchy (h1, h2, h3)
- **Lists**: Semantic list structure for entries
- **Time Elements**: Proper date markup
- **ARIA Labels**: Descriptive labels for complex interactions

### Screen Reader Support

- **Entry Navigation**: Logical reading order
- **Type Announcement**: Change type clearly announced
- **Date Context**: Dates associated with versions
- **Detail Expansion**: Clear expand/collapse states

## Integration Examples

### With ComponentHeader

```astro
---
import ComponentHeader from '../component-header/ComponentHeader.astro';
import Changelog from '../changelog/Changelog.astro';
---

<ComponentHeader data={componentData} />

<!-- Changelog modal triggered by ComponentHeader -->
<Changelog
  componentFilter={componentData.title.toLowerCase()}
  isModal={true}
  maxEntries={10}
/>
```

### Standalone Page

```astro
---
import Changelog from '../changelog/Changelog.astro';
---

<main>
  <h1>Plus UI Changelog</h1>
  <Changelog />
</main>
```

## Future Enhancements

- [ ] **Search Functionality**: Full-text search across entries
- [ ] **Date Range Filtering**: Filter by date ranges
- [ ] **Type Filtering**: Filter by change type
- [ ] **RSS Feed**: Syndication support
- [ ] **Release Notes**: Detailed release documentation
- [ ] **Contributor Attribution**: Show change authors
- [ ] **Impact Assessment**: Breaking change impact analysis
- [ ] **Migration Guides**: Automatic migration guide generation

## Dependencies

### Core Dependencies

- **Astro**: Component framework
- **TypeScript**: Type safety and interfaces

### Styling Dependencies

- **Starlight CSS**: Design tokens and color system
- **Custom CSS**: Timeline and visual styling

## Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful degradation to simple list
- **Mobile Browsers**: Touch-optimized interactions
- **Screen Readers**: Full accessibility support

## Data Validation

### Entry Validation

```typescript
const isValidEntry = (entry: any): entry is ChangelogEntry => {
  return (
    typeof entry.version === "string" &&
    typeof entry.date === "string" &&
    typeof entry.component === "string" &&
    ["feature", "fix", "improvement", "breaking"].includes(entry.type) &&
    typeof entry.description === "string"
  );
};
```

### Error Handling

- **Invalid Dates**: Fallback to "Unknown date"
- **Missing Types**: Default to "other" type
- **Empty Descriptions**: Show placeholder text
- **Malformed Data**: Filter out invalid entries
