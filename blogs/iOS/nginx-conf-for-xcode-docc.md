---
title: Nginx conf for Xcode DocC
date: 2021-07-27 19:07:45
tags:
    - Swift
    - DocC
    - Xcode
    - Nginx
categories:
    - iOS
---

```conf
   server {
      listen 0.0.0.0:8080;
      
      location / {
          return 301 http://docc.io84.com/documentation/abalbum ;
      }
  
      location ~* ^/(documentation|tutorials) {
          root   /app;
          try_files $uri $uri/ /documentation/index.html;
      }

      location ~* ^/(css|js|data|images|downloads|img|videos)\/.*$ {
          root   /app;
          try_files $uri /documentation/$uri;
      }
      
      location ~* ^/(favicon\.ico|favicon\.svg|theme-settings\.json)$ {
          root   /app;
          try_files $uri /documentation/$uri;
      }
  }
```


```shell
http://localhost/documentation/yourdocument
```
