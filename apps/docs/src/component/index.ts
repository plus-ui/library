/**
 * Component Index
 * ===============
 *
 * Central export point for all reusable components.
 * This allows for cleaner imports throughout the application.
 *
 * Usage:
 * ```ts
 * import { CodePreview, ComponentHeader } from '../component';
 * ```
 */

// Plus UI Components - Organized in dedicated folders
export { default as CodePreview } from "./plus-ui/codepreview/CodePreview.astro";
export { default as ComponentHeader } from "./plus-ui/component-header/ComponentHeader.astro";
export { default as Changelog } from "./plus-ui/changelog/Changelog.astro";
export { default as Breadcrumb } from "./plus-ui/breadcrumb/Breadcrumb.astro";
export { default as EmbedContent } from "./plus-ui/embed-content/EmbedContent.astro";
export { default as InstallTabs } from "./plus-ui/install-tabs/InstallTabs.mdx";

// Starlight Override Components
export { default as SiteTitle } from "./starlight-overrides/SiteTitle.astro";
export { default as Header } from "./starlight-overrides/Header.astro";
export { default as Head } from "./starlight-overrides/Head.astro";
export { default as PageTitle } from "./starlight-overrides/PageTitle.astro";
export { default as SocialIcons } from "./starlight-overrides/SocialIcons.astro";

// Re-export types if needed
export type { Props as CodePreviewProps } from "./plus-ui/codepreview/CodePreview.astro";
