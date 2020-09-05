module.exports = {
  "title": "Aben's Blog",
  "description": "This is aben's blog.",
  "dest": "public",
  "head": [
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
  "theme": "reco",
  "themeConfig": {
    "valineConfig": {
      "appId": "KQXnjWYg1fgbPFTsKxmp8R88-gzGzoHsz",
      "appKey": "mQV2EaGlDOHTKsnCgS6o9A8J",
    },
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "More",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/rushairer",
            "icon": "reco-github"
          },
          {
            "text": "Backend",
            "link": "https://github.com/rushairer/aben.io",
            "icon": "reco-lock"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Aben",
    "authorAvatar": "/avatar.jpg",
    "record": "",
    "startYear": "2020"
  },
  "markdown": {
    "lineNumbers": true
  }
}
