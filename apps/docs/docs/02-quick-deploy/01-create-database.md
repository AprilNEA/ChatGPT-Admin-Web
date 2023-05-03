---
slug: quick-deploy
sidebar_position: 1
---

# 创建数据库

在本教程中，我们将指导您如何在 Upstash 中创建 Redis 数据库。

Upstash 是一个提供即用的 Redis 云服务，它允许您轻松地创建和管理数据库。

以下是创建 Upstash 数据库的步骤：

## 步骤1：注册和登录

访问 Upstash 官网：https://upstash.com。

单击右上角的“Sign Up”（注册）按钮，填写相关信息以创建一个新账户。

如果您已经注册，请点击“Log In”（登录）按钮。

登录成功后，您将进入 Upstash 控制台。

## 步骤2：创建数据库

![](img/upstash-01.png)
在 Upstash 控制台，点击左侧菜单栏中的 “Databases”（数据库）选项。

点击右上角的 “Create Database”（创建数据库）按钮。

在创建数据库的对话框中，填写以下信息：

Database Name（数据库名称）：为您的数据库起一个有意义的名称。

Region（地区）：选择最靠近您或您的用户的数据中心。

Database Plan（数据库套餐）：根据您的需求选择合适的套餐。对于入门级用户，可以选择免费套餐。

点击“Create”（创建）按钮。

> 关于 Region 和 Global 的区别，您可以参考 Upstash 的文档。

## 步骤3：获取连接信息

![](img/upstash-02.png)
创建成功后，您将看到新创建的数据库出现在“Databases”列表中。

点击数据库名称以查看详细信息。

在详细信息页面中，您可以找到以下连接信息：

Connection String（连接字符串）：用于连接数据库的字符串，通常包含主机名、端口号和密码等信息。

Connection Details（连接详细信息）：包括主机名、端口号、用户名和密码等。

## 步骤4：使用数据库

根据您的应用程序和开发环境，使用连接信息连接到Upstash数据库。

