---
title: Animation repeat forever when orientation changed
date: 2020-11-30 00:07:37
tags:
    - SwiftUI
    - UserInterfaceSizeClass
    - repeatForever
    - animation
categories:
    - iOS
---

```swift
...
    @State private var lastSizeClass: UserInterfaceSizeClass?
    @Environment(\.horizontalSizeClass) var horizontalSizeClass: UserInterfaceSizeClass?

...
var playButton: some View {
        return ZStack {
            Color
                .white
                .frame(width: 140, height: 100, alignment: .center)
                .clipRounded(40.0)
                .opacity(self.lastSizeClass == self.horizontalSizeClass ? 0 : 0.5)
                .scaleEffect(self.lastSizeClass == self.horizontalSizeClass ? 1.2 : 0)
                .animation(Animation
                            .easeOut(duration: 2)
                            .delay(2)
                            .repeatForever(autoreverses: false),
                           value: self.lastSizeClass)
                .onAppear{
                    self.lastSizeClass = self.lastSizeClass == .compact ? .regular : .compact
                }
            ...
        }
    }

...
    var body: some View {
...
if horizontalSizeClass == .regular {
                ...
               playButton

                ...
            } else {
            ...
               playButton

                ...
            }
            
            ...
```
