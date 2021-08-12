---
title: Binding @@Environment to @Binding value.
date: 2021-08-13 00:24:05
tags:
    - SwiftUI
    - @Environment
    - @Binding
categories:
    - iOS
---


```swift
class AlbumViewModel: ObservableObject {
    @Published var currentAssetLocalIdentifier: String?
}

extension EnvironmentValues {
    var albumViewModel: AlbumViewModel {
        get {
            return self[AlbumViewModelKey.self]
        }
        
        set {
            self[AlbumViewModelKey.self] = newValue
        }
    }
}

private struct AlbumViewModelKey: EnvironmentKey {
    static let defaultValue: AlbumViewModel = AlbumViewModel()
}
```

```swift

    @Environment(\.albumViewModel) var albumViewModel: AlbumViewModel
    
    
    var body: some View {
      ...
      
      /// @Environment unlike @StateObject, can not using $albumViewModel.$currentAssetLocalIdentifier.
      TabView(selection: .init(get: {
                        albumViewModel.currentAssetLocalIdentifier
                    }, set: { id in
                        albumViewModel.currentAssetLocalIdentifier = id
                    })) {
                    
                    ....
    
    }

```
