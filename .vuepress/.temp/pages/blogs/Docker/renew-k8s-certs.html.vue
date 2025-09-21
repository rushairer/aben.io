<template><div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/kubernets/*.conf</span>
<span class="line"></span>
<span class="line">kubeadm init phase certs all</span>
<span class="line">kubeadm alpha certs renew all</span>
<span class="line">kubeadm init phase kubeconfig all</span>
<span class="line"></span>
<span class="line"><span class="token function">reboot</span></span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span> <span class="token function">grep</span> Exit <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">' '</span> <span class="token parameter variable">-f</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">sudo</span> <span class="token function">docker</span> <span class="token function">rm</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


