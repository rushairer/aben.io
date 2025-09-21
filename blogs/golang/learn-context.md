---
title: Go Context 学习笔记
date: 2025-09-21 22:21:00
tags:
    - golang
    - context
categories:
    - golang
---

# Go Context 学习笔记

## 1. Context 接口的四个核心方法

### 1.1 接口定义
```go
type Context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key interface{}) interface{}
}
```

### 1.2 方法详解

#### `Deadline() (deadline time.Time, ok bool)`
**作用**：返回上下文的截止时间
- **返回值**：
  - `deadline`：截止时间
  - `ok`：布尔值，表示是否设置了截止时间
- **含义**：告诉调用者这个上下文何时应该被取消。如果没有设置截止时间，`ok` 返回 `false`
- **特点**：连续调用会返回相同的结果

#### `Done() <-chan struct{}`
**作用**：返回一个只读通道，当上下文应该被取消时，该通道会被关闭
- **返回值**：只读的 `struct{}` 类型通道
- **含义**：
  - 用于监听取消信号
  - 通道关闭表示工作应该停止
  - 如果上下文永远不会被取消，可能返回 `nil`
- **使用场景**：主要用在 `select` 语句中进行取消检测
- **触发条件**：
  - `WithCancel` 调用 cancel 函数时
  - `WithDeadline` 到达截止时间时
  - `WithTimeout` 超时时

#### `Err() error`
**作用**：返回上下文被取消的原因
- **返回值**：
  - 如果 `Done` 通道未关闭：返回 `nil`
  - 如果 `Done` 通道已关闭：返回具体的错误原因
- **可能的错误类型**：
  - `DeadlineExceeded`：超过截止时间
  - `Canceled`：被其他原因取消
- **特点**：一旦返回非 `nil` 错误，后续调用返回相同错误

#### `Value(key interface{}) interface{}`
**作用**：根据键获取上下文中存储的值
- **参数**：`key` - 任何支持相等比较的类型
- **返回值**：与键关联的值，如果不存在则返回 `nil`
- **使用原则**：
  - 仅用于请求范围的数据传递
  - 不应用于传递可选参数给函数
  - 键应该定义为未导出类型以避免冲突
- **特点**：相同键的连续调用返回相同结果

## 2. 自定义 Context 实现示例

### 2.1 基础 Context 实现
```go
package main

import (
    "fmt"
    "sync"
    "time"
)

// 基础的 emptyCtx
type emptyCtx int

func (*emptyCtx) Deadline() (deadline time.Time, ok bool) {
    return
}

func (*emptyCtx) Done() <-chan struct{} {
    return nil
}

func (*emptyCtx) Err() error {
    return nil
}

func (*emptyCtx) Value(key interface{}) interface{} {
    return nil
}

var (
    background = new(emptyCtx)
    todo       = new(emptyCtx)
)

func Background() Context {
    return background
}

func TODO() Context {
    return todo
}
```

### 2.2 可取消 Context
```go
type cancelCtx struct {
    Context
    mu       sync.Mutex
    done     chan struct{}
    children map[canceler]struct{}
    err      error
}

type canceler interface {
    cancel(removeFromParent bool, err error)
    Done() <-chan struct{}
}

func (c *cancelCtx) Done() <-chan struct{} {
    c.mu.Lock()
    if c.done == nil {
        c.done = make(chan struct{})
    }
    d := c.done
    c.mu.Unlock()
    return d
}

func (c *cancelCtx) Err() error {
    c.mu.Lock()
    err := c.err
    c.mu.Unlock()
    return err
}

func (c *cancelCtx) cancel(removeFromParent bool, err error) {
    if err == nil {
        panic("context: internal error: missing cancel error")
    }
    c.mu.Lock()
    if c.err != nil {
        c.mu.Unlock()
        return // 已经被取消了
    }
    c.err = err
    if c.done == nil {
        c.done = closedchan
    } else {
        close(c.done)
    }
    for child := range c.children {
        child.cancel(false, err)
    }
    c.children = nil
    c.mu.Unlock()
}
```

