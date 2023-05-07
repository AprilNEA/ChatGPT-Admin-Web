---
slug: newbing
title: New Bing
---

# 接入 New Bing

## 部署中转服务器

由于 Vercel Serverless Function 不支持 WebSocket [^1]，需要使用另一台服务器将 WebSocket 转换为 [SSE](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events) 以供使用。

:::caution

当前 New Bing 使用我们提供的服务器中转，我们正在将其代码迁移至仓库中，请耐心等待。

:::

由于相关实现还未完善，请暂时使用我们提供的中转服务器。如需自部署，可以根据 [我们中转服务器的代码](https://github.com/PeronGH/deno-new-bing) 自行摸索。

## 配置 Bing Cookie

为了使用 New Bing，请在环境变量中设置好 `BING_COOKIE`。请使用 Edge 浏览器访问 [New Bing](https://www.bing.com/search?q=Bing+AI&showconv=1)。在开发者工具中找到 Console，输入 `document.cookie`，并复制输出的内容，请勿包含最外层的引号。

:::caution

Bing Cookie 会在大约一周后失效，需要重新获取。请定期更新。

:::

:::caution

New Bing 存在用量限制（200 次每日），尽管 Jailbreak 翻倍了用量限制（约 400 次每日），依然很容易用尽。

:::

[^1]: 请参见 [Do Vercel Serverless Functions support WebSocket connections?](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections)
