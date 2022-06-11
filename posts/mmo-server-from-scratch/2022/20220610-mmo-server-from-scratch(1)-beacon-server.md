---
title: MMO Server From Scratch(1) - Beacon Server
date: 2022-06-10T14:19:13+08:00
author: dyzdyz010
tags:
  - game
  - mmo
  - server
  - elixir
collection: MMO Server From Scratch
draft: true
---

今天来实现服务器的第一个部件 - **beacon_server**。

## 功能解析

为了建立Elixir集群，需要所有 Beam 节点在启动之时就已经知道一个固定的节点用来连接，之后 Beam 会自动完成节点之间的链接，即默认的`全连接`模式，所有节点两两之间均有连接。关于这一点我还没有深入思考过有没有必要进行调整，之后看情况再说🤪

因此，为了让服务器集群内的所有节点在启动时都能够连接一个固定节点从而组成集群，这个固定节点就是`beacon_server`。

`beacon_server`需要有什么功能呢？在经过一番简单思考后，至少需要具备以下几个功能：

1. 接受其他节点的连接
2. 接受其他节点的注册信息
3. 相应其他节点的需求，返回需求节点的信息

这里有两个重要概念：`资源(Resource)` 和 `需求(Requirement)`。`资源`指某个节点自身的内容类型，也就是在集群中所处的角色，比如网关服务器的资源就是网关(gate_server)；`需求`指某个节点需要的其他节点，比如网关节点需要**网关管理节点(gate_manager)**来注册自己，数据服务节点需要**数据联系节点(data_contact)**来把数据库同步到自身。

当一个节点向`beacon_server`节点注册时，我们希望它能够向`beacon_server`提供自己的节点名称、资源、需求等数据，方便`beacon_server`在收到别的节点注册时，能够把已经注册过的节点当做需求返回给别的节点。

## 数据结构

我用一个 `GenServer` 线程负责上面所说的所有工作，利用线程的 `state` 来保存来往节点信息。当前粗略想了想，姑且定义信息存储格式如下：

```elixir
%{
  nodes: %{
    "node1@host": :online,
    "node2@host": :offline
  },
  requirements: [
    %{
      module: Module.Interface,
      name: [:requirement_name],
      node: :"node@host"
    }
  ],
  resources: [
    %{
      module: Module.Interface,
      name: :resoutce_name,
      node: :"node@host"
    }
  ]
}
```

我用一个字典存储所有信息，分为 `nodes`、`requirements`以及`resources`三部分。

`nodes`存储所有已经连接的节点和他们的状态，`:online`表示在线正常连接，`:offline`表示节点断开连接；

`requirements`存储每个节点注册时提供的需求信息。使用列表存储，列表中每个项代表一个节点。项使用字典，存储模块(module)、名称(name)、节点(node)信息。其中`名称`字段，因为有些节点可能会有不只一个`需求`，因此使用列表存储。`模块`字段是为了留着以备后用，目前没什么用……`节点`字段用于获取的节点使用该字段对目标节点发送消息，必不可少。

`resources`存储每个节点注册时提供的资源信息，字段与`requirements`完全相同，有一个不同的地方是`名称`字段的数据类型不再是列表，而是原子，因为每个节点只可能属于唯一的一种资源，不可能属于两种以上，因此用一个单一的原子就可以代表了。
