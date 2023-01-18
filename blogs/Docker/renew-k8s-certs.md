---
title: Renew k8s certs
date: 2023-01-18 08:53:49
tags:
    - Docker
    - K8s
categories:
    - Docker
---

```shell
rm -rf /etc/kubernets/*.conf

kubeadm init phase certs all
kubeadm alpha certs renew all
kubeadm init phase kubeconfig all

reboot

docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs sudo docker rm

```
