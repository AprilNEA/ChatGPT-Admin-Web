---
slug: openai
title: OpenAI
---

# 接入 OpenAI 模型

## 填入 OpenAI Key

| 变量名             | 描述            |
|-----------------|---------------|
| OPENAI_ENDPOINT | OpenAI API 端点 |
| OPENAI_API_KEY  | OpenAI API 密钥 |

当您设置 `OPENAI_ENDPOINT`后，我们将向端点服务器发送和 OpenAI 官方格式相同的数据。

这可以用来配置您的反向代理或者`api2d`。

这是我们的源码：
```JavaScript
const API_END_POINT = process.env.OPENAI_PROXY ?? 'https://api.openai.com';
const COMPLETIONS_URL = `${API_END_POINT}/v1/chat/completions`;
```

## Key Pool

:::note

当前 Key Pool 的配置尚不完善，有条件的可自行研究。

:::
