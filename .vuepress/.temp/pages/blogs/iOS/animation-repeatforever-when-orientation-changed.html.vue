<template><div><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token operator">...</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> lastSizeClass<span class="token punctuation">:</span> <span class="token class-name">UserInterfaceSizeClass</span><span class="token operator">?</span></span>
<span class="line">    <span class="token attribute atrule">@Environment</span><span class="token punctuation">(</span><span class="token punctuation">\</span><span class="token punctuation">.</span>horizontalSizeClass<span class="token punctuation">)</span> <span class="token keyword">var</span> horizontalSizeClass<span class="token punctuation">:</span> <span class="token class-name">UserInterfaceSizeClass</span><span class="token operator">?</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token keyword">var</span> playButton<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">ZStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Color</span></span>
<span class="line">                <span class="token punctuation">.</span>white</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">140</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">clipRounded</span><span class="token punctuation">(</span><span class="token number">40.0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span>lastSizeClass <span class="token operator">==</span> <span class="token keyword">self</span><span class="token punctuation">.</span>horizontalSizeClass <span class="token operator">?</span> <span class="token number">0</span> <span class="token punctuation">:</span> <span class="token number">0.5</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span>lastSizeClass <span class="token operator">==</span> <span class="token keyword">self</span><span class="token punctuation">.</span>horizontalSizeClass <span class="token operator">?</span> <span class="token number">1.2</span> <span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">animation</span><span class="token punctuation">(</span><span class="token class-name">Animation</span></span>
<span class="line">                            <span class="token punctuation">.</span><span class="token function">easeOut</span><span class="token punctuation">(</span>duration<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">                            <span class="token punctuation">.</span><span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">                            <span class="token punctuation">.</span><span class="token function">repeatForever</span><span class="token punctuation">(</span>autoreverses<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                           value<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">.</span>lastSizeClass<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span>onAppear<span class="token punctuation">{</span></span>
<span class="line">                    <span class="token keyword">self</span><span class="token punctuation">.</span>lastSizeClass <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>lastSizeClass <span class="token operator">==</span> <span class="token punctuation">.</span>compact <span class="token operator">?</span> <span class="token punctuation">.</span>regular <span class="token punctuation">:</span> <span class="token punctuation">.</span>compact</span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token operator">...</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token keyword">if</span> horizontalSizeClass <span class="token operator">==</span> <span class="token punctuation">.</span>regular <span class="token punctuation">{</span></span>
<span class="line">                <span class="token operator">...</span></span>
<span class="line">               playButton</span>
<span class="line"></span>
<span class="line">                <span class="token operator">...</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token operator">...</span></span>
<span class="line">               playButton</span>
<span class="line"></span>
<span class="line">                <span class="token operator">...</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            </span>
<span class="line">            <span class="token operator">...</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


