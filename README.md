# 消息通知

[![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml)
<!-- [![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml)
[![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml) -->

微信通知，每天给女朋友发早安、情话、诗句、天气信息等~

<!-- more -->

## 前言

<!-- 之前逛GitHub的时候发现了一个自动签到的小工具，b站、掘金等都可以，我看了下源码发现也是很简洁，也尝试用了一下，配置也都很简单，主要是他有一个自动打卡、抽奖的信息通知到微信的功能，不错过运气爆棚打卡抽奖时的中奖~😛 -->

前几天逛GitHub的时候发现了一个可以把信息通知到微信的小工具，也尝试用了一下，配置都很简单，用起来很方便，就很好奇研究了一下，我看了下源码发现也是很简洁~😛，说实话就是比较好奇怎么做的微信通知🤓

虽然以前做过钉钉的消息通知，但是钉钉我也就上班用一下，日常很少使用，要说通讯工具在国内还是要微信，笑😑，所以，第一接收信息通知的工具最好能是微信，懂得都懂~

后来我根据这个功能的逻辑一想，借用这个消息通知的能力，不就可以自定义任何内容推送到微信了吗，嘿嘿嘿，发现事情变的有趣了起来了~

想起之前看过一篇文章是通过邮箱每天给女朋友发土味情话的操作，邮箱哪有微信效果好呀，可不是😎

话不多说直接开整，自己做个每天给女朋友发早安和土味情话的工具，你也可以每天都是暖男~

## 思路

接下来我们主要做两件事：

- 第一件事：消息通知到微信能力的工具

- 第二件事：消息内容的获取和数据处理

消息通知能力，我调研了下，其他方案或多或少都有限制和不足，采用以上工具中的方案算是当前比较合适的

消息内容获取，一是通过开放API快速使用，二是通过自己编写爬虫脚本获取，出于技术和时间成本考虑，目前优先考虑方案一，方案二可以作为拓展能力

## 消息通知工具分析

### wechaty

文档：[wechaty](https://wechaty.gitbook.io/wechaty/v/zh/)

能做到微信几乎所有的功能和能力，当你有个小号微信时，你完全可以把它交由 wechaty控制，再通过代码设计各种能力，可玩性完全由你的想法决定

自动回复、加群、定时推送、回复、AI接口能力结合等等很多。。。

硬性条件是需要 wechaty官方提供的 `token`来获取权限，目前方式有两种

- 方式一：联系相关人员购买
- 方式二：参与开发者计划，贡献项目并被采纳，免费提供

相关文档：<https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty>

> 如果你有加过一些大佬的微信群，应该接触过由该能力实现的自动拉群、自动回复、自动每日播报的机器人

### 钉钉、飞书、企业微信

这三个工具定位都是企业级应用，企业级应用的好处就是可定制性很高，官方有开放提供很多API接口和权限，机器人、自定义应用、小程序等，可玩性还是蛮大的。

存在问题：

中国社交APP真实情况，排除企业组织使用，个人而言微信第一优先，不管是消息通知还是其他能力，但矛盾的地方是，个人微信限制很多，几乎不提供这种开发API的能力。当然，如果你可以接受钉钉或飞书或企业微信，则不存在这种问题。

新的思路：

企业微信作为微信自己的产品，有着一些天然优势：**微信支持在微信内接受企业微信的消息**

围绕这个能力我们也可以实现相应的功能需求，首先，我们先在微信内关注我们创建的企业微信，然后允许微信内接受企业微信内的消息。

> 个人创建企业微信很简单，只需提供手机号即可
>
> 钉钉、飞书则使用机器人通知（直接获取拿到机器人的 webhookURL 即可，post方法，参数格式基本相同）

### 小结

有条件优先使用 wechaty实现，没条件可以退而求其次采取 企业微信 + 微信 的方式。

## 准备

### 1.注册企业

用电脑打开[企业微信官网](https://work.weixin.qq.com/)，注册一个企业。有手机号就可以注册，不用营业执照！不用营业执照！不用营业执照！

### 2.创建应用

注册成功后，点「管理企业」进入管理界面，选择「应用管理」 → 「自建」 → 「创建应用」

应用名称随意填，可见范围可以选择公司名。

创建完成后进入应用详情页，可以得到应用ID( `agentid` )，应用Secret( `secret` )。

### 3.获取企业ID

进入「我的企业」页面，拉到最下边，可以得到企业ID。

### 4.推送消息到微信

进入「我的企业」 → 「微信插件」，拉到下边扫描二维码，关注以后即可收到推送的消息。

> 注：如果出现接口请求正常，企业微信接受消息正常，个人微信无法收到消息的情况：
>
> 1.进入「我的企业」 → 「微信插件」，拉到最下方，勾选 “允许成员在微信插件中接收和回复聊天消息”
>
> 2.在企业微信客户端 「我」 → 「设置」 → 「新消息通知」中关闭 “仅在企业微信中接受消息” 限制条件

### 5.添加环境变量

在 Github 的 Secrets 中在添加三个变量：

1. Name 是`WX_APP_ID`，Value 是第二步的 `AgentId`。
2. Name 是`WX_APP_SECRET`，Value 是第二步 `Secret`。
3. Name 是`WX_COMPANY_ID`，Value 是第三步的 `企业ID`。

```txt
WX_COMPANY_ID= 企业ID
WX_APP_ID= 应用ID
WX_APP_SECRET= 应用 Secret
TIAN_API_KEY= 天行数据 key
```

### 6.GitHub Action每天自动执行

核心代码如下，详细代码见下面仓库链接

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

## 功能和内容

这里就看个人的想法和思路了，就各种免费接口基本可以提供很多各式各样的信息了，你也可以自己写服务和爬虫脚本等，可玩性真的是很高

目前已添加的功能有：

- 个人定制化信息
- 天气信息
- 每日一言
- 最美宋词
- 雷人笑话
- 土味情话
- 每日英语
- 睡前故事

<!-- - 随机相册照片推送
- 每周电影资讯 -->

内容完全由你发挥，之后还可以开发自己的个人资讯和消息推送等，就很棒~

## 开发计划

数据获取不仅仅依赖于开放接口API，本应用运行于NodeJS环境，一切可行的手段都可以实现，如：爬虫、RSS订阅源、自开发脚本等

接下来探索更多数据获取的可能性，如有需要可考虑结合云服务和数据库

- [ ] [Everything is RSSible](https://docs.rsshub.app/)
- [ ] 爬虫、数据分析

## 部分代码

接口代码

```ts
class API {
  key: string
  constructor(key?: string) {
    this.key = key || '' // 为了方便，key在 http中统一添加
  }

  // 最美宋词
  async getSongLyrics() {
    const res = await getTian<IVerseProps[]>({ url: LoveMsgURL.songLyrics })
    return res?.[0]
  }

  // 每日一句美好英语
  async getDayEnglish() {
    const res = await getTian<ResEnglishProps[]>({ url: LoveMsgURL.dayEnglish })
    return res?.[0]
  }

  // 获取农历信息
  async getLunarDate(date: string) {
    const res = await getTian<ResLunarDateProps[]>({ url: LoveMsgURL.lunarDate, params: { date } })
    return res?.[0]
  }

  // 土味情话
  async getSaylove() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.saylove })
    return res?.[0]
  }
}

export default new API()
```

早安、午安、晚安

```ts
const { MESSAGE_TYPE } = process.env

export default function main() {
  if (MESSAGE_TYPE === 'goodAfternoon') {
    // 午安
    goodAfternoon()
  } else if (MESSAGE_TYPE === 'goodEvening') {
    // 晚安
    goodEvening()
  } else {
    // 早安
    goodMorning()
  }
}
```

请求数据-goodMorning

```ts
/**
 * @name goodMorning
 * @description 说早安
 */

// 并行请求，优响相应
const dataSource = await Promise.allSettled([
  API.getSaylove(), // 土味情话
  API.getCaihongpi(), // 彩虹屁
  API.getOneWord(), // 一言
  API.getSongLyrics(), // 最美宋词
  API.getOneMagazines(), // one杂志
  API.getNetEaseCloud(), // 网易云热评
  API.getDayEnglish(), // 每日英语
])

// 过滤掉异常数据
const [sayLove, caiHongpi, oneWord, songLyrics, oneMagazines, netEaseCloud, dayEnglish] =
  dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))
```

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

## 开发

复制 .env.example文件重命名为 .env，并按照要求填写对应值，可以直接测试

如果要通过 GitHub Action使用，需要在 Secrets 中一一添加变量

## 代码

本项目使用 `TypeScript`开发，包管理工具为 `pnpm`

完整代码见仓库，已开源 <https://github.com/JS-banana/notify-server>

欢迎一起交流

<!-- ## 感谢

灵感来自：[juejin-auto-checkin](https://github.com/JS-banana/juejin-auto-checkin) -->
