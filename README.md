<h1 align="center">微信消息通知</h1>

<p align="center">微信通知，每天给女朋友发早安、情话、诗句、天气信息等</p>

<p align="center">
  <a href="https://github.com/JS-banana/notify-server">
    <img src="https://visitor-badge.glitch.me/badge?page_id=js-banana.notify-server" alt="notify-server">
  </a>
  <a href="https://github.com/JS-banana/notify-server/stargazers">
    <img src="https://img.shields.io/github/stars/JS-banana/notify-server" alt="stars">
  </a>
  <a href="https://juejin.cn/post/7054013026801811470">
    <img src="https://img.shields.io/badge/Juejin-掘金-blue" alt="掘金">
  </a>
</p>

<p align="center">
  <a href="https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml">
    <img src="https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml/badge.svg" alt="goodMorning">
  </a>
</p>

<!-- [![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml) -->
<!-- [![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml)
[![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml) -->

微信通知能力的核心链路已完成，就消息内容而言不限，基于此，可以根据个人需求完成各种私人定制

## 已添加功能

- 每天给女友发早安和土味情话
  - 个人定制化信息
  - 天气信息
  - 每日一言
  - 最美宋词
  - 雷人笑话
  - 土味情话
  - 每日英语
  - 睡前故事

## 开发计划

数据获取不仅仅依赖于开放接口API，本应用运行于NodeJS环境，一切可行的手段都可以实现，如：爬虫、RSS订阅源、自开发脚本等

接下来探索更多数据获取的可能性，如有需要可考虑结合云服务和数据库

思路：

- [Everything is RSSible](https://docs.rsshub.app/)
- 爬虫、数据分析

计划：

- [ ] 每周豆瓣热映电影
- [ ] 每周GitHub Trending
- [ ] weekly周刊更新通知

## 开发

需要的变量

```txt
WX_COMPANY_ID= 企业ID
WX_APP_ID= 应用ID
WX_APP_SECRET= 应用 Secret
TIAN_API_KEY= 天行数据 key
```

### 本地开发

复制 `.env.example`文件重命名为 `.env`，并按照要求填写对应值，可以直接测试

### 部署

如果要通过 `GitHub Action`使用，需要在 `Secrets` 中一一添加变量

GitHub Action每天7:30自动执行，脚本配置如下：

```yml
schedule:
  # `分 时 天 月 周` 时按照标准时间 北京时间=标准时间+8 18表示北京时间早上2点
  # 早上 7:30
  - cron: '30 23 * * *'
```

## 数据赋能API

这里我们可以自己选择第三方开放API进行定制，或者自己定制

> 注：免费开源接口需要考虑服务稳定性！

目前接口数据能力主要由天行数据提供，随便注册一个账户会员即可，无门槛

天行数据：<https://www.tianapi.com/>

- 会员免费接口数量：**15个**
- 每日赠送次数：**100次**

注：如果采取该接口，需要在 **5.添加环境变量**这一步中，再添加Key的变量，作为天行数据接口使用时的必填参数

## 效果

天气信息

![wx_love-1](https://cdn.jsdelivr.net/gh/JS-banana/images/vuepress/wx_love-1.png)

其他信息

```txt
今日笑话：
名作家到我市举行签名活动。一大早我带着儿子来书店买书，
请作家签名时，儿子在一旁不解地问：“我们买的书怎么写他的名字？”

一言：
冬天之所以那么冷是为了告诉大家身边人的温暖有多重要。

今日英语（Dec 18 2021）：
While there is life, there is hope.
生命不息，希望不止。
```