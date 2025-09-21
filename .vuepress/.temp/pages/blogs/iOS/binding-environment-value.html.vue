<template><div><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">class</span> <span class="token class-name">AlbumViewModel</span><span class="token punctuation">:</span> <span class="token class-name">ObservableObject</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@Published</span> <span class="token keyword">var</span> currentAssetLocalIdentifier<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token operator">?</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">extension</span> <span class="token class-name">EnvironmentValues</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> albumViewModel<span class="token punctuation">:</span> <span class="token class-name">AlbumViewModel</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">get</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">self</span><span class="token punctuation">[</span><span class="token class-name">AlbumViewModelKey</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        </span>
<span class="line">        <span class="token keyword">set</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">self</span><span class="token punctuation">[</span><span class="token class-name">AlbumViewModelKey</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token operator">=</span> newValue</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">private</span> <span class="token keyword">struct</span> <span class="token class-name">AlbumViewModelKey</span><span class="token punctuation">:</span> <span class="token class-name">EnvironmentKey</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">let</span> defaultValue<span class="token punctuation">:</span> <span class="token class-name">AlbumViewModel</span> <span class="token operator">=</span> <span class="token class-name">AlbumViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"></span>
<span class="line">    <span class="token attribute atrule">@Environment</span><span class="token punctuation">(</span><span class="token punctuation">\</span><span class="token punctuation">.</span>albumViewModel<span class="token punctuation">)</span> <span class="token keyword">var</span> albumViewModel<span class="token punctuation">:</span> <span class="token class-name">AlbumViewModel</span></span>
<span class="line">    </span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token operator">...</span></span>
<span class="line">      </span>
<span class="line">      <span class="token comment">/// @Environment unlike @StateObject, can not using $albumViewModel.$currentAssetLocalIdentifier.</span></span>
<span class="line">      <span class="token class-name">TabView</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">                        albumViewModel<span class="token punctuation">.</span>currentAssetLocalIdentifier</span>
<span class="line">                    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> id <span class="token keyword">in</span></span>
<span class="line">                        albumViewModel<span class="token punctuation">.</span>currentAssetLocalIdentifier <span class="token operator">=</span> id</span>
<span class="line">                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    </span>
<span class="line">                    <span class="token operator">....</span></span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


