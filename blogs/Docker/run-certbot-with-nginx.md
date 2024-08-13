---
title: Run CertBot with nginx
date: 2024-08-14 00:37:18
tags:
    - podman
    - docker
    - certbot
categories:
    - Docker
---

```shell
podman run --replace -dt --name certbot -p 80:80/tcp -p 443:443/tcp -v $(pwd)/nginx_secrets:/etc/letsencrypt -v $(pwd)/user_conf.d:/etc/nginx/user_conf.d:ro -v $(pwd)/www:/www:ro --env CERTBOT_EMAIL=me@aben.io io84.com/nginx-certbot:alpine

```
