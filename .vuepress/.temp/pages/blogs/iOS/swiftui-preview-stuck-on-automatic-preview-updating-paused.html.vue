<template><div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment">#cd ${CODESIGNING_FOLDER_PATH}</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$ENABLE_PREVIEWS</span> <span class="token operator">==</span> <span class="token string">"NO"</span> <span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">then</span></span>
<span class="line">    <span class="token comment"># Number</span></span>
<span class="line">    <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span>/usr/libexec/PlistBuddy <span class="token parameter variable">-c</span> <span class="token string">"Print CFBundleVersion"</span> $PRODUCT_SETTINGS_PATH<span class="token variable">`</span></span></span>
<span class="line">    <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">expr</span> $version + <span class="token number">1</span><span class="token variable">`</span></span></span>
<span class="line">    <span class="token comment"># Or Time</span></span>
<span class="line">    <span class="token comment">#formatDate=$(date "+%Y%m%d%H%M%S")</span></span>
<span class="line">    <span class="token comment">#version=${formatDate}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">#/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $version" $PRODUCT_SETTINGS_PATH</span></span>
<span class="line">    /usr/libexec/PlistBuddy <span class="token parameter variable">-c</span> <span class="token string">"Set :CFBundleVersion <span class="token variable">${version}</span>"</span> <span class="token string">"<span class="token variable">${PROJECT_DIR}</span>/<span class="token variable">${INFOPLIST_FILE}</span>"</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">"Skipping Bump of version"</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token variable">$ENABLE_PREVIEWS</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


