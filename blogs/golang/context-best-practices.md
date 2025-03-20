---
title: Go 中 context 的最佳实践和使用范式
date: 2025-03-21
tags:
    - golang
    - context
categories:
    - golang
---

# Go 协程超时处理的最佳实践
## 2. 常见超时处理场景
### 2.1 单协程超时控制

```go
func ProcessWithTimeout(orderID string) error {
    // 创建带超时的 context
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()  // 防止资源泄露

    done := make(chan error, 1)

    go func() {
        done <- processOrder(ctx, orderID)
    }()

    // 等待处理完成或超时
    select {
    case err := <-done:
        return err
    case <-ctx.Done():
        return fmt.Errorf("处理超时: %v", ctx.Err())
    }
}
```

### 2.3 HTTP 请求超时

```go
func FetchDataWithTimeout(url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}
```

## 3. 最佳实践建议
### 3.2 错误处理

1. **区分超时类型**
   ```go
   if err := ProcessWithTimeout(orderID); err != nil {
       if err == context.DeadlineExceeded {
           // 处理超时错误
       } else if err == context.Canceled {
           // 处理取消错误
       } else {
           // 处理其他业务错误
       }
   }
   ```

2. **优雅降级**
   - 超时时释放资源
   - 提供部分结果
   - 考虑重试机制

### 3.3 资源管理

1. **使用 defer cancel()**
   - 确保 context 及时取消
   - 防止协程泄露
   - 释放相关资源

2. **合理设置缓冲区**
   ```go
   // 为避免协程阻塞，channel 应该有足够的缓冲区
   errChan := make(chan error, len(orderIDs))
   ```

## 4. 注意事项

1. **避免常见陷阱**
   - 不要在循环中直接使用循环变量
   - 确保所有协程都能正确退出
   - 注意 channel 的缓冲区大小

2. **性能优化**
   - 合理控制并发数量
   - 避免过多的 context 嵌套
   - 及时清理无用的 context

3. **调试建议**
   - 添加详细的日志
   - 监控超时情况
   - 定期检查系统性能