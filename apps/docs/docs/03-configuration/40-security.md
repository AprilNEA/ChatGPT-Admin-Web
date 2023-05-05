---
slug: security
title: 文本安全
---

# 接入文本安全

## 通用环境变量

| 环境变量的名称(NAME) | 环境变量的内容(KEY)       | 备注 |
|---------------|--------------------|----|
| TEXT_SECURITY | `tencent`或者`baidu` | 必填 |

### 腾讯天御 文本安全检查

| 环境变量的名称(NAME)     | 环境变量的内容(KEY) | 备注 |
|-------------------|--------------|----|
| TEXT_SECURITY     | `tencent`    | 必填 |
| TENCENT_SECRETID  | 腾讯云密钥ID      | 必填 |
| TENCENT_SECRETKEY | 腾讯云密钥KEY     | 必填 |

### 百度云 文本安全检查

| 环境变量的名称(NAME)     | 环境变量的内容(KEY) | 备注 |
|-------------------|--------------|----|
| TEXT_SECURITY     | `baidu`      | 必填 |
| BAIDU_SECRETID  | 百度云密钥ID      | 必填 |
| BAIDU_SECRETKEY | 百度云密钥KEY     | 必填 |

