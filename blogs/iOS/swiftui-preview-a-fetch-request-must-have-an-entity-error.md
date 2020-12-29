---
title: SwiftUI Preview has error "A fetch request must have an entity"
date: 2020-12-29 17:11:41
tags:
    - SwiftUI
categories:
    - iOS
---

Change

``` swift
struct SheetMusicView_Previews: PreviewProvider {
    static var previews: some View {        
        SheetMusicView()
            .environment(\.managedObjectContext, PersistenceController.shared.container.viewContext)
    }
}

```

To

```swift
struct SheetMusicView_Previews: PreviewProvider {
    static var previews: some View {
        let context = PersistenceController.shared.container.viewContext
        return SheetMusicView()
            .environment(\.managedObjectContext, context)
    }
}
```
