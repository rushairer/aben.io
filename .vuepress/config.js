import { defineUserConfig } from '@vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  bundler: viteBundler(),
  title: "Aben's Blog",
  description: "This is aben's blog.",
  dest: "public",
  head: [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Docker', link: '/blogs/Docker/' },
      { text: 'Node.js', link: '/blogs/Node.js/' },
      { text: 'Golang', link: '/blogs/golang/' },
      { text: 'iOS', link: '/blogs/iOS/' },
      { text: 'macOS', link: '/blogs/macOS/' }
    ],
    sidebar: {
      '/blogs/': [
        {
          text: 'Docker',
          children: [
            '/blogs/Docker/caddy.md',
            '/blogs/Docker/docker-commands-of-my-router.md',
            '/blogs/Docker/renew-k8s-certs.md',
            '/blogs/Docker/run-certbot-with-nginx.md'
          ]
        },
        {
          text: 'Node.js',
          children: [
            '/blogs/Node.js/reinstall-packages-when-updated-npm.md'
          ]
        },
        {
          text: 'Golang',
          children: [
            '/blogs/golang/context-best-practices.md',
            '/blogs/golang/genericswithinterface.md',
            '/blogs/golang/learn-gin.md',
            '/blogs/golang/middlewarelikegin.md'
          ]
        },
        {
          text: 'iOS',
          children: [
            '/blogs/iOS/animation-repeatforever-when-orientation-changed.md',
            '/blogs/iOS/binding-environment-value.md',
            '/blogs/iOS/clean-swiftui-simulator-caches.md',
            '/blogs/iOS/convert-binding-int-to-binding-float.md',
            '/blogs/iOS/fix-category-overrides-method-from-class-warning.md',
            '/blogs/iOS/nginx-conf-for-xcode-docc.md',
            '/blogs/iOS/swiftui-contextmenu-contentshape.md',
            '/blogs/iOS/swiftui-preview-a-fetch-request-must-have-an-entity-error.md',
            '/blogs/iOS/swiftui-preview-stuck-on-automatic-preview-updating-paused.md'
          ]
        },
        {
          text: 'macOS',
          children: [
            '/blogs/macOS/relink-applications-with-brew.md'
          ]
        }
      ]
    }
  }),
  markdown: {
    lineNumbers: true
  }
})
