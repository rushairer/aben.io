---
title: Fix "category overrides method from class" warning
date: 2021-09-19 00:10:48
tags:
    - Xcode
categories:
    - iOS
---

Instance method in category overrides method from class (linker warning).

Add 
```shell
-Xlinker
-no_objc_category_merging
```
to the Other Linker Flags and the warning was suppressed

