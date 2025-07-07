// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Plus UI",
      logo: {
        light: "./src/assets/logo.svg",
        dark: "./src/assets/logo-dark.svg",
      },
      social: [
        {
          icon: "figma",
          label: "Figma",
          href: "https://www.figma.com/@plusui",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/plus-ui",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            {
              label: "Introduction",
              link: "/getting-started/introduction/",
            },
            {
              label: "Changelog",
              link: "/getting-started/changelog/",
            },
            {
              label: "Component Overview",
              link: "/getting-started/component-overview/",
            },
            {
              label: "Pricing Plans",
              link: "/getting-started/pricing-plans/",
            },
            {
              label: "Installation",
              items: [
                {
                  label: "Overview",
                  link: "/getting-started/installation/overview/",
                },
                {
                  label: "Vanilla JS (CDN)",
                  link: "/getting-started/installation/vanilla/",
                },
                {
                  label: "React",
                  link: "/getting-started/installation/react/",
                },
                {
                  label: "Vue",
                  link: "/getting-started/installation/vue/",
                },
                {
                  label: "Angular",
                  link: "/getting-started/installation/angular/",
                },
                {
                  label: "Svelte",
                  link: "/getting-started/installation/svelte/",
                },
              ],
            },
          ],
        },
        {
          label: "Design System",
          autogenerate: { directory: "design-system" },
        },
        {
          label: "Foundation",
          autogenerate: { directory: "foundation" },
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
        {
          label: "Theming",
          autogenerate: { directory: "theming" },
        },
        {
          label: "Accessibility",
          autogenerate: { directory: "accessibility" },
        },
        {
          label: "Contributing",
          autogenerate: { directory: "contributing" },
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/plus-ui/library/edit/main/apps/docs/",
      },
      components: {
        SiteTitle: "./src/components/starlight-overrides/SiteTitle.astro",
        Header: "./src/components/starlight-overrides/Header.astro",
        Head: "./src/components/starlight-overrides/Head.astro",
        // PageFrame: "./src/components/starlight-overrides/PageFrame.astro",
        // TwoColumnContent:"./src/components/starlight-overrides/TwoColumnContent.astro",
        PageTitle: "./src/components/starlight-overrides/PageTitle.astro",
        // ThemeSelect: "./src/components/starlight-overrides/ThemeSelect.astro",
        SocialIcons: "./src/components/starlight-overrides/SocialIcons.astro",
        MarkdownContent:
          "./src/components/starlight-overrides/MarkdownContent.astro",
      },
      expressiveCode: {
        // Replace the default themes with a custom set of bundled themes:
        // "dracula" (a dark theme) and "solarized-light"
        themes: ["github-dark", "github-light"],
        styleOverrides: {
          // You can also override styles
          borderRadius: "0.25rem",
          borderWidth: "0",
          frames: {
            shadowColor: "none",
            tooltipSuccessBackground:
              "var(--background-color-color-default-invert-default)",
            tooltipSuccessForeground: "var(--text-color-color-base)",
          },
        },
      },
      customCss: [
        "./src/styles/global.css",
        "@fortawesome/fontawesome-free/css/all.min.css",
        "@fontsource-variable/inter",
        "@fontsource-variable/inter-tight",
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
