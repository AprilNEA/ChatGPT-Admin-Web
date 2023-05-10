---
slug: intro
title: 介绍
---

# 项目介绍

本项目分为两个部分

| 名称     | 介绍                      |
|--------|-------------------------|
| 用户端    | 带有用户鉴权机制的 ChatGPT WebUI |    
| 后台管理面板 | 管理用户、订阅计划、订单和速率限制       |

当前完整的逻辑链已经实现，但可视化的操作订阅计划和速率限制的后台面板还在开发中，请耐心等待。
有能力的可以根据 Example 直接对数据库进行读写，确保修改时的格式正确。

:::info

由于后台管理系统仍在开发中，所以没有相关的部署文档，如您有兴趣可自行查阅信息部署。

:::

## 准备

要体验该项目的完整功能，你需要提前准备以下部分：

| 服务名称       | 服务介绍                       | 
|------------|----------------------------|
| Redis 数据库  | 一台 Upstash 提供的 Redis 数据库实例 |    
| 邮件服务       | 通过用户注册的邮件发送验证码来完成用户注册      |    
| 短信服务       | 通过向用户注册的手机号发送验证码来完成用户注册    |    
| 文本安全接口     | 调用第三方文本安全接口进行敏感词过滤         |      |
| 收款接口       | 通过相应的收款策略接收用户付费            |       
| OpenAI Key | 可用的 OpenAI Key             |       

## 环境变量

:::caution

这是一块环境变量速查表，其中绝大部分都是可选项，您可以阅读配置部分来更详细的了解如何设置这些变量。

:::

| 变量名                       | 描述                    |
|---------------------------|-----------------------|
| JWT_SECRET                | JSON Web Token 密钥     |
| NEXT_PUBLIC_TITLE         | 网站标题                  |
| NEXT_PUBLIC_WECHAT_OA     | 微信公众号                 |
| REDIS_URL                 | Redis 数据库 URL         |
| REDIS_TOKEN               | Redis 数据库访问令牌         |
| OPENAI_ENDPOINT           | OpenAI API 端点         |
| OPENAI_API_KEY            | OpenAI API 密钥         |
| BING_COOKIE               | Bing 搜索引擎 Cookie      |
| DOMAIN                    | 主域名                   |
| CALLBACK_DOMAIN           | 回调域名                  |
| XUNHU_PAY_APPID           | 虎皮椒支付应用 ID            |
| XUNHU_PAY_APPSECRET       | 虎皮椒支付应用密钥             |
| NEXT_PUBLIC_EMAIL_SERVICE | 电子邮件服务                |
| MAILGUN_EMAIL_DOMAIN      | Mailgun 电子邮件域名        |
| MAILGUN_EMAIL_API_KEY     | Mailgun 电子邮件 API 密钥   |
| ELASTICE_EMAIL_API_KEY    | Elastic Email API 密钥  |
| ELASTICE_EMAIL_SENDER     | Elastic Email 发件人邮箱地址 |
| SMTP_HOST                 | SMTP 主机地址             |
| SMTP_USERNAME             | SMTP 用户名              |
| SMTP_PASSWORD             | SMTP 密码               |
| SMTP_EMAIL                | SMTP 电子邮件地址           |
| SMS_ACCESS_KEY_ID         | 短信服务访问密钥 ID           |
| TEXT_SECURITY             | 文本安全检测服务              |
| TENCENT_SECRETID          | 腾讯云 SecretID          |
| TENCENT_SECRETKEY         | 腾讯云 SecretKey         |
| BAIDU_APIKEY              | 百度 API 密钥             |
| BAIDU_SECRETKEY           | 百度密钥                  |
| EDGE_CONFIG               | 边缘配置 URL              |
