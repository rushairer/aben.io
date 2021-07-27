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
        location ~* ^/(documentation|tutorials) {
            root   /path/of/YourDocument.docc;
            try_files $uri $uri/ /documentation/index.html;
        }

        location ~* ^/(css|js|data|images|downloads|favicon\.ico|favicon\.svg|img|theme-settings\.json|videos)\/.*$ {
            root   /path/of/YourDocument.docc;
            try_files $uri /documentation/$uri;
        }
```


```shell
http://localhost/documentation/yourdocument
```
