---
title: "WSL2被防火墙阻挡无法连接网络"
date: 2021-08-02T21:53:59+08:00
tags:
  - windows
  - wsl
  - proxy
  - firewall
author: dyzdyz010
categories:
  - tutorials
---

**参考链接：** [WSL2 连接 Windows 防火墙问题解决方案](https://zhuanlan.zhihu.com/p/365058237)

执行以下命令创建一条防火墙规则：

```
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound  -InterfaceAlias "vEthernet (WSL)"  -Action Allow
```

这样 WSL2 就可以和宿主机通信了。