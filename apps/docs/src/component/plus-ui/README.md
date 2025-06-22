# Plus UI Components

A comprehensive collection of documentation components specifically designed for Plus UI library. Each component is organized in its own dedicated folder with complete documentation, making them ready for future extraction as individual packages.

## 🏗️ Architecture

This collection follows a standardized architecture where each component:

- **Lives in its own folder** with dedicated namespace
- **Has comprehensive JSDoc** documentation
- **Includes detailed README** with usage examples
- **Follows Astro best practices** for SSR optimization
- **Maintains consistent styling** using Starlight design tokens
- **Is package-ready** for future individual distribution

## 📦 Component Collection

### 1. [CodePreview](./codepreview/)

Interactive code preview system with framework switching, variant generation, and playground functionality.

**Key Features:**

- Multi-framework code generation (React, Angular, Vue, Svelte, HTML)
- Automatic variant system with `data-variant-*` attributes
- Interactive playground with real-time controls
- Smart multiple component formatting

### 2. [ComponentHeader](./component-header/)

Comprehensive documentation header with framework selection, version info, and changelog integration.

**Key Features:**

- Framework-specific import/package information
- Version tracking and release dates
- Integrated changelog modal
- Preference persistence across sessions

### 3. [Changelog](./changelog/)

Visual timeline display for component version history and updates.

**Key Features:**

- Component-specific filtering
- Type-based categorization (feature, fix, improvement, breaking)
- Timeline visualization with icons
- Modal and page display modes

### 4. [Breadcrumb](./breadcrumb/)

Automatic navigation breadcrumb generation from URL paths.

**Key Features:**

- Smart URL path processing
- Configurable separators and home text
- Accessibility-focused implementation
- Responsive design optimization

### 5. [EmbedContent](./embed-content/)

Universal content embedding for various services and platforms.

**Key Features:**

- YouTube, CodeSandbox, and Figma integration
- Automatic service detection
- Universal fallback for any URL
- Performance-optimized lazy loading

### 6. [InstallTabs](./install-tabs/)

Standardized installation instructions across multiple package managers.

**Key Features:**

- Multi-package manager support (npm, yarn, pnpm, bun, CDN)
- Synchronized tab selection
- Copy-optimized formatting

## 🎯 Design Principles

### Consistency

- **Design Tokens**: All components use Starlight CSS custom properties
- **Spacing System**: Consistent margin, padding, and gap patterns
- **Typography**: Unified font sizes, weights, and line heights
- **Color System**: Semantic color usage for states and themes

### Performance

- **SSR Optimized**: Components render on server for fast initial load
- **Minimal JavaScript**: Client-side code only where necessary
- **Lazy Loading**: Heavy content loaded on demand
- **Bundle Splitting**: Each component can be imported independently

### Accessibility

- **ARIA Compliance**: Full ARIA attribute implementation
- **Semantic HTML**: Proper heading hierarchy and landmark usage
- **Keyboard Navigation**: Complete keyboard interaction support
- **Screen Reader**: Optimized for assistive technology

### Developer Experience

- **TypeScript**: Full type safety with detailed interfaces
- **JSDoc**: Comprehensive inline documentation
- **Examples**: Real-world usage patterns and code samples
- **Error Handling**: Graceful degradation and helpful error messages

## 🚀 Usage Patterns

### Individual Import

```astro
---
import CodePreview from './plus-ui/codepreview/CodePreview.astro';
---

<CodePreview>
  <plus-button>Click me</plus-button>
</CodePreview>
```

### Centralized Import

```astro
---
import { CodePreview, ComponentHeader } from '../component';
---

<ComponentHeader data={componentData} />
<CodePreview showPlayground>
  <plus-button>Interactive Example</plus-button>
</CodePreview>
```

### Component Composition

```astro
---
import { ComponentHeader, CodePreview, InstallTabs } from '../component';
---

<ComponentHeader data={componentData} />
<InstallTabs />
<CodePreview showPlayground controls="kind,size">
  <plus-button data-variant-kind="filled,outlined">Button</plus-button>
</CodePreview>
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:

### Breakpoint System

- **Mobile**: `< 640px` - Simplified layouts, touch-optimized
- **Tablet**: `640px - 1024px` - Balanced layout adaptations
- **Desktop**: `> 1024px` - Full feature display

### Adaptive Features

- **Navigation**: Collapsible breadcrumbs, simplified headers
- **Code Display**: Horizontal scrolling, compact syntax
- **Modals**: Full-screen on mobile, centered on desktop
- **Typography**: Responsive font scaling

## 🎨 Theming System

### CSS Custom Properties

```css
/* Color System */
--sl-color-bg               /* Background colors */
--sl-color-bg-nav           /* Navigation backgrounds */
--sl-color-text             /* Primary text */
--sl-color-text-accent      /* Secondary text */
--sl-color-gray-*           /* Gray scale (1-6) */
--sl-color-accent           /* Brand accent */

