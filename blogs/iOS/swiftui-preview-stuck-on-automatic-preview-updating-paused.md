---
title: 配置自增build号后，SwiftUI无法预览，提示“automatic preview updating paused”的问题
date: 2020-09-16 23:20:12
tags:
    - SwiftUI
categories:
    - iOS
---

```shell
#cd ${CODESIGNING_FOLDER_PATH}
if [ $ENABLE_PREVIEWS == "NO" ]
then
    # Number
    version=`/usr/libexec/PlistBuddy -c "Print CFBundleVersion" $PRODUCT_SETTINGS_PATH`
    version=`expr $version + 1`
    # Or Time
    #formatDate=$(date "+%Y%m%d%H%M%S")
    #version=${formatDate}
    
    #/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $version" $PRODUCT_SETTINGS_PATH
    /usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${version}" "${PROJECT_DIR}/${INFOPLIST_FILE}"
else
  echo "Skipping Bump of version"
  echo $ENABLE_PREVIEWS
fi
```
