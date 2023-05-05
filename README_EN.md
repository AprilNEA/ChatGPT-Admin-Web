<div align="center">
<img src="apps/docs/static/img/icon.svg" alt="icon"/>

<h1 align="center">ChatGPT Admin Web</h1>

[简体中文](./README.md) / English

Deploy your shared ChatGPT web UI on Vercel.

[apps/chat](./apps/chat/README.md) based
on [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web/tree/b1f27aaf93c88c088db6bae5ac8163e2ffe991bd)
secondary development.

[Docs](https://docs.lmo.best/) / [Demo](https://lmo.best/) / [Issues](https://github.com/AprilNEA/ChatGPT-April-Web/issues) / [Telegram Group](https://t.me/ChatGPTAdminWeb)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAprilNEA%2FChatGPT-Admin-Web&env=OPENAI_API_KEY&env=CODE&project-name=chatgpt-next-web&repository-name=ChatGPT-Next-Web)

</div>

<img src="./docs/system.svg" alt="system"/>

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

## Features

- Deploy on Vercel with Upstash in under 5 minute.
- User management system, data can be stored in the cloud.
- Well-designed (by [Yidadaa]() mostly) with responsive and dark mode.
- Fast first screen loading speed (~100kb), support streaming response.
- Automatically compresses chat history to support long conversations while also saving your tokens
- One-click export all chat history with full Markdown support
- I18n supported

## Roadmap

<img src="./docs/roadmap.svg" alt="system"/>

- [ ] Set system prompts for each conversation
- [ ] Plugin mechanism, supporting online search, calculator, and calling APIs of other platforms
- [ ] Subscription slots with diversified subscription plans
- [ ] Distributor management system

## 🚀 Tech Stack

<img src="./docs/tech-stack.svg" alt="tech-stack"/>

## Author

- [@AprilNEA](https://github.com/AprilNEA)
- [@PeronGH](https://github.com/PeronGH)

## ☁️ License

This repository is re-published under the [MIT license](./LICENSE-MIT) based on
the [Yidadaa's repository](https://github.com/Yidadaa/ChatGPT-Next-Web).

Before [b1f27aa](https://github.com/AprilNEA/ChatGPT-Admin-Web/commit/b1f27aaf93c88c088db6bae5ac8163e2ffe991bd) commit
you should
follow: [996 License](./LICENSE-996)
