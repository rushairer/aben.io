---
title: 系统升级后brew命令创建的程序需要relink
date: 2020-09-05 21:54:00
tags:
    - macOS
    - brew
categories:
    - macOS
---

```shell
 brew list -1 | while read line; do brew unlink $line; brew link $line; done

```