/* Spacing System */
--sl-spacing-*              /* Consistent spacing scale */

/* Component Tokens */
--code-preview-bg           /* Code background */
--modal-backdrop            /* Modal overlay */
```

### Dark Mode Support

All components automatically adapt to light/dark themes using:

- `[data-theme="dark"]` selectors
- CSS custom property inheritance
- Semantic color token usage
- Enhanced contrast ratios

## 🔧 Development Workflow

### Adding New Components

1. **Create Folder Structure**

   ```
   plus-ui/
   └── new-component/
       ├── NewComponent.astro
       └── README.md
   ```

2. **Component Template**

   ````astro
   ---
   /**
    * NewComponent
    * ============
    *
    * Brief description and purpose
    *
    * @component NewComponent
    * @example
    * ```astro
    * <NewComponent prop="value" />
    * ```
    */

   interface Props {
     // Define props with JSDoc
   }

   const { ...props } = Astro.props;
   ---

   <!-- Component markup -->

   <style>
     /* Component styles */
   </style>
   ````

3. **Update Exports**
   ```typescript
   // In ../index.ts
   export { default as NewComponent } from "./plus-ui/new-component/NewComponent.astro";
   ```

### Quality Standards

- **Documentation**: Every component must have complete README
- **Types**: Full TypeScript interface definitions
- **Examples**: Multiple usage scenarios with code samples
- **Testing**: Manual testing across all supported browsers
- **Performance**: Lighthouse score > 95 for component pages

## 📊 Performance Metrics

### Bundle Analysis

| Component       | Gzipped Size | Dependencies          |
| --------------- | ------------ | --------------------- |
| CodePreview     | ~8KB         | Astro, CodeMirror     |
| ComponentHeader | ~6KB         | Astro, Plus UI Select |
| Changelog       | ~4KB         | Astro                 |
| Breadcrumb      | ~2KB         | Astro                 |
| EmbedContent    | ~5KB         | Astro                 |
| InstallTabs     | ~1KB         | Astro, Starlight      |

### Runtime Performance

- **First Contentful Paint**: < 100ms
- **Time to Interactive**: < 200ms
- **Component Mount**: < 50ms
- **Framework Switch**: < 16ms (60fps)

## 🚢 Future Roadmap

### Package Extraction

Each component is designed to be extracted as individual npm packages:

```bash
# Future package structure
@plusui/docs-codepreview
@plusui/docs-componentheader
@plusui/docs-changelog
@plusui/docs-breadcrumb
@plusui/docs-embedcontent
@plusui/docs-installtabs
```

### Planned Enhancements

- [ ] **Storybook Integration**: Visual component testing
- [ ] **A11y Testing**: Automated accessibility validation
- [ ] **Performance Monitoring**: Runtime performance tracking
- [ ] **Usage Analytics**: Component adoption metrics
- [ ] **Custom Themes**: User-defined styling systems
- [ ] **Plugin System**: Extensible component functionality

## 🤝 Contributing

### Component Standards

1. **Folder Structure**: Each component in dedicated folder
2. **Documentation**: Complete README with examples
3. **Types**: Full TypeScript definitions
4. **Styling**: Starlight design token usage
5. **Accessibility**: WCAG 2.1 AA compliance

### Code Style

- **Formatting**: Prettier with project configuration
- **Linting**: ESLint with Astro recommended rules
- **Naming**: PascalCase for components, kebab-case for files
- **Comments**: JSDoc for all public APIs

## 📄 License

Each component inherits the main project license and is designed for:

- **Internal Use**: Full access within Plus UI ecosystem
- **External Distribution**: Ready for individual package release
- **Commercial Use**: Suitable for commercial projects
- **Modification**: Encouraged for specific use cases

## 🆘 Support

### Documentation

- Each component folder contains detailed README
- JSDoc comments provide inline documentation
- Type definitions offer IntelliSense support

### Common Issues

- **Import Errors**: Check path consistency in index.ts
- **Styling Issues**: Verify Starlight design token usage
- **Performance**: Use browser dev tools for optimization
- **TypeScript**: Components are fully typed for better DX