### 2.3 超时 Context
```go
type timerCtx struct {
    cancelCtx
    timer *time.Timer
    deadline time.Time
}

func (c *timerCtx) Deadline() (deadline time.Time, ok bool) {
    return c.deadline, true
}

func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc) {
    return WithDeadline(parent, time.Now().Add(timeout))
}

func WithDeadline(parent Context, d time.Time) (Context, CancelFunc) {
    if cur, ok := parent.Deadline(); ok && cur.Before(d) {
        return WithCancel(parent)
    }
    
    c := &timerCtx{
        cancelCtx: newCancelCtx(parent),
        deadline:  d,
    }
    
    dur := time.Until(d)
    if dur <= 0 {
        c.cancel(true, DeadlineExceeded)
        return c, func() { c.cancel(false, Canceled) }
    }
    
    c.timer = time.AfterFunc(dur, func() {
        c.cancel(true, DeadlineExceeded)
    })
    
    return c, func() { c.cancel(true, Canceled) }
}
```

## 3. Context 使用原则

### 3.1 ✅ 应该放在 Context 中的
1. **请求范围的数据**：用户ID、请求ID、trace信息
2. **跨进程/API边界的数据**：认证信息、元数据
3. **取消信号和超时**：deadline、cancellation
4. **调试信息**：trace ID、span ID

### 3.2 ❌ 不应该放在 Context 中的
1. **可选的函数参数**：配置项、选项
2. **业务逻辑**：计算方法、验证逻辑
3. **依赖项**：数据库连接、HTTP 客户端
4. **可变状态**：计数器、累加器

### 3.3 正确的封装方式

#### 请求上下文封装
```go
// RequestContext 封装请求相关信息
type RequestContext struct {
    context.Context
    RequestID   string
    UserID      int64
    UserRole    string
    ClientIP    string
    UserAgent   string
    StartTime   time.Time
    TraceID     string
    SpanID      string
}

type contextKey string
const requestContextKey contextKey = "request_context"

func NewRequestContext(ctx context.Context, c *gin.Context) *RequestContext {
    reqCtx := &RequestContext{
        Context:   ctx,
        RequestID: c.GetHeader("X-Request-ID"),
        ClientIP:  c.ClientIP(),
        UserAgent: c.GetHeader("User-Agent"),
        StartTime: time.Now(),
        TraceID:   c.GetHeader("X-Trace-ID"),
    }
    
    if userID, exists := c.Get("user_id"); exists {
        reqCtx.UserID = userID.(int64)
    }
    if role, exists := c.Get("user_role"); exists {
        reqCtx.UserRole = role.(string)
    }
    
    return reqCtx
}

func WithRequestContext(ctx context.Context, reqCtx *RequestContext) context.Context {
    return context.WithValue(ctx, requestContextKey, reqCtx)
}

func FromContext(ctx context.Context) (*RequestContext, bool) {
    reqCtx, ok := ctx.Value(requestContextKey).(*RequestContext)
    return reqCtx, ok
}
```

#### 认证信息封装
```go
// 只存储认证后的数据
type AuthInfo struct {
    UserID    int64
    SessionID string
    Token     string
    ExpiresAt time.Time
}

type authInfoKey struct{}

func WithAuthInfo(ctx context.Context, auth *AuthInfo) context.Context {
    return context.WithValue(ctx, authInfoKey{}, auth)
}

func GetAuthInfo(ctx context.Context) (*AuthInfo, bool) {
    auth, ok := ctx.Value(authInfoKey{}).(*AuthInfo)
    return auth, ok
}

// 专门的认证服务处理业务逻辑
type AuthService struct {
    sessionStore SessionStore
    tokenParser  TokenParser
}

func (a *AuthService) ValidateToken(tokenString string) (*AuthInfo, error) {
    token, err := a.tokenParser.Parse(tokenString)
    if err != nil {
        return nil, fmt.Errorf("invalid token: %w", err)
    }
    
    session, err := a.sessionStore.Get(token.SessionID)
    if err != nil {
        return nil, fmt.Errorf("session not found: %w", err)
    }
    
    return &AuthInfo{
        UserID:    session.UserID,
        SessionID: session.ID,
        Token:     tokenString,
        ExpiresAt: token.ExpiresAt,
    }, nil
}
```

