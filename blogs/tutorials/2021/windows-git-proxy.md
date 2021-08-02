---
title: "让Windows的Git使用代理"
date: 2021-08-02T21:53:59+08:00
tags:
  - windows
  - git
  - proxy
author: dyzdyz010
categories:
  - tutorials
---

参考链接：[让git使用clash的socks代理通道](https://gist.github.com/UnluckyNinja/73a9c699fb807d57dad8b482fff57cb6)

系统：Windows 10
代理软件：Clash for Windows

Windows下的代理真的难搞……Git不走代理时常抽风，克隆仓库用了一晚上……后来找到上面这个链接，设置之后Git总算是能用了。再次吐槽Windows的代理设置，辣鸡。

```toml
[core]
	gitproxy = socks5://127.0.0.1:7890
[http]
	postBuffer = 524288000
	postBuffer = 524288000
	proxy = socks5://127.0.0.1:7890
[https]
	postBuffer = 524288000
	postBuffer = 524288000
	proxy = socks5://127.0.0.1:7890
```