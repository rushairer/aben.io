<template><div><p>Instance method in category overrides method from class (linker warning).</p>
<p>Add</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token parameter variable">-Xlinker</span></span>
<span class="line"><span class="token parameter variable">-no_objc_category_merging</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>to the Other Linker Flags and the warning was suppressed</p>
</div></template>


