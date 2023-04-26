<div align="center">
<img src="./docs/icon.svg" alt="icon"/>

<h1 align="center">ChatGPT April Web</h1>

English / 简体中文

Deploy your shared ChatGPT web UI on Vercel.

部署你的商业 ChatGPT 网页应用。

[Docs](https://docs.lmo.best/) / [Demo](https://lmo.best/) / [Issues](https://github.com/AprilNEA/ChatGPT-April-Web/issues) / [Join Discord](https://discord.gg/zrhvHCr79N) / [Buy Me a Coffee](https://www.buymeacoffee.com/yidadaa)

[文档](https://docs.lmo.best/) / [演示](https://lmo.best/) / [反馈](https://github.com/AprilNEA/ChatGPT-April-Web/issues) / [QQ 群](https://user-images.githubusercontent.com/16968934/233002565-139daa1a-eb3a-4a12-ac37-6418e7a15d36.png) / [打赏开发者](https://user-images.githubusercontent.com/16968934/227772541-5bcd52d8-61b7-488c-a203-0330d8006e2b.jpg)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAprilNEA%2FChatGPT-April-Web&env=OPENAI_API_KEY&env=CODE&project-name=chatgpt-next-web&repository-name=ChatGPT-Next-Web)

![cover](./docs/cover.png)

</div>

## Difference With ChatGPT-Next-Web

- With a backend management system.
- Commercialization features
    - Customize title and text.
    - User management system.
    - Invitation code mechanism.
    - Subscription mechanism
    - Rate Limiting for Grading
    - Advertising system (splash screen ads, banner ads, keyword ads)
- Featured Functions
- Diversified API interfaces.
    - OpenAI Official API with API Key Pool
    - NewBing API with Cookie Pool
- Text Security Check
    - Tencent Cloud Tianyu Text Security
    - Keyword Filtering

## 与 ChatGPT-Next-Web 的区别

- 带有后台管理系统
- 商业化功能
    - 自定义标题及文字
    - 用户管理系统，带有邀请码机制
    - 订阅系统，带有分级的请求速率限制
    - 对接邮箱注册，短信注册
    - 广告系统(开屏广告，横幅广告，关键词广告)

- 特色功能
    - 多样化的 API 接口

        - OpenAI 官方接口并带有 KEY 池
        - NewBing API 并带有 Cookie 池

    - 文本安全检查

        - 腾讯云天御文本安全
        - 关键词过滤

## Features

- Deploy on Vercel with Upstash in under 5 minute.
- User management system, data can be stored in the cloud.
- Well-designed (by [Yidadaa]() mostly) with responsive and dark mode.
- Fast first screen loading speed (~100kb), support streaming response.
- Automatically compresses chat history to support long conversations while also saving your tokens
- One-click export all chat history with full Markdown support
- I18n supported

## 主要功能

- 在 5 分钟内使用 Vercel 和 Upstash 部署
- 用户管理系统，数据可被同步至云端
- 极快的首屏加载速度（~100kb），支持流式响应
- 精心设计的 UI，响应式设计，支持深色模式，支持 PWA
- 自动压缩上下文聊天记录，在节省 Token 的同时支持超长对话
- 一键导出聊天记录，完整的 Markdown 支持
- 国际化支持

## Roadmap

- [ ] Set system prompts for each conversation
- [ ] Plugin mechanism, supporting online search, calculator, and calling APIs of other platforms
- [ ] Subscription slots with diversified subscription plans
- [ ] Distributor management system

## 开发计划

- [ ] 使用云端同步数据
- [ ] 为每个对话设置系统 Prompt
- [ ] 插件机制，支持联网搜索、计算器、调用其他平台 API
- [ ] 订阅插槽，订阅计划多样化
- [ ] 分销商管理系统

## 🚀 Tech Stack

- ✅ Bootstrapping: Turborepo
- ✅ Framework: Nextjs 13 + Typescript
- ✅ Auth: JWT
- ✅ Database: Upstash
- ✅ Styling: Sass
- ✅ Typescript Schema Validation: Zod

## Author

- [@AprilNEA](https://github.com/AprilNEA)
- [@PeronGH](https://github.com/PeronGH)

## ☁️ License

This repository is re-published under the [MIT license](./LICENSE-MIT) based on
the [Yidadaa's repository](https://github.com/Yidadaa/ChatGPT-Next-Web).

Before [b1f27aa](https://github.com/lmobest/lmobest/commit/b1f27aaf93c88c088db6bae5ac8163e2ffe991bd) commit you should
follow: [996 License](./LICENSE-996)
