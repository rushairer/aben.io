---
title: 清理 SwiftUI Preview 模拟器环境缓存
date: 2020-09-03
tags:
    - SwiftUI
    - iOS
categories:
    - iOS
---

```shell
# Try to delete the preview canvas from here
~/Library/Developer/Xcode/UserData/Previews/Simulator Devices/

# then in command line run the following
killall -9 com.apple.CoreSimulator.CoreSimulatorService

# finally restart XCode

```
