# InstallTabs Component

A reusable MDX component that provides standardized installation instructions for @plusui/core package across multiple package managers.

## Features

- **Multiple Package Managers**: Supports npm, yarn, pnpm, bun, and CDN installation
- **Synchronized Tabs**: Uses Starlight's syncKey for consistent tab selection across the documentation
- **Copy-Friendly**: Each installation method is properly formatted for easy copying
- **CDN Support**: Includes both CSS and JavaScript imports for CDN usage

## Usage

```mdx
import InstallTabs from "./InstallTabs.mdx";

<InstallTabs />
```

## Package Manager Support

| Manager | Command                    | Notes                      |
| ------- | -------------------------- | -------------------------- |
| npm     | `npm install @plusui/core` | Default package manager    |
| yarn    | `yarn add @plusui/core`    | Yarn package manager       |
| pnpm    | `pnpm add @plusui/core`    | Fast, disk space efficient |
| bun     | `bun add @plusui/core`     | Fast all-in-one toolkit    |
| CDN     | Link/Script tags           | Direct browser usage       |

## Dependencies

- `@astrojs/starlight/components` - For Tabs and TabItem components

## Future Enhancements

- Dynamic package name support via props
- Version pinning options
- Custom installation commands
- Framework-specific installation guides
