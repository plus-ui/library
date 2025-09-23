# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

Plus UI is a monorepo containing a framework-agnostic web component library built with Lit and TypeScript. The project is organized as follows:

```
library/
├── packages/core/          # Main component library (@plusui/library)
│   ├── src/
│   │   ├── components/     # 40+ UI components (button, modal, input, etc.)
│   │   ├── styles/         # Global styles and Tailwind CSS
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # Core services
│   │   └── controllers/    # Lit reactive controllers
│   ├── dev/               # Development demos and server
│   ├── plop-templates/    # Component generation templates
│   └── react/             # Generated React wrappers
└── apps/docs/             # Documentation site (Astro + Starlight)
```

## Common Commands

### Development
- `pnpm dev` - Start all development servers (core + docs)
- `pnpm core:dev` - Start only core package dev server with live reload
- `pnpm docs:dev` - Start only documentation dev server

### Building
- `pnpm build` - Build all packages
- `pnpm core:build` - Build core package (creates dist/, cdn/, public/ directories)
- `pnpm core:clean` - Clean core package build artifacts

### Code Quality
- `pnpm lint` - Run ESLint on the entire project
- `pnpm format` - Format code with Prettier
- `cd packages/core && npm run lint:eslint` - Lint only core package
- `cd packages/core && npm run format:prettier` - Format only core package

### Testing
- Components include accessibility tests using `@open-wc/testing`
- Test files follow pattern `*.test.ts` alongside component files
- Tests use fixture-based approach with Lit HTML templates

### Component Generation
- `npm run new` - Generate new component using Plop templates
- Creates component structure with TypeScript, styles, tests, and demos

### Package Management
- `pnpm install` - Install all dependencies
- Package manager is locked to pnpm >= 10.0.0

## Core Package Architecture

The core package (`packages/core/`) is the main component library:

### Component Structure
- Each component lives in `src/components/{component-name}/`
- Standard files per component:
  - `{name}.ts` - Main component class extending Tailwind base
  - `{name}.style.ts` - Tailwind-based styling using `tailwind-variants`
  - `{name}.test.ts` - Accessibility and unit tests
  - `index.ts` - Re-exports for the component
- Components export through `src/components/index.ts` for library entry point
- Components use Lit 3 with TypeScript decorators (`experimentalDecorators: true`)

### Build System & Output Formats
Rollup configuration generates multiple output formats:
- `dist/` - ES modules for npm distribution with source maps
- `cdn/` - Minified ES modules for CDN usage
- `public/` - Demo/sandbox builds for development server
- `react/` - Generated React wrapper components
- `types/` - Framework-specific TypeScript definitions

Build process includes:
- TypeScript compilation targeting ES2020
- PostCSS processing with Tailwind CSS v4
- Code splitting and tree-shaking via Rollup
- Source map generation for development builds

### Custom Elements Manifest
The library uses `@custom-elements-manifest/analyzer` to generate:
- `custom-elements.json` - Component metadata
- Framework integrations (React, Vue, Svelte, Angular)
- VS Code and JetBrains IDE support files
- ESLint rules for component usage

### Key Technologies
- **Lit 3** - Web component framework with reactive properties and decorators
- **TypeScript 5** - Strict type checking with experimental decorators
- **Tailwind CSS v4** - Utility-first CSS with PostCSS processing
- **tailwind-variants** - Type-safe variant creation for component styling
- **@floating-ui/dom** - Positioning engine for popovers, tooltips, dropdowns
- **Rollup** - Module bundler with tree-shaking and code splitting
- **@open-wc/testing** - Web component testing utilities

### Styling Architecture
- Base class `Tailwind` extends `LitElement` with Tailwind CSS integration
- Component styles use `tailwind-variants` for type-safe variant definitions
- Global styles in `src/styles/global.css` with Tailwind directives
- CSS custom properties for theme customization
- Tailwind v4 configuration in `tailwind.config.js`

### Development Workflow
1. Components developed in `src/components/{name}/` following established patterns
2. Use `pnpm core:dev` for live reload during development
3. Component demos available in `dev/demo/` directory with `.html` files
4. Development server at `dev/server.js` serves component demos
5. Custom Elements Manifest auto-generates framework integrations

### Package Requirements
- Node.js >= 22.0.0 (specified in engines)
- pnpm >= 10.0.0 (locked via packageManager field)
- TypeScript 5+ with experimental decorators enabled

## Framework Integration
The library automatically generates framework-specific integrations via Custom Elements Manifest:
- **React**: Wrapper components in `react/` directory with TypeScript definitions
- **Vue.js**: Type definitions for Vue component integration
- **Svelte**: Component definitions for Svelte framework
- **SolidJS**: Type definitions for SolidJS integration
- **VS Code**: IntelliSense support for HTML and CSS custom properties
- **JetBrains**: IDE support for WebStorm/IntelliJ
- **ESLint**: Custom rules for component usage validation

## Accessibility Standards
- All components must maintain WCAG 2.1 AA compliance
- Accessibility testing included in component test suites using `@open-wc/testing`
- ARIA patterns implemented following established web standards
- Keyboard navigation support for interactive components

## MCP Server Integration
The library includes an MCP (Model Context Protocol) server for intelligent component discovery:
- **Location**: `apps/mcp-server/` - Standalone MCP server for Plus UI
- **Purpose**: Provides AI assistants with component knowledge and code generation
- **Commands**:
  - `pnpm mcp:install` - Install MCP server dependencies
  - `pnpm mcp:build` - Build MCP server
  - `pnpm mcp:start` - Start MCP server
  - `pnpm mcp:docker` - Run MCP server in Docker
- **Features**: Component discovery, code generation, usage validation, framework-specific examples
- **Integration**: Can be connected to Claude Code and other MCP-compatible AI tools

## Version Management
- Semantic versioning for all releases
- Published as `@plusui/library` on npm
- Monorepo uses pnpm workspaces for dependency management
- Version updates managed through package.json in packages/core