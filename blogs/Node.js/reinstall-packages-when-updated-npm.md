---
title: 升级npm后重新安装全局packages
date: 2020-09-05 22:05:18
tags:
    - Node.js
categories:
    - Node.js
---


```shell
nvm install lts/dubnium  --latest-npm --reinstall-packages-from=$(nvm current)
nvm install lts/erbium  --latest-npm --reinstall-packages-from=$(nvm current)
```
