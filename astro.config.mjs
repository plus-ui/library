import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lit from '@astrojs/lit';
import starlightLinksValidator from "starlight-links-validator";
import starlightImageZoom from "starlight-image-zoom";
// import tailwind from "@astrojs/tailwind";
// import liveCode from "astro-live-code";

export default defineConfig({
  srcDir: './astro',
  outDir: './astro/dist',
  integrations: [
    lit(),
    starlight({
      title: 'Plus UI',logo: {
        src: './astro/assets/plus-ui-logo.svg',
      },
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      customCss: ['./astro/styles/main.css'],
      defaultLocale: 'root',
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            {
              label: 'Documentation Overview',
              slug: 'getting-started/documentation-overview',
            },
            {
              label: 'Component List & Plans',
              slug: 'getting-started/component-list-and-plans',
            },
            {
              label: 'Support',
              slug: 'getting-started/support',
              // badge: { text: "New", variant: "success" },
            },
            { label: 'Contributing', slug: 'getting-started/contributing' },
            { label: 'FAQs', slug: 'getting-started/faq' },
          ],
        },
        {
          label: 'UI Library',
          items: [
            {
              label: 'Overview',
              slug: 'ui-library/overview',
            },
            {
              label: 'Changelog',
              slug: 'ui-library/changelog',
            },
            {
              label: 'Installation',
              items: [
                {
                  label: 'Overview',
                  slug: 'ui-library/installation/overview',
                },
                {
                  label: 'React',
                  slug: 'ui-library/installation/react',
                },
                {
                  label: 'Vue',
                  slug: 'ui-library/installation/vue',
                },
                {
                  label: 'Angular',
                  slug: 'ui-library/installation/angular',
                },
                {
                  label: 'Svelte',
                  slug: 'ui-library/installation/svelte',
                },
              ],
            },
          ],
        },
        {
          label: 'Design System',
          items: [
            {
              label: 'Overview',
              slug: 'design-system/overview',
            },
            {
              label: 'Setting Up on Figma',
              slug: 'design-system/setting-up-on-figma',
            },
            {
              label: 'Styles and Variables',
              slug: 'design-system/styles-and-variables',
            },
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
      components: {
        PageTitle: './astro/layout/PageTitle.astro',
        Head: './astro/layout/Head.astro',
      },
      plugins: [starlightLinksValidator(), starlightImageZoom()],
      expressiveCode: {
        // You can optionally override the plugin's default settings here
        frames: {
          // Example: Hide the "Copy to clipboard" button
          showCopyToClipboardButton: true,
        },
        styleOverrides: {
          // You can optionally override the plugin's default styles here
          frames: {
            shadowColor: '#124',
          },
        },
      },
    }),
    // tailwind({
    //   applyBaseStyles: false,
    // }),
    // liveCode({
    //   layout: '/src/components/LiveCodeLayout.astro',
    // }),
  ],
});
