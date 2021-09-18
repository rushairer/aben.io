---
title: SwiftUI ContextMenu cliped with contentShape
date: 2021年09月13日15:19:36
tags:
    - SwiftUI
categories:
    - iOS
---


```swift

                                .contentShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                                .contextMenu(ContextMenu(menuItems: {
                                    Button {
                                    } label: {
                                        HStack {
                                            Text("Save Image")
                                                .padding(20)
                                            Image(systemName: "square.and.arrow.down")
                                                .resizable()
                                                .font(.title)
                                        }
                                    }
                                }))
                                
```
