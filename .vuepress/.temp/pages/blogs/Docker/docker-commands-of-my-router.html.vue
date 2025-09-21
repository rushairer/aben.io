<template><div><p><code v-pre>docker-compose.yml</code></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code class="language-yaml"><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.7'</span></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">proxy</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx</span>
<span class="line">        <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/certs<span class="token punctuation">:</span>/etc/nginx/certs<span class="token punctuation">:</span>ro</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/vhost.d<span class="token punctuation">:</span>/etc/nginx/vhost.d</span>
<span class="line">            <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/tmp/docker.sock<span class="token punctuation">:</span>ro</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/html<span class="token punctuation">:</span>/usr/share/nginx/html</span>
<span class="line">        <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">        <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token string">'80:80'</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token string">'443:443'</span></span>
<span class="line">        <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> nginx</span>
<span class="line">        <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> frontend</span>
<span class="line">    <span class="token key atrule">letsencrypt</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> jrcs/letsencrypt<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>proxy<span class="token punctuation">-</span>companion<span class="token punctuation">:</span>latest</span>
<span class="line">        <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> NGINX_PROXY_CONTAINER=data_proxy_1</span>
<span class="line">            <span class="token punctuation">-</span> NGINX_DOCKER_GEN_CONTAINER=data_docker<span class="token punctuation">-</span>gen_1</span>
<span class="line">        <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/certs<span class="token punctuation">:</span>/etc/nginx/certs</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/vhost.d<span class="token punctuation">:</span>/etc/nginx/vhost.d</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/html<span class="token punctuation">:</span>/usr/share/nginx/html</span>
<span class="line">            <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock<span class="token punctuation">:</span>ro</span>
<span class="line">        <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">        <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> frontend</span>
<span class="line">    <span class="token key atrule">docker-gen</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> jwilder/docker<span class="token punctuation">-</span>gen<span class="token punctuation">:</span>latest</span>
<span class="line">        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>notify<span class="token punctuation">-</span>sighup data_proxy_1 <span class="token punctuation">-</span>watch <span class="token punctuation">-</span>wait 5s<span class="token punctuation">:</span>30s /etc/docker<span class="token punctuation">-</span>gen/templates/nginx.tmpl /etc/nginx/conf.d/default.conf</span>
<span class="line">        <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/nginx.tmpl<span class="token punctuation">:</span>/etc/docker<span class="token punctuation">-</span>gen/templates/nginx.tmpl<span class="token punctuation">:</span>ro</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/certs<span class="token punctuation">:</span>/etc/nginx/certs<span class="token punctuation">:</span>ro</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/vhost.d<span class="token punctuation">:</span>/etc/nginx/vhost.d</span>
<span class="line">            <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/tmp/docker.sock<span class="token punctuation">:</span>ro</span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/proxy/html<span class="token punctuation">:</span>/usr/share/nginx/html</span>
<span class="line">        <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">        <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> frontend</span>
<span class="line">    <span class="token key atrule">nginx</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> happywork/nginx</span>
<span class="line">        <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> volume</span>
<span class="line">              <span class="token key atrule">source</span><span class="token punctuation">:</span> data<span class="token punctuation">-</span>volume</span>
<span class="line">              <span class="token key atrule">target</span><span class="token punctuation">:</span> /var/www/public</span>
<span class="line">        <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> LETSENCRYPT_HOST=io84.com<span class="token punctuation">,</span>www.io84.com</span>
<span class="line">            <span class="token punctuation">-</span> LETSENCRYPT_EMAIL=admin@io84.com</span>
<span class="line">            <span class="token punctuation">-</span> VIRTUAL_HOST=io84.com<span class="token punctuation">,</span>www.io84.com</span>
<span class="line">        <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">        <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> frontend</span>
<span class="line">            <span class="token punctuation">-</span> backend</span>
<span class="line">    <span class="token key atrule">mysql</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> mariadb<span class="token punctuation">:</span>latest</span>
<span class="line">        <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> happywork</span>
<span class="line">            <span class="token key atrule">MYSQL_MAJOR</span><span class="token punctuation">:</span> <span class="token string">'5.7'</span></span>
<span class="line">            <span class="token key atrule">MYSQL_PASSWORD</span><span class="token punctuation">:</span> <span class="token string">'mypassword'</span></span>
<span class="line">            <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token string">'mypassword'</span></span>
<span class="line">            <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> happywork</span>
<span class="line">        <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">        <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token string">'3306:3306'</span></span>
<span class="line">        <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/mysql<span class="token punctuation">:</span>/var/lib/mysql<span class="token punctuation">:</span>rw</span>
<span class="line">        <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> backend</span>
<span class="line">    <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>latest</span>
<span class="line">        <span class="token key atrule">command</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token string">'--appendonly'</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token string">'yes'</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token string">'--requirepass'</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token string">'mypassword'</span></span>
<span class="line">        <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">        <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> /opt/data/redis<span class="token punctuation">:</span>/data<span class="token punctuation">:</span>rw</span>
<span class="line">        <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> backend</span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">frontend</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">driver</span><span class="token punctuation">:</span> <span class="token string">'bridge'</span></span>
<span class="line">    <span class="token key atrule">backend</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">driver</span><span class="token punctuation">:</span> <span class="token string">'bridge'</span></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">data-volume</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>commands</code></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">docker</span> run <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--detach</span> <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--name</span> mars <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--restart</span> always <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--network</span> backend <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--volume</span> data-volume:/var/www/public <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--volume</span> /opt/data/mars/endpoint.sh:/app/endpoint.sh <span class="token punctuation">\</span></span>
<span class="line">        mars:local <span class="token punctuation">\</span></span>
<span class="line">        <span class="token function">sh</span> /app/endpoint.sh</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--detach</span> <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--restart</span> always <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--network</span> backend <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--network</span> frontend <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">LETSENCRYPT_EMAIL</span><span class="token operator">=</span>admin@aben.io <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">LETSENCRYPT_HOST</span><span class="token operator">=</span>io84.com,www.io84.com,apigg.com,www.apigg.com <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">VIRTUAL_HOST</span><span class="token operator">=</span>io84.com,www.io84.com,apigg.com,www.apigg.com <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--volume</span> data-volume:/var/www/public <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/nginx/mars.conf:/etc/nginx/sites-available/default.conf:ro <span class="token punctuation">\</span></span>
<span class="line">        happywork/nginx:latest</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--detach</span> <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--name</span> mars <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--restart</span> always <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--network</span> frontend <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">LETSENCRYPT_EMAIL</span><span class="token operator">=</span>admin@aben.io <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">LETSENCRYPT_HOST</span><span class="token operator">=</span>io84.com,www.io84.com,apigg.com,www.apigg.com <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">VIRTUAL_HOST</span><span class="token operator">=</span>io84.com,www.io84.com,apigg.com,www.apigg.com <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">VIRTUAL_PORT</span><span class="token operator">=</span><span class="token number">7001</span> <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--volume</span> data-volume:/var/www/public <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--volume</span> /opt/data/mars/endpoint.sh:/app/endpoint.sh <span class="token punctuation">\</span></span>
<span class="line">        mars:local <span class="token punctuation">\</span></span>
<span class="line">        <span class="token function">sh</span> /app/endpoint.sh</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> network connect <span class="token parameter variable">--link</span> mars backend nginx</span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--detach</span> <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--name</span> proxy <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--restart</span> always <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--network</span> frontend <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-p</span> <span class="token number">8443</span>:443 <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--link</span> nginx <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/certs:/etc/nginx/certs:ro <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/conf.d:/etc/nginx/conf.d <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/vhost.d:/etc/nginx/vhost.d <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /var/run/docker.sock:/tmp/docker.sock:ro <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/html:/usr/share/nginx/html <span class="token punctuation">\</span></span>
<span class="line">        nginx:latest<span class="token punctuation">\</span></span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--detach</span> <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--name</span> letsencrypt <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--restart</span> always <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--network</span> frontend <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">NGINX_PROXY_CONTAINER</span><span class="token operator">=</span>proxy <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--env</span> <span class="token assign-left variable">NGINX_DOCKER_GEN_CONTAINER</span><span class="token operator">=</span>docker-gen <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/certs:/etc/nginx/certs <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/conf.d:/etc/nginx/conf.d <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/vhost.d:/etc/nginx/vhost.d <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock:ro <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/html:/usr/share/nginx/html <span class="token punctuation">\</span></span>
<span class="line">        jrcs/letsencrypt-nginx-proxy-companion:latest</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token function">docker</span> run <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--detach</span> <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--name</span> docker-gen <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--restart</span> always <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">--network</span> frontend <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/nginx.tmpl:/etc/docker-gen/templates/nginx.tmpl:ro <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/certs:/etc/nginx/certs:ro <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/conf.d:/etc/nginx/conf.d <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/vhost.d:/etc/nginx/vhost.d <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /var/run/docker.sock:/tmp/docker.sock:ro <span class="token punctuation">\</span></span>
<span class="line">        <span class="token parameter variable">-v</span> /opt/data/proxy/html:/usr/share/nginx/html <span class="token punctuation">\</span></span>
<span class="line">        jwilder/docker-gen:latest <span class="token punctuation">\</span></span>
<span class="line">        -notify-sighup proxy <span class="token parameter variable">-watch</span> <span class="token parameter variable">-wait</span> 5s:30s /etc/docker-gen/templates/nginx.tmpl /etc/nginx/conf.d/default.conf</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


