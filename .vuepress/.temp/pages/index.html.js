import comp from "/Users/aben/Git/aben.io/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"/hero.png\",\"heroText\":\"Aben's Blog\",\"tagline\":\"技术分享与学习笔记\",\"actions\":[{\"text\":\"开始阅读\",\"link\":\"/blogs/\",\"type\":\"primary\"}],\"features\":[{\"title\":\"Docker\",\"details\":\"容器化技术与实践\"},{\"title\":\"iOS 开发\",\"details\":\"SwiftUI 与 iOS 开发技巧\"},{\"title\":\"后端开发\",\"details\":\"Node.js、Golang 等后端技术\"}],\"footer\":\"MIT Licensed | Copyright © 2020-present Aben\"},\"git\":{\"updatedTime\":1609587349000,\"contributors\":[{\"name\":\"rushairer\",\"username\":\"rushairer\",\"email\":\"5195693+rushairer@users.noreply.github.com\",\"commits\":4,\"url\":\"https://github.com/rushairer\"}],\"changelog\":[{\"hash\":\"eea207517a53351409f82ed92886db7860c384f8\",\"time\":1609587349000,\"email\":\"5195693+rushairer@users.noreply.github.com\",\"author\":\"Aben\",\"message\":\"Update README.md\"},{\"hash\":\"c3047067d64d064894f7e9fb51203bd8b4511722\",\"time\":1599314940000,\"email\":\"5195693+rushairer@users.noreply.github.com\",\"author\":\"Aben\",\"message\":\"Update README.md\"},{\"hash\":\"68af0fda428e22c8eec9aee5fe55e5321a346b51\",\"time\":1599063884000,\"email\":\"5195693+rushairer@users.noreply.github.com\",\"author\":\"Abenx\",\"message\":\"no message\"},{\"hash\":\"124e2dc48adffd3986dfb2c6669213150d583f3c\",\"time\":1598977526000,\"email\":\"5195693+rushairer@users.noreply.github.com\",\"author\":\"Abenx\",\"message\":\"[Init]\"}]},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
