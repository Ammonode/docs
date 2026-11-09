import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Ammonode',
  description: 'Billing and game server management in one panel.',
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Billing', link: '/billing/setup' },
      { text: 'Extensions', link: '/extensions/overview' },
    ],
    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Install the panel', link: '/guide/install-panel' },
          { text: 'Web server', link: '/guide/webserver' },
          { text: 'Install the daemon', link: '/guide/install-daemon' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Mail and sign in', link: '/guide/mail-oauth' },
          { text: 'Upgrading', link: '/guide/upgrading' },
        ],
      },
      {
        text: 'Billing',
        items: [
          { text: 'Products and plans', link: '/billing/setup' },
          { text: 'Stripe and PayPal', link: '/billing/gateways' },
        ],
      },
      {
        text: 'Game servers',
        items: [
          { text: 'Eggs', link: '/servers/eggs' },
          { text: 'Backups', link: '/servers/backups' },
          { text: 'Transfers', link: '/servers/transfers' },
        ],
      },
      {
        text: 'Extensions and themes',
        items: [
          { text: 'Overview', link: '/extensions/overview' },
          { text: 'Server API', link: '/extensions/server' },
          { text: 'Web API', link: '/extensions/web' },
          { text: 'Themes', link: '/extensions/themes' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Ammonode' }],
    editLink: { pattern: 'https://github.com/Ammonode/docs/edit/main/:path' },
    search: { provider: 'local' },
    footer: { message: 'Released under the MIT License.' },
  },
})
