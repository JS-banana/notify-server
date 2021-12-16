# 消息通知

微信、钉钉、飞书、邮箱消息通知功能[开发中]

## 功能

- [x] WXbot  `WXbot('xx')`

## 企业微信消息通知

文档：<https://open.work.weixin.qq.com/api/doc/90001/90143/90372>

### 步骤

3个必要参数：

```txt
WX_COMPANY_ID= 公司ID
WX_APP_ID= 应用ID
WX_APP_SECRET= 应用 Secret
```

1. 获取token

    根据 **企业ID** 和 **应用Secret** 获取token

2. 发送消息

    传入token，并调用发送消息接口进行发送
