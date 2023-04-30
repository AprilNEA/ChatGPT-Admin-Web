<div align="center">
<img src="apps/docs/static/img/icon.svg" alt="icon"/>

<h1 align="center">ChatGPT Admin Web</h1>

简体中文 / [English](./README_EN.md)

Deploy your shared ChatGPT web UI on Vercel.

部署你的商业 ChatGPT 网页应用。

[apps/chat](./apps/chat/README.md)
基于 [ChatGPT-Next-Web b1f27aa](https://github.com/Yidadaa/ChatGPT-Next-Web/tree/b1f27aaf93c88c088db6bae5ac8163e2ffe991bd)
二次开发.

[Docs](https://docs.lmo.best/) / [Demo](https://lmo.best/) / [Issues](https://github.com/AprilNEA/ChatGPT-April-Web/issues) / [Telegram Group](https://t.me/ChatGPTAdminWeb)

[文档](https://docs.lmo.best/) / [演示](https://lmo.best/) / [反馈](https://github.com/AprilNEA/ChatGPT-April-Web/issues) / [Telegram 群](https://t.me/ChatGPTAdminWeb)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAprilNEA%2FChatGPT-Admin-Web&env=OPENAI_API_KEY&env=CODE&project-name=chatgpt-next-web&repository-name=ChatGPT-Next-Web)

</div>

> ⚠️ 文档和后台界面仍在快速开发中

<img src="./docs/system.svg" alt="system"/>

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

## 主要功能

- 在 5 分钟内使用 Vercel 和 Upstash 部署
- 用户管理系统，数据可被同步至云端
- 极快的首屏加载速度（~100kb），支持流式响应
- 精心设计的 UI，响应式设计，支持深色模式，支持 PWA
- 自动压缩上下文聊天记录，在节省 Token 的同时支持超长对话
- 一键导出聊天记录，完整的 Markdown 支持
- 国际化支持

## 开发计划

<img src="./docs/roadmap.svg" alt="system"/>

- [ ] 使用云端同步数据
- [ ] 为每个对话设置系统 Prompt
- [ ] 插件机制，支持联网搜索、计算器、调用其他平台 API
- [ ] 订阅插槽，订阅计划多样化
- [ ] 分销商管理系统

## 🚀 技术栈 Tech Stack

<img src="./docs/tech-stack.svg" alt="tech-stack"/>

## 作者 Author

- [@AprilNEA](https://github.com/AprilNEA)
- [@PeronGH](https://github.com/PeronGH)

## ☁️ 许可证 License

本仓库中 [apps/chat](./apps/chat) 是基于仓库 [Yidadaa's repository](https://github.com/Yidadaa/ChatGPT-Next-Web) 的
996许可证以[MIT license](./LICENSE)的形式从新分发。

其他部分均以[MIT license](./LICENSE)分发。

<img src="https://hits-app.vercel.app/hits?url=https%3A%2F%2Fgithub.com%2FAprilNEA%2FChatGPT-Admin-Web" />
