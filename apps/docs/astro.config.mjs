// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  base: "/library",
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
              label: "Overview",
              slug: "getting-started/overview",
            },
            {
              label: "Component List & Plans",
              slug: "getting-started/component-list-and-plans",
            },
            {
              label: "Support",
              slug: "getting-started/support",
              // badge: { text: "New", variant: "success" },
            },
            { label: "Contributing", slug: "getting-started/contributing" },
            { label: "FAQs", slug: "getting-started/faq" },
          ],
        },
        {
          label: "UI Library",
          collapsed: false,
          items: [
            {
              label: "Overview",
              slug: "ui-library/overview",
            },
            {
              label: "Changelog",
              slug: "ui-library/changelog",
            },
            {
              label: "Installation",
              items: [
                {
                  label: "Overview",
                  slug: "ui-library/installation/overview",
                },
                {
                  label: "React",
                  slug: "ui-library/installation/react",
                },
                {
                  label: "Vue",
                  slug: "ui-library/installation/vue",
                },
                {
                  label: "Angular",
                  slug: "ui-library/installation/angular",
                },
                {
                  label: "Svelte",
                  slug: "ui-library/installation/svelte",
                },
              ],
            },
          ],
        },
        {
          label: "Design System",
          collapsed: false,
          items: [
            {
              label: "Overview",
              slug: "design-system/overview",
            },
            {
              label: "Setting Up on Figma",
              slug: "design-system/setting-up-on-figma",
            },
            {
              label: "Styles and Variables",
              slug: "design-system/styles-and-variables",
            },
          ],
        },
        {
          label: "Components",
          collapsed: false,
          autogenerate: { directory: "components" },
        },
        {
          label: "Foundation",
          collapsed: false,
          // autogenerate: { directory: 'foundation' },

          items: [
            {
              label: "Overview",
              slug: "foundation/overview",
            },
            {
              label: "Color",
              // slug: 'foundation/color',
              items: [
                {
                  label: "Color Palette",
                  slug: "foundation/color/color-palette",
                },
                {
                  label: "Color Variables",
                  slug: "foundation/color/color-variables",
                },

                {
                  label: "Color Token List",
                  slug: "foundation/color/color-token-list",
                },
              ],
            },
            {
              label: "Typography",
              slug: "foundation/typography",
            },
            {
              label: "Icons",
              slug: "foundation/icons",
            },
            {
              label: "Border",
              slug: "foundation/border",
            },
            {
              label: "Spacing",
              slug: "foundation/spacing",
            },
            {
              label: "Opacity",
              slug: "foundation/opacity",
            },
          ],
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/plus-ui/library/edit/main/",
      },
      components: {
        SiteTitle: "./src/component/starlight-overrides/SiteTitle.astro",
        Header: "./src/component/starlight-overrides/Header.astro",
        Head: "./src/component/starlight-overrides/Head.astro",
        // PageFrame: "./src/component/starlight-overrides/PageFrame.astro",
        // TwoColumnContent:"./src/component/starlight-overrides/TwoColumnContent.astro",
        PageTitle: "./src/component/starlight-overrides/PageTitle.astro",
        // ThemeSelect: "./src/component/starlight-overrides/ThemeSelect.astro",
        SocialIcons: "./src/component/starlight-overrides/SocialIcons.astro",
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
