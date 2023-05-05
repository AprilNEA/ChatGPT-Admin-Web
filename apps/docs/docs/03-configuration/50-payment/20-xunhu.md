---
slug: xunhu
title: 支付接口
---

# 接入虎皮椒支付

虎皮椒接入文档：[https://www.xunhupay.com/doc/api/pay.html](https://www.xunhupay.com/doc/api/pay.html)

## 环境变量

| 环境变量名称(NAME)        | 环境变量的值(KEY) | 备注                                             |
|---------------------|-------------|------------------------------------------------|
| XUNHU_PAY_APPID     | 支付渠道ID      | 必填                                             |    
| XUNHU_PAY_APPSECRET | 支付渠道密钥      | 必填                                             |    
| XUNHU_PAY_TYPE      | 支付通道类型      | 选填，默认为`WAP`                                    |    
| XUNHU_WAP_NAME      | 店铺名称        | 选填，默认为`店铺名称`                                   |    
| DOMAIN              | 部署的域名       | 必填，用户支付完成后跳转，eg: `https://exmaple.com`，结尾不需要斜杠 |    
| CALLCACK_DOMAIN     | 回调的域名       | 选填，默认与`DOMAIN`一样，用于虎皮椒回调通知订单支付状态               |    
