/**
 * Components Index
 * ================
 *
 * Central export point for remaining shared components.
 * These are general-purpose components used across the documentation.
 *
 * Note: Plus UI specific components have been moved to ../component/plus-ui/
 */

// @ts-ignore
import CodePreview from "./plus-ui/code-preview/CodePreview.astro";
// @ts-ignore
import ComponentHeader from "./plus-ui/component-header/ComponentHeader.astro";
// @ts-ignore
import Changelog from "./plus-ui/changelog/Changelog.astro";
// @ts-ignore
import Breadcrumb from "./plus-ui/breadcrumb/Breadcrumb.astro";
// @ts-ignore
import EmbedContent from "./plus-ui/embed-content/EmbedContent.astro";
// @ts-ignore
import InstallTabs from "./plus-ui/install-tabs/InstallTabs.mdx";
// @ts-ignore
import ContributingLinks from "./plus-ui/contributing-links/ContributingLinks.astro";
// @ts-ignore
import FrameworkCards from "./plus-ui/framework-cards/FrameworkCards.astro";
// @ts-ignore
import Code from "./plus-ui/code/Code.astro";

// Starlight Override Components
// @ts-ignore
import SiteTitle from "./starlight-overrides/SiteTitle.astro";
// @ts-ignore
import Header from "./starlight-overrides/Header.astro";
// @ts-ignore
import Head from "./starlight-overrides/Head.astro";
// @ts-ignore
import PageTitle from "./starlight-overrides/PageTitle.astro";
// @ts-ignore
import SocialIcons from "./starlight-overrides/SocialIcons.astro";

export {
  CodePreview,
  ComponentHeader,
  Changelog,
  Breadcrumb,
  EmbedContent,
  InstallTabs,
  ContributingLinks,
  FrameworkCards,
  SiteTitle,
  Header,
  Head,
  PageTitle,
  SocialIcons,
  Code,
};

// Re-export types if needed
// @ts-ignore
export type { Props as CodePreviewProps } from "./plus-ui/code-preview/CodePreview.astro";