## 4. 避免 Context 滥用

### 4.1 滥用示例分析

#### ❌ 错误的 Token Context 设计
```go
// 这样的设计有问题
type tokenContext struct {
    session    Session  // ✅ 数据存储 - 合适
    tokenCache Token    // ✅ 数据存储 - 合适  
}

// 但这样使用就有问题了：
ctx, cancel := WithTokenContext(ctx *gin.Context)  // ❌ 让 Context 承担验证职责
// 验证失败时 <-ctx.Done() // ❌ 滥用取消机制
```

**问题**：
1. **混淆了 Context 的职责**：让 Context 承担验证职责
2. **滥用取消机制**：用取消表示业务验证失败
3. **语义混乱**：cancel() 的含义不明确

#### ✅ 正确的设计
```go
// Context 只存储数据 + 专门的认证服务
func AuthMiddleware(authService *AuthService) gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(401, gin.H{"error": "missing token"})
            c.Abort()
            return
        }
        
        // 验证 token（业务逻辑）
        authInfo, err := authService.ValidateToken(token)
        if err != nil {
            c.JSON(401, gin.H{"error": err.Error()})
            c.Abort()
            return
        }
        
        // 将认证信息存储到 Context（数据传递）
        ctx := WithAuthInfo(c.Request.Context(), authInfo)
        c.Request = c.Request.WithContext(ctx)
        
        c.Next()
    }
}
```

### 4.2 依赖注入 vs Context

#### ❌ 不应该通过 Context 传递的
```go
// 错误：通过 Context 传递依赖
WithCache(ctx, redis, prefix, ttl)
WithDatabase(ctx, db)
WithLogger(ctx, logger)
```

#### ✅ 应该通过依赖注入
```go
// 正确：通过构造函数注入依赖
type AccountService struct {
    emailRepo   account.EmailRepository
    logger      *logrus.Logger
    cache       *redis.Client
    permService *PermissionService
}

func (s *AccountService) EmailRegister(ctx context.Context, email string) error {
    // 从 context 获取请求信息
    reqInfo, _ := GetRequestInfo(ctx)
    
    // 使用注入的依赖
    s.logger.WithField("request_id", reqInfo.RequestID).Info("开始注册")
    
    return s.emailRepo.Create(ctx, email)
}
```

## 5. 开源项目中的 Context 使用案例

### 5.1 分布式追踪 (OpenTelemetry)
```go
// github.com/open-telemetry/opentelemetry-go
import (
    "go.opentelemetry.io/otel/trace"
    "go.opentelemetry.io/otel"
)

func handleRequest(ctx context.Context) {
    // 创建 span 并存储到 context
    tracer := otel.Tracer("my-service")
    ctx, span := tracer.Start(ctx, "handle-request")
    defer span.End()
    
    // 调用其他服务时传递 trace context
    processOrder(ctx)
}

func processOrder(ctx context.Context) {
    // 从 context 获取当前 span
    span := trace.SpanFromContext(ctx)
    span.SetAttributes(attribute.String("order.id", "12345"))
    
    // 创建子 span
    _, childSpan := tracer.Start(ctx, "validate-order")
    defer childSpan.End()
}

// github.com/jaegertracing/jaeger-client-go
import "github.com/opentracing/opentracing-go"

func businessLogic(ctx context.Context) {
    // 从 context 获取 span
    span, ctx := opentracing.StartSpanFromContext(ctx, "business-logic")
    defer span.Finish()
    
    span.SetTag("user.id", getUserID(ctx))
    
    // 传递给下游服务
    callExternalAPI(ctx)
}

```

