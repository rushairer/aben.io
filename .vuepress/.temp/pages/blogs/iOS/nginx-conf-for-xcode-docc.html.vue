<template><div><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf"><pre v-pre><code class="language-conf"><span class="line">   server {</span>
<span class="line">      listen 0.0.0.0:8080;</span>
<span class="line">      </span>
<span class="line">      location / {</span>
<span class="line">          return 301 http://docc.io84.com/documentation/abalbum ;</span>
<span class="line">      }</span>
<span class="line">  </span>
<span class="line">      location ~* ^/(documentation|tutorials) {</span>
<span class="line">          root   /app;</span>
<span class="line">          try_files $uri $uri/ /documentation/index.html;</span>
<span class="line">      }</span>
<span class="line"></span>
<span class="line">      location ~* ^/(css|js|data|images|downloads|img|videos)\/.*$ {</span>
<span class="line">          root   /app;</span>
<span class="line">          try_files $uri /documentation/$uri;</span>
<span class="line">      }</span>
<span class="line">      </span>
<span class="line">      location ~* ^/(favicon\.ico|favicon\.svg|theme-settings\.json)$ {</span>
<span class="line">          root   /app;</span>
<span class="line">          try_files $uri /documentation/$uri;</span>
<span class="line">      }</span>
<span class="line">  }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line">http://localhost/documentation/yourdocument</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


