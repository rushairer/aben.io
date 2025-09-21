<template><div><p>Gin 中间件的核心原理并实现一个简单的中间件框架。Gin 的中间件本质上是基于责任链模式实现的。</p>
<p>以下是一个简化版的中间件框架实现：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code class="language-go"><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"net/http"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 上下文对象</span></span>
<span class="line"><span class="token keyword">type</span> Context <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Writer  http<span class="token punctuation">.</span>ResponseWriter</span>
<span class="line">    Request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request</span>
<span class="line">    index   <span class="token builtin">int</span>           <span class="token comment">// 当前执行到的中间件索引</span></span>
<span class="line">    handlers <span class="token punctuation">[</span><span class="token punctuation">]</span>HandlerFunc <span class="token comment">// 中间件处理函数切片</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 处理函数类型</span></span>
<span class="line"><span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>Context<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建新的上下文</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">newContext</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token operator">*</span>Context <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>Context<span class="token punctuation">{</span></span>
<span class="line">        Writer<span class="token punctuation">:</span>   w<span class="token punctuation">,</span></span>
<span class="line">        Request<span class="token punctuation">:</span>  r<span class="token punctuation">,</span></span>
<span class="line">        index<span class="token punctuation">:</span>    <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        handlers<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>HandlerFunc<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Next 执行下一个中间件</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    c<span class="token punctuation">.</span>index<span class="token operator">++</span></span>
<span class="line">    <span class="token keyword">for</span> c<span class="token punctuation">.</span>index <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>handlers<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        c<span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>c<span class="token punctuation">.</span>index<span class="token punctuation">]</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span></span>
<span class="line">        c<span class="token punctuation">.</span>index<span class="token operator">++</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Engine 框架引擎</span></span>
<span class="line"><span class="token keyword">type</span> Engine <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    middleware <span class="token punctuation">[</span><span class="token punctuation">]</span>HandlerFunc</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// New 创建新的引擎实例</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Engine <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>Engine<span class="token punctuation">{</span></span>
<span class="line">        middleware<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>HandlerFunc<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Use 添加中间件</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">Use</span><span class="token punctuation">(</span>handler HandlerFunc<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    e<span class="token punctuation">.</span>middleware <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>middleware<span class="token punctuation">,</span> handler<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// ServeHTTP 实现 http.Handler 接口</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    c <span class="token operator">:=</span> <span class="token function">newContext</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">    c<span class="token punctuation">.</span>handlers <span class="token operator">=</span> e<span class="token punctuation">.</span>middleware</span>
<span class="line">    c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code class="language-go"><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"log"</span></span>
<span class="line">    <span class="token string">"net/http"</span></span>
<span class="line">    <span class="token string">"time"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 日志中间件</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> HandlerFunc <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        </span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Logger 开始"</span><span class="token punctuation">)</span></span>
<span class="line">        c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Logger 结束"</span><span class="token punctuation">)</span></span>
<span class="line">        </span>
<span class="line">        duration <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"请求处理时间: %v"</span><span class="token punctuation">,</span> duration<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 认证中间件</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Auth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> HandlerFunc <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Auth 检查"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">// 可以在这里检查认证信息</span></span>
<span class="line">        c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 业务处理</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Business</span><span class="token punctuation">(</span><span class="token punctuation">)</span> HandlerFunc <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"处理业务逻辑"</span><span class="token punctuation">)</span></span>
<span class="line">        c<span class="token punctuation">.</span>Writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"Hello, World!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 创建引擎实例</span></span>
<span class="line">    engine <span class="token operator">:=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 注册中间件</span></span>
<span class="line">    engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Auth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Business</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 启动服务</span></span>
<span class="line">    http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">":8080"</span><span class="token punctuation">,</span> engine<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个实现的关键点：</p>
<ol>
<li>
<p><code v-pre>Context</code> 结构：</p>
<ul>
<li>维护请求上下文信息</li>
<li>记录当前执行的中间件索引</li>
<li>存储所有中间件处理函数</li>
</ul>
</li>
<li>
<p><code v-pre>Next</code> 方法：</p>
<ul>
<li>类似 Gin 的核心机制</li>
<li>通过索引控制中间件的执行顺序</li>
<li>实现中间件的链式调用</li>
</ul>
</li>
<li>
<p><code v-pre>Engine</code> 结构：</p>
<ul>
<li>管理所有中间件</li>
<li>实现 <code v-pre>http.Handler</code> 接口</li>
<li>创建请求上下文并启动中间件链</li>
</ul>
</li>
</ol>
<p>使用这个框架时的执行顺序：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">Logger 开始</span>
<span class="line">Auth 检查</span>
<span class="line">处理业务逻辑</span>
<span class="line">Logger 结束</span>
<span class="line">请求处理时间: xxxms</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个实现虽然简化了很多，但包含了中间件框架的核心概念。Gin 的实现更复杂，包含了更多功能（如路由、参数解析等），但基本原理是类似的。</p>
</div></template>


