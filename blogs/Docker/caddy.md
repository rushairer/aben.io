---
title: Caddy：现代化的 Web 服务器
date: 2025-08-26 23:35:00
tags:
    - Docker
    - K8s
    - Caddy
categories:
    - Docker
---

```shell
podman run --replace -dt --name caddy --cap-add=NET_ADMIN -p 80:80 -p 443:443 -p 443:443/udp \
    -v $(pwd)/www:/srv \
    -v $(pwd)/caddy_data:/data \
    -v $(pwd)/caddy_config:/config \
    -v $(pwd)/Caddyfile:/etc/caddy/Caddyfile \
    caddy
```