### 5.2 认证和授权信息
```go
// google.golang.org/grpc
import (
    "google.golang.org/grpc/metadata"
    "google.golang.org/grpc/credentials"
)

func (s *server) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
    // 从 context 获取认证信息
    md, ok := metadata.FromIncomingContext(ctx)
    if !ok {
        return nil, status.Error(codes.Unauthenticated, "missing metadata")
    }
    
    token := md.Get("authorization")[0]
    userInfo, err := validateToken(token)
    if err != nil {
        return nil, status.Error(codes.Unauthenticated, "invalid token")
    }
    
    // 将用户信息存储到 context 传递给下游
    ctx = context.WithValue(ctx, "user_info", userInfo)
    return s.userService.GetUser(ctx, req.UserId)
}

// github.com/casbin/casbin
type contextKey string
const (
    subjectKey contextKey = "subject"
    domainKey  contextKey = "domain"
)

func WithSubject(ctx context.Context, subject string) context.Context {
    return context.WithValue(ctx, subjectKey, subject)
}

func WithDomain(ctx context.Context, domain string) context.Context {
    return context.WithValue(ctx, domainKey, domain)
}


```

### 5.3 多租户 (Multi-tenancy)
```go
// k8s.io/apiserver/pkg/endpoints/request
type RequestInfo struct {
    IsResourceRequest bool
    Path              string
    Verb              string
    APIPrefix         string
    APIGroup          string
    APIVersion        string
    Namespace         string  // 租户隔离
    Resource          string
    Subresource       string
    Name              string
    Parts             []string
}

func WithRequestInfo(ctx context.Context, info *RequestInfo) context.Context {
    return context.WithValue(ctx, requestInfoKey, info)
}

// istio.io/istio/pkg/config/context
type Context struct {
    // 租户信息
    Namespace string
    Cluster   string
    Network   string
}
```

### 5.4 请求 ID 和关联 ID
```go
// github.com/gin-gonic/gin
func RequestIDMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        requestID := c.GetHeader("X-Request-ID")
        if requestID == "" {
            requestID = generateRequestID()
        }
        
        // 存储到 context
        ctx := context.WithValue(c.Request.Context(), "request_id", requestID)
        c.Request = c.Request.WithContext(ctx)
        
        // 添加到响应头
        c.Header("X-Request-ID", requestID)
        c.Next()
    }
}

// github.com/labstack/echo
func (e *Echo) Use(middleware ...MiddlewareFunc) {
    // Echo 内部使用 context 存储请求相关信息
    c.Set("request_id", requestID)
    c.Set("user_id", userID)
}
```

### 5.5 地理位置和语言
```go
// Shopify 风格的地理位置信息
type LocationContext struct {
    Country     string
    Region      string
    Currency    string
    Language    string
    Timezone    string
}

func WithLocation(ctx context.Context, loc *LocationContext) context.Context {
    return context.WithValue(ctx, locationKey, loc)
}

// github.com/stripe/stripe-go
type RequestContext struct {
    Account   string  // Stripe Connect 账户
    APIKey    string  // API 密钥
    UserAgent string
    Language  string  // 国际化
}

```

### 5.6 工作流和状态信息
```go
// go.temporal.io/sdk/workflow
func MyWorkflow(ctx workflow.Context, input string) error {
    // workflow context 包含执行信息
    info := workflow.GetInfo(ctx)
    logger := workflow.GetLogger(ctx)
    
    logger.Info("Workflow started", "WorkflowID", info.WorkflowExecution.ID)
    
    // 传递给 activity
    ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
        StartToCloseTimeout: time.Minute,
    })
    
    return workflow.ExecuteActivity(ctx, MyActivity, input).Get(ctx, nil)
}

// go.uber.org/cadence/workflow
type WorkflowContext struct {
    WorkflowID   string
    RunID        string
    TaskList     string
    Domain       string
}

```

