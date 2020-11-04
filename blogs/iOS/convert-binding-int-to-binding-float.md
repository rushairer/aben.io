---
title: Convert Binding<Int> to Binding<Float>
date: 2020-11-05 01:34:55
tags:
    - SwiftUI
categories:
    - iOS
---

``` swift


extension Binding where Value == Int {
    public func float() -> Binding<Float> {
        return Binding<Float>(get:{ Float(self.wrappedValue) },
            set: { self.wrappedValue = Int($0)})
    }
}


...

// self.$data.count is Binding<Int>
Slider(value: self.$data.count.float(), in:1...16) {
                Text("Number")
}

```
