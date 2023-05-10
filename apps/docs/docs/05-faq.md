---
slug: faq
title: 常见问题
---

# 常见问题

1. 如果本地部署该项目？

   可以查询如果本地部署 Next.js 项目。

   环境变量可以在 `apps/chat` 文件夹中放置 `.env` 文件。


2. 后台管理面板在哪？

   后台管理的源码位于 `apps/dash` 中，需要单独进行部署。

   目前仍在开发中，故没有部署文档。有能力的可以自行部署。


3. Redis 是否可以不使用 Upstash 进行本地部署？

   不可以。

   相关讨论：[#25](https://github.com/AprilNEA/ChatGPT-Admin-Web/issues/25)

   如果想要使用本地部署的 Redis，可以将 packages/database 中的相关 DAL 重新实现。

:::tip

我们正在计划使用 Postgresql 重构 `database` 库，如您有兴趣，可以联系我们。

:::

4. 如何使用 Docker 进行部署？

   本项目暂时没有构建官方 Docker 镜像。


5. 支付接口对接无效/邮件收不到验证码怎么办？

   请提供详细的控制台报错(截图/文字)，前往 Github 发起 ISSUE。