### 5.7 组织和部门信息
```go
// gitlab.com/gitlab-org/gitlab
type ProjectContext struct {
    ProjectID   int64
    NamespaceID int64
    UserID      int64
    GroupID     int64  // 组织信息
}

func WithProjectContext(ctx context.Context, pc *ProjectContext) context.Context {
    return context.WithValue(ctx, projectContextKey, pc)
}


// github.com/google/go-github
type Context struct {
    Owner      string  // 组织或用户
    Repository string  // 仓库
    Branch     string  // 分支
}

```

### 5.8 设备和客户端信息
```go
// firebase.google.com/go
type ClientContext struct {
    AppID       string
    Platform    string  // iOS, Android, Web
    Version     string
    DeviceID    string
    UserAgent   string
}


// github.com/twilio/twilio-go
type RequestContext struct {
    AccountSid string
    AuthToken  string
    Region     string
    Edge       string
}

```

### 5.9 监控和指标

```go
// github.com/prometheus/client_golang
import "github.com/prometheus/client_golang/prometheus"

type MetricsContext struct {
    Labels prometheus.Labels
    Registry *prometheus.Registry
}

func WithMetrics(ctx context.Context, mc *MetricsContext) context.Context {
    return context.WithValue(ctx, metricsKey, mc)
}


// github.com/DataDog/dd-trace-go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func handleRequest(ctx context.Context) {
    span, ctx := tracer.StartSpanFromContext(ctx, "web.request")
    defer span.Finish()
    
    span.SetTag("user.id", getUserID(ctx))
    span.SetTag("http.method", "POST")
}

```

## 6. 适合存储在 Context 中的数据特征

### 6.1 核心特征
1. **请求范围**：与特定请求相关
2. **只读数据**：不会被修改
3. **跨层传递**：需要在多个层级间传递
4. **身份标识**：用户、租户、会话等身份信息
5. **元数据**：请求ID、追踪信息、地理位置等

### 6.2 常见使用场景
- **用户身份**：UserID, SessionID, Role
- **请求追踪**：RequestID, TraceID, SpanID
- **多租户**：TenantID, Namespace, Organization
- **地理位置**：Country, Region, Timezone, Language
- **设备信息**：Platform, Version, DeviceID
- **工作流**：WorkflowID, ExecutionID, TaskID

## 7. 学习资源

### 7.1 官方资源
- [Go Blog: Context](https://blog.golang.org/context)
- [Go Blog: Pipelines and cancellation](https://blog.golang.org/pipelines)
- [Context Package Documentation](https://pkg.go.dev/context)

### 7.2 开源项目示例
```bash
# OpenTelemetry 分布式追踪
git clone https://github.com/open-telemetry/opentelemetry-go
cd opentelemetry-go/example

# gRPC 认证示例
git clone https://github.com/grpc/grpc-go
cd grpc-go/examples/features/authentication

# Gin 中间件示例
git clone https://github.com/gin-gonic/examples
cd examples/middleware

# Kubernetes 请求处理
git clone https://github.com/kubernetes/kubernetes
# 查看 staging/src/k8s.io/apiserver/pkg/endpoints/request/
```

## 8. 总结

Context 是 Go 语言中强大的上下文管理机制，正确使用的关键是：

1. **明确职责**：Context 用于数据传递，不承担业务逻辑
2. **遵循原则**：只存储请求范围的只读数据
3. **避免滥用**：不要用 Context 替代依赖注入
4. **学习实践**：参考优秀开源项目的使用方式
5. **类型安全**：使用自定义 key 类型避免冲突

通过合理使用 Context，可以构建出清晰、可维护、可测试的 Go 应用程序。