# Plus UI Library

[![npm version](https://badge.fury.io/js/@plusui%2Fcore.svg)](https://badge.fury.io/js/@plusui%2Fcore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework Agnostic](https://img.shields.io/badge/Framework-Agnostic-blue.svg)](https://webcomponents.org/)

**Plus UI** is a modern, framework-agnostic web component library built with **Lit** and **TypeScript**. It provides 44+ accessible, customizable components that work seamlessly across all modern frameworks and vanilla JavaScript.

## ✨ Features

- **🎯 Framework Agnostic** - Works with React, Vue, Angular, Svelte, and vanilla JS
- **♿ Accessible** - WCAG 2.1 AA compliant with full ARIA support
- **🎨 Customizable** - Built with Tailwind CSS and design tokens
- **📦 Lightweight** - Tree-shakable components with minimal bundle impact
- **🔧 TypeScript** - Full TypeScript support with comprehensive type definitions
- **⚡ Modern** - Built with Lit 3 and modern web standards
- **🎭 2000+ Variants** - Extensive customization options for every component

## 🚀 Quick Start

### CDN Installation (Vanilla JS)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Plus UI Demo</title>
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@plusui/core@latest/dist/index.js"
    ></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@plusui/core@latest/dist/index.css"
    />
  </head>
  <body>
    <plus-button variant="primary" size="medium"> Hello Plus UI! </plus-button>
  </body>
</html>
```

### NPM Installation

```bash
npm install @plusui/core
```

```javascript
import "@plusui/core/dist/index.css";
import "@plusui/core";
```

## 📚 Documentation

Visit our comprehensive documentation at **[docs.plusui.com](https://docs.plusui.com)** for:

- 📖 **Component Guides** - Detailed usage examples and API reference
- 🎨 **Design System** - Colors, typography, spacing, and design tokens
- 🔧 **Installation Guides** - Framework-specific setup instructions
- ♿ **Accessibility** - Best practices and ARIA guidelines
- 🎭 **Theming** - Customization and theming options

## 🧩 Component Library

### Action Components

- **Button** - Versatile button with multiple variants and states
- **Button Group** - Group related buttons together
- **Link** - Styled navigation links with hover effects

### Input Components

- **Input** - Text input with validation and icons
- **Textarea** - Multi-line text input with auto-resize
- **Checkbox** - Single or grouped checkboxes
- **Radio** - Radio buttons for single selection
- **Select** - Dropdown selection with search support
- **Rating** - Star rating component
- **Segmented Picker** - Segmented control for options
- **Toggle** - Switch component for on/off states

### Feedback Components

- **Alert** - Important messages with severity levels
- **Modal** - Overlay dialog for focused content
- **Drawer** - Sliding panel from screen edges
- **Popover** - Contextual popup with positioning
- **Popconfirm** - Confirmation dialog
- **Tooltip** - Contextual hints on hover
- **Toast** - Temporary notification messages

### Data Display Components

- **Avatar** - User profile images with fallbacks
- **Badge** - Notification indicators and status markers
- **Chip** - Compact elements for tags and filters
- **Progress** - Progress bars and loading indicators
- **Text** - Typography with semantic HTML
- **Icon** - SVG icons with multiple styles

### Layout & Navigation Components

- **Accordion** - Collapsible content sections
- **Breadcrumb** - Navigation trail hierarchy
- **Divider** - Visual separators
- **Dropdown** - Contextual menus
- **Tab** - Tabbed interface organization

## 🛠️ Development

### Prerequisites

- **Node.js** >= 22.0.0
- **pnpm** >= 10.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/plus-ui/library.git
cd library

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Available Scripts

```bash
# Development
pnpm dev                    # Start all dev servers
pnpm core:dev              # Start core package dev server
pnpm docs:dev              # Start documentation dev server

# Building
pnpm build                 # Build all packages
pnpm core:build            # Build core package
pnpm docs:build            # Build documentation

# Code Quality
pnpm lint                  # Run ESLint
pnpm format                # Format code with Prettier
```

### Project Structure

```
library/
├── apps/
│   └── docs/              # Documentation site (Astro + Starlight)
├── packages/
│   └── core/              # Main component library
│       ├── src/
│       │   ├── components/ # All UI components
│       │   ├── styles/     # Global styles and themes
│       │   └── utils/      # Utility functions
│       └── dev/           # Development demos
└── pnpm-workspace.yaml    # Workspace configuration
```

## 🎨 Design System

Plus UI is built on a comprehensive design system that includes:

- **Colors** - Semantic color tokens with light/dark themes
- **Typography** - Consistent font scales and weights
- **Spacing** - Standardized spacing scale
- **Shadows** - Elevation and depth system
- **Border Radius** - Consistent corner radius values
- **Breakpoints** - Responsive design breakpoints

## 🌐 Browser Support

- **Chrome** >= 88
- **Firefox** >= 78
- **Safari** >= 14
- **Edge** >= 88

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- 🐛 **Bug Reports** - How to report issues
- 💡 **Feature Requests** - How to suggest new features
- 🔧 **Development** - How to set up the development environment
- 📝 **Code Style** - Our coding standards and conventions

## 📞 Support

- 📖 **Documentation**: [docs.plusui.com](https://docs.plusui.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/plus-ui/library/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/plus-ui/library/discussions)
- 📧 **Email**: [hello@plusui.com](mailto:hello@plusui.com)

## 🙏 Acknowledgments

- **Lit** - For the amazing web component framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Astro** - For the fast documentation site
- **Starlight** - For the beautiful documentation theme

---

**Made with ❤️ by the Plus UI Team**
