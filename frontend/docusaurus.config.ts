import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics Textbook',
  tagline: 'Bridging theory and practice in embodied intelligence',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'physical-ai-robotics-textbook', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.module.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    algolia: {
      appId: 'YOUR_ALGOLIA_APP_ID',
      apiKey: 'YOUR_ALGOLIA_SEARCH_API_KEY',
      indexName: 'YOUR_ALGOLIA_INDEX_NAME',
      // Optional: see doc section bellow
      contextualSearch: true,
      // Optional: Specify set of paths to exclude from search.
      // E.g. adds 'advanced' to Algolia search options.
      // exclude: ['/advanced/'],
      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that doesn't require JavaScript.
      // Will be built as '/' + path.
      // disabled in v4
      // searchPagePath: 'search',
    },    navbar: {
      title: 'Physical AI & Humanoid Robotics Textbook',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Why Physical AI Matters',
          to: '/docs/why-physical-ai-matters',
          position: 'left',
        },
        {
          label: 'Modules',
          position: 'left',
          items: [
            {
              label: 'Module 1: The Robotic Nervous System (ROS 2)',
              to: '/docs/modules/module-1',
            },
            {
              label: 'Module 2: The Digital Twin (Gazebo & Unity)',
              to: '/docs/modules/module-2',
            },
            {
              label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
              to: '/docs/modules/module-3',
            },
            {
              label: 'Module 4: Vision-Language-Action (VLA)',
              to: '/docs/modules/module-4',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Textbook',
          items: [
            {
              label: 'Why Physical AI Matters',
              to: '/docs/why-physical-ai-matters',
            },
            {
              label: 'Module 1: The Robotic Nervous System (ROS 2)',
              to: '/docs/modules/module-1',
            },
            {
              label: 'Module 2: The Digital Twin (Gazebo & Unity)',
              to: '/docs/modules/module-2',
            },
            {
              label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
              to: '/docs/modules/module-3',
            },
            {
              label: 'Module 4: Vision-Language-Action (VLA)',
              to: '/docs/modules/module-4',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Weekly Breakdowns',
              to: '/docs/weekly-breakdowns/week-1',
            },
            {
              label: 'Assessments',
              to: '/docs/assessments/module-1-assessment',
            },
            {
              label: 'ROS 2 Documentation',
              href: 'https://docs.ros.org/en/humble/',
            },
            {
              label: 'NVIDIA Isaac Documentation',
              href: 'https://docs.nvidia.com/isaac/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
