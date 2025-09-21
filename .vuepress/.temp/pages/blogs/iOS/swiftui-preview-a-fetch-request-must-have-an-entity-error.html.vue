<template><div><p>Change</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">struct</span> <span class="token class-name">SheetMusicView_Previews</span><span class="token punctuation">:</span> <span class="token class-name">PreviewProvider</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">var</span> previews<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span>        </span>
<span class="line">        <span class="token class-name">SheetMusicView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">environment</span><span class="token punctuation">(</span><span class="token punctuation">\</span><span class="token punctuation">.</span>managedObjectContext<span class="token punctuation">,</span> <span class="token class-name">PersistenceController</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span>container<span class="token punctuation">.</span>viewContext<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">struct</span> <span class="token class-name">SheetMusicView_Previews</span><span class="token punctuation">:</span> <span class="token class-name">PreviewProvider</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">var</span> previews<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token class-name">PersistenceController</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span>container<span class="token punctuation">.</span>viewContext</span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">SheetMusicView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">environment</span><span class="token punctuation">(</span><span class="token punctuation">\</span><span class="token punctuation">.</span>managedObjectContext<span class="token punctuation">,</span> context<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


