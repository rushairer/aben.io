<template><div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Try to delete the preview canvas from here</span></span>
<span class="line">~/Library/Developer/Xcode/UserData/Previews/Simulator Devices/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># then in command line run the following</span></span>
<span class="line"><span class="token function">killall</span> <span class="token parameter variable">-9</span> com.apple.CoreSimulator.CoreSimulatorService</span>
<span class="line"></span>
<span class="line"><span class="token comment"># finally restart XCode</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


