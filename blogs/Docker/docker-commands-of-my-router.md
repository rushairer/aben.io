---
title: Docker配置https站点
date: 2020-09-03
tags:
    - Docker
categories:
    - Docker
---

`docker-compose.yml`

```yml
version: '3.7'
services:
    proxy:
        image: nginx
        volumes:
            - /opt/data/proxy/certs:/etc/nginx/certs:ro
            - /opt/data/proxy/conf.d:/etc/nginx/conf.d
            - /opt/data/proxy/vhost.d:/etc/nginx/vhost.d
            - /var/run/docker.sock:/tmp/docker.sock:ro
            - /opt/data/proxy/html:/usr/share/nginx/html
        restart: always
        ports:
            - '80:80'
            - '443:443'
        depends_on:
            - nginx
        networks:
            - frontend
    letsencrypt:
        image: jrcs/letsencrypt-nginx-proxy-companion:latest
        environment:
            - NGINX_PROXY_CONTAINER=data_proxy_1
            - NGINX_DOCKER_GEN_CONTAINER=data_docker-gen_1
        volumes:
            - /opt/data/proxy/certs:/etc/nginx/certs
            - /opt/data/proxy/conf.d:/etc/nginx/conf.d
            - /opt/data/proxy/vhost.d:/etc/nginx/vhost.d
            - /opt/data/proxy/html:/usr/share/nginx/html
            - /var/run/docker.sock:/var/run/docker.sock:ro
        restart: always
        networks:
            - frontend
    docker-gen:
        image: jwilder/docker-gen:latest
        command: -notify-sighup data_proxy_1 -watch -wait 5s:30s /etc/docker-gen/templates/nginx.tmpl /etc/nginx/conf.d/default.conf
        volumes:
            - /opt/data/proxy/nginx.tmpl:/etc/docker-gen/templates/nginx.tmpl:ro
            - /opt/data/proxy/certs:/etc/nginx/certs:ro
            - /opt/data/proxy/conf.d:/etc/nginx/conf.d
            - /opt/data/proxy/vhost.d:/etc/nginx/vhost.d
            - /var/run/docker.sock:/tmp/docker.sock:ro
            - /opt/data/proxy/html:/usr/share/nginx/html
        restart: always
        networks:
            - frontend
    nginx:
        image: happywork/nginx
        volumes:
            - type: volume
              source: data-volume
              target: /var/www/public
        environment:
            - LETSENCRYPT_HOST=io84.com,www.io84.com
            - LETSENCRYPT_EMAIL=admin@io84.com
            - VIRTUAL_HOST=io84.com,www.io84.com
        restart: always
        networks:
            - frontend
            - backend
    mysql:
        image: mariadb:latest
        environment:
            MYSQL_DATABASE: happywork
            MYSQL_MAJOR: '5.7'
            MYSQL_PASSWORD: 'mypassword'
            MYSQL_ROOT_PASSWORD: 'mypassword'
            MYSQL_USER: happywork
        restart: always
        ports:
            - '3306:3306'
        volumes:
            - /opt/data/mysql:/var/lib/mysql:rw
        networks:
            - backend
    redis:
        image: redis:latest
        command:
            - '--appendonly'
            - 'yes'
            - '--requirepass'
            - 'mypassword'
        restart: always
        volumes:
            - /opt/data/redis:/data:rw
        networks:
            - backend
networks:
    frontend:
        driver: 'bridge'
    backend:
        driver: 'bridge'
volumes:
    data-volume:
```

`commands`

```shell
docker run \
        --detach \
        --name mars \
        --restart always \
        --network backend \
        --volume data-volume:/var/www/public \
        --volume /opt/data/mars/endpoint.sh:/app/endpoint.sh \
        mars:local \
        sh /app/endpoint.sh

docker run \
        --detach \
        --name nginx \
        --restart always \
        --network backend \
        --network frontend \
        --env LETSENCRYPT_EMAIL=admin@aben.io \
        --env LETSENCRYPT_HOST=io84.com,www.io84.com,apigg.com,www.apigg.com \
        --env VIRTUAL_HOST=io84.com,www.io84.com,apigg.com,www.apigg.com \
        --volume data-volume:/var/www/public \
        -v /opt/data/nginx/mars.conf:/etc/nginx/sites-available/default.conf:ro \
        happywork/nginx:latest

docker run \
        --detach \
        --name mars \
        --restart always \
        --network frontend \
        --env LETSENCRYPT_EMAIL=admin@aben.io \
        --env LETSENCRYPT_HOST=io84.com,www.io84.com,apigg.com,www.apigg.com \
        --env VIRTUAL_HOST=io84.com,www.io84.com,apigg.com,www.apigg.com \
        --env VIRTUAL_PORT=7001 \
        --volume data-volume:/var/www/public \
        --volume /opt/data/mars/endpoint.sh:/app/endpoint.sh \
        mars:local \
        sh /app/endpoint.sh

docker network connect --link mars backend nginx

docker run \
        --detach \
        --name proxy \
        --restart always \
        --network frontend \
        -p 8080:80 \
        -p 8443:443 \
        --link nginx \
        -v /opt/data/proxy/certs:/etc/nginx/certs:ro \
        -v /opt/data/proxy/conf.d:/etc/nginx/conf.d \
        -v /opt/data/proxy/vhost.d:/etc/nginx/vhost.d \
        -v /var/run/docker.sock:/tmp/docker.sock:ro \
        -v /opt/data/proxy/html:/usr/share/nginx/html \
        nginx:latest\

docker run \
        --detach \
        --name letsencrypt \
        --restart always \
        --network frontend \
        --env NGINX_PROXY_CONTAINER=proxy \
        --env NGINX_DOCKER_GEN_CONTAINER=docker-gen \
        -v /opt/data/proxy/certs:/etc/nginx/certs \
        -v /opt/data/proxy/conf.d:/etc/nginx/conf.d \
        -v /opt/data/proxy/vhost.d:/etc/nginx/vhost.d \
        -v /var/run/docker.sock:/var/run/docker.sock:ro \
        -v /opt/data/proxy/html:/usr/share/nginx/html \
        jrcs/letsencrypt-nginx-proxy-companion:latest


docker run \
        --detach \
        --name docker-gen \
        --restart always \
        --network frontend \
        -v /opt/data/proxy/nginx.tmpl:/etc/docker-gen/templates/nginx.tmpl:ro \
        -v /opt/data/proxy/certs:/etc/nginx/certs:ro \
        -v /opt/data/proxy/conf.d:/etc/nginx/conf.d \
        -v /opt/data/proxy/vhost.d:/etc/nginx/vhost.d \
        -v /var/run/docker.sock:/tmp/docker.sock:ro \
        -v /opt/data/proxy/html:/usr/share/nginx/html \
        jwilder/docker-gen:latest \
        -notify-sighup proxy -watch -wait 5s:30s /etc/docker-gen/templates/nginx.tmpl /etc/nginx/conf.d/default.conf

```
