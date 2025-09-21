<template><div><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code class="language-go"><span class="line"></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Common <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Name <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> ProjectInterface<span class="token punctuation">[</span>T any<span class="token punctuation">]</span> <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>T</span>
<span class="line">	<span class="token function">Func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>T</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> ProjectStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Name <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>ProjectStruct<span class="token punctuation">)</span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>ProjectStruct <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> p</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>ProjectStruct<span class="token punctuation">)</span> <span class="token function">Func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>ProjectStruct <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> p</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> project ProjectInterface<span class="token punctuation">[</span>ProjectStruct<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">&amp;</span>ProjectStruct<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"I am Project"</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>project<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


