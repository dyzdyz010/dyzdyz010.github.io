---
title: "国内Origin下载加速"
date: 2018-11-18T09:09:19+08:00
tags:
  - tutorial
  - game
  - origin
author: dyzdyz010
collection: tutorials
---

打开 Origin 安装目录下（默认`C:\Program Files(x86)\Origin`）的 `EACore.ini` 文件，复制粘贴如下内容：

```ini
[connection]
EnvironmentName=production

[Feature]
CdnOverride=akamai
```

保存并关闭，重启Origin，本人测试下载可以达到满速。