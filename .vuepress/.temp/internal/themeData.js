export const themeData = JSON.parse("{\"logo\":\"/logo.png\",\"navbar\":[{\"text\":\"Home\",\"link\":\"/\"},{\"text\":\"Docker\",\"link\":\"/blogs/Docker/\"},{\"text\":\"Node.js\",\"link\":\"/blogs/Node.js/\"},{\"text\":\"Golang\",\"link\":\"/blogs/golang/\"},{\"text\":\"iOS\",\"link\":\"/blogs/iOS/\"},{\"text\":\"macOS\",\"link\":\"/blogs/macOS/\"}],\"sidebar\":{\"/blogs/\":[{\"text\":\"Docker\",\"children\":[\"/blogs/Docker/caddy.md\",\"/blogs/Docker/docker-commands-of-my-router.md\",\"/blogs/Docker/renew-k8s-certs.md\",\"/blogs/Docker/run-certbot-with-nginx.md\"]},{\"text\":\"Node.js\",\"children\":[\"/blogs/Node.js/reinstall-packages-when-updated-npm.md\"]},{\"text\":\"Golang\",\"children\":[\"/blogs/golang/context-best-practices.md\",\"/blogs/golang/genericswithinterface.md\",\"/blogs/golang/learn-gin.md\",\"/blogs/golang/middlewarelikegin.md\"]},{\"text\":\"iOS\",\"children\":[\"/blogs/iOS/animation-repeatforever-when-orientation-changed.md\",\"/blogs/iOS/binding-environment-value.md\",\"/blogs/iOS/clean-swiftui-simulator-caches.md\",\"/blogs/iOS/convert-binding-int-to-binding-float.md\",\"/blogs/iOS/fix-category-overrides-method-from-class-warning.md\",\"/blogs/iOS/nginx-conf-for-xcode-docc.md\",\"/blogs/iOS/swiftui-contextmenu-contentshape.md\",\"/blogs/iOS/swiftui-preview-a-fetch-request-must-have-an-entity-error.md\",\"/blogs/iOS/swiftui-preview-stuck-on-automatic-preview-updating-paused.md\"]},{\"text\":\"macOS\",\"children\":[\"/blogs/macOS/relink-applications-with-brew.md\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
