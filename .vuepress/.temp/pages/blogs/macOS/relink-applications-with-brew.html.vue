<template><div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"> brew list <span class="token parameter variable">-1</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> line<span class="token punctuation">;</span> <span class="token keyword">do</span> brew unlink <span class="token variable">$line</span><span class="token punctuation">;</span> brew <span class="token function">link</span> <span class="token variable">$line</span><span class="token punctuation">;</span> <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


