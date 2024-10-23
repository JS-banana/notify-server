<h1 align="center">微信消息通知</h1>

<p align="center"><img width="340" src="/images/weixin.jpg" alt="weixin"></p>

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
  <a href="https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml">
    <img src="https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml/badge.svg" alt="goodMorning">
  </a>
</p>

<p align="center">微信通知，每天给女朋友发早安、情话、诗句、天气信息等</p>
<p align="center">微信通知能力的核心链路已完成，就消息内容而言不限，基于此，可以根据个人需求完成各种私人定制</p>
<p align="center">
  <sub>
    Support this project by starring and sharing it. <a href="https://github.com/JS-banana">Follow me</a> to see what other cool projects I'm working on.
  </sub>
</p>

<!-- [![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml) -->
<!-- [![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml)
[![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml) -->

## 已添加功能

> 建议直接查看 [config.yml](config.yml) 配置文件，里面有详细的配置功能说明~

- [x] 每天给女友发早安和土味情话
  <details><summary>点击查看详细内容</summary>
  
  - 个人定制化信息
  - 天气信息
  - 农历信息
  - 黄历信息
  - 节日信息
  - 生日提醒
  - 纪念日提醒
  - 彩蛋消息
  - 每日一言
  - 最美宋词
  - 雷人笑话
  - 土味情话
  - 每日英语
  - 睡前故事
  - 60s看世界
  </details>

## 效果

<!-- ![wx_love-1](https://cdn.jsdelivr.net/gh/JS-banana/images/vuepress/wx_love-1.png) -->

<p align="center"><img width="500" src="/images/weixin.jpg" alt="weixin"></p>

<p align="center"><img width="500" src="/images/preview-1.jpg" alt="preview-1"></p>

```txt
星河耿耿，不如你眼眸璀璨，晚风习习，不如你温柔绮丽。

你闻到空气中有烧焦的味道吗？那是我的心在为你燃烧。

『苏轼《水调歌头》』有悲欢离合，月有阴晴圆缺，此事古难全。

『ONE杂志』爱情无非是年轻人一起喝酒做梦。

『网易云音乐热评』你相信吗 也许在另一个平行时空 有一个跟你长得很像很像的人 正在热烈得爱着那个你爱不到的人——想见你想见你想见你

『一言』你的眼中，明暗交杂，一笑生花。

『每日英语（Jan 9, 2022』In case I don't see you… Good afternoon, good evening, and good night.
```

## 数据赋能API

这里我们可以自己选择第三方开放API，或者自己定制

目前接口数据能力主要由天行数据提供，随便注册一个账户会员即可，无门槛

天行数据：<https://www.tianapi.com/>

- 会员免费接口数量：**15个**
- 每日赠送次数：**100次**

注：如果采取该接口，需要在 **添加环境变量**这一步中，再添加`Key`的变量值`TIAN_API_KEY`，作为天行数据接口使用时的必填参数

> 免费开源接口需要考虑服务稳定性！
>
> 本项目目前已使用到的天行数据接口见 [src/api/loveMsg](https://github.com/JS-banana/notify-server/src/api/loveMsg.ts)

**提醒**：

天气数据API接口：<https://www.tianqiapi.com/> 不再免费提供使用了，为了测试，新用户注册可免费使用2000次

非收费接口也有，不过目前看来功能有限（免费接口很容易这样用着用着就不行了😿）

为了求稳，决定暂时先不用免费的接口了，该功能使用天行数据提供的接口API，

简要说明：

其他非天气接口，注册会员用户每天可免费调用100次，个人使用足够了，对于天气这种特殊接口采用独立计费模式，不过价格也足够便宜，1元10000次，且申请接口后立即赠送500次。

## 如何使用

**准备工作**：

1. 安装[NodeJS](https://nodejs.org/zh-cn/)（14.x版本以上，安装最新的稳定版即可）
2. 注册企业微信，并按照步骤提供要求的变量（[企业微信注册步骤](#需要的变量)）
3. 注册[天行数据](https://www.tianapi.com/)，获取到用户`Key`

> 如果你需要使用到 Git的功能，你还需要[安装Git](https://git-scm.com/downloads)

**配置文件**：

项目依赖于2个核心配置文件:

- [`.env`](.env)：用于配置环境变量值，如：企业ID、应用ID、天行key、发送消息类型为早中晚等
  - 复制 `.env.example`文件重命名为 `.env`，并按照要求填写对应变量值
  - 如果你使用的是服务器或者云函数，也可以通过直接设置环境变量进行配置

  ```.env
  # 鱼崽小铃铛：应用ID
  WX_APP_ID=1000003

  # 发送消息类型（不填默认为早晨）
  MESSAGE_TYPE=goodMorning
  ```

- [`config.yml`](config.yml)：用于配置女朋友的各种信息，以及纪念日提醒等，功能都在该文件进行配置

  ```yml
  # 卡片标题信息（加粗显示）：今天是我们相恋的第 {day} 天，这里的 {day} 为固定替换相恋多久
  start_stamp_message: 今天是我们相恋的第 {day} 天
  # 女朋友所在城市（不要带‘市’），天气接口需要使用
  city_name: 蚌埠
  # 女朋友的爱称
  girl_name: 鱼崽
  ```

> yml语法比json更简洁易读，比较简单，[阮一峰 YAML 语言教程](https://www.ruanyifeng.com/blog/2016/07/yaml.htmls)

**4种方式**：

1. 使用本地电脑手动发送消息（[点我，看这里](#本地开发)）
2. 使用`GitHub Action`免费实现自动发送消息（[点我，看这里](#github-action-部署)）
3. 部署本地服务实现自动化运行发送消息（[点我，看这里](#部署本地服务)）
4. 使用云函数部署，免服务器、操作简单、支持固定IP（**推荐**）（[点我，看这里](#云函数部署)）

### 使用问题

**需要指出的是，企业微信2022.6.20号的安全更新影响如下**：

1. 如果你是在该日期之后注册的应用，那么在调用接口发送消息通知时，接口会提示IP错误，这里需要你在微信后台的应用管理中配置**可信IP**
2. 目前根据一些同学的最新反馈，在设置可信IP之前，又发现了需要设置**可信域名**的问题

> 1. 对于2022.6.20之前注册过应用的同学暂时不受影响
>
> 2. 对于使用`GitHub Action`的用户来说，因为 Action的运行服务器IP是不固定的，会经常变动，目前没发现合适的解决方案
>
> 3. 对于本地调试发送消息的用户，你可以把报错的本地IP复制后填写到应用后台的可信IP内，便可以暂时解决这个问题，这个方式主要用于调试使用（电脑重启后IP可能会变），可信域名的问题会依然存在

**对于上面的问题，对应的解决方案如下**：

1. 可信IP问题，可采用云函数部署的解决方案，支持固定IP，见[使用方式四](#云函数部署)
2. 可信域名的问题，见[seph1rex同学提供的解决方案（可信域名.docx）](docs/可信域名.docx)（文件位置：`docs/可信域名.docx`）

总的来说，成本最低，效率最高的使用方式就是采用云函数部署方案。

### 需要的变量

```txt
WX_COMPANY_ID= 企业ID
WX_APP_ID= 应用ID
WX_APP_SECRET= 应用 Secret

TIAN_API_KEY= 天行数据 key
```

<details><summary>点击查看企业微信的注册步骤的详细示例</summary>

#### 第一步，注册企业

用电脑打开[企业微信官网](https://work.weixin.qq.com/)，注册一个企业。有手机号就可以注册，不用营业执照！不用营业执照！不用营业执照！

#### 第二步，创建应用

注册成功后，点「管理企业」进入管理界面，选择「应用管理」 → 「自建」 → 「创建应用」

![创建应用-1](images/qiyewx-2.png)

应用名称随意填，可见范围选择公司名（或指定组织、个人，建议选择全部，然后在代码里指定用户）。

![创建应用-2](images/qiyewx-3.png)

指定成员或组织

![指定范围](images/qiyewx-3-2.png)

创建完成后进入应用详情页，可以得到应用 ID( agentid )①，应用 Secret( secret )②。

![创建应用-3](/images/qiyewx-3-1.png)

#### 第三步，获取企业 ID

进入「[我的企业](https://work.weixin.qq.com/wework_admin/frame#profile)」页面，拉到最下边，可以得到企业 ID③。

![企业ID](images/qiyewx-6.png)

#### 第四步，推送消息到微信

进入「我的企业」 → 「[微信插件](https://work.weixin.qq.com/wework_admin/frame#profile/wxPlugin)」，拉到下边扫描二维码，关注以后即可收到推送的消息。

![第四步](images/qiyewx-4.png)

#### 无法接收到消息的异常情况处理

PS：如果出现`接口请求正常，企业微信接受消息正常，个人微信无法收到消息`的情况：

1. 进入「我的企业」 → 「微信插件」，拉到最下方，勾选 “允许成员在微信插件中接收和回复聊天消息”

    ![异常情况-1](images/qiyewx-5.jpg)

2. 在企业微信客户端 「我」 → 「设置」 → 「新消息通知」中关闭 “仅在企业微信中接受消息” 限制条件

    ![异常情况-2](images/qiyewx-5-1.jpg)

</details>

### 本地开发

1. 可以先star本项目给个支持，然后直接fork本项目 => 克隆至本地
2. 复制 `.env.example`文件重命名为 `.env`，并按照要求填写对应变量值
3. 安装依赖

   ```bash
   # 推荐使用pnpm（如果未安装，可先全局安装`npm install -g pnpm`）
   pnpm install
   # or
   npm install
   ```

4. 执行脚本

   ```bash
   # 推荐使用这种方式
   pnpm start
   # or
   npm start
   ```

   或者

   ```bash
   # 先build构建再执行脚本
   # 1. build构建生成js文件
   pnpm build
   # 2. node执行js文件
   node dist/index.js
   ```

> 注：本项目不作为包发布，因此暂不考虑build构建，直接通过脚本运行即可，github服务已配置有缓存，无需担心安装性能问题

### GitHub Action 部署

如果要通过 `GitHub Action`使用，需要在 `Secrets` 中一一添加变量,脚本会自动运行，当然，你也可以根据自身需求调整，见 [.github/workflows/goodMorning.yml](.github/workflows/goodMorning.yml)

![secrets](/images/secrets.png)

GitHub Action每天7:30自动执行，脚本配置如下：[ci.yml](https://github.com/JS-banana/notify-server/blob/master/.github/workflows/goodMorning.yml)

```yml
schedule:
  # `分 时 天 月 周` 时按照标准时间 北京时间=标准时间+8 18表示北京时间早上2点
  # 早上 7:30
  - cron: '30 23 * * *'
```

### 部署本地服务

使用 [pm2](https://pm2.fenxianglu.cn/) 实现对自动化脚本的本地化部署。当使用该方式后，你只需配置好[发送消息的时间](./scripts/schedule.js)，然后启动服务即可😎

如果你是以下设备，请注意：

1. **本地电脑**：不关机无影响，关机后，需要开机后开启本服务
2. **服务器**：无影响，启动服务后会一直保持运行（服务器默认不关机、重启）

> 服务器部署服务的使用方式逻辑和本地开发一样，需要先clone本项目 => 安装依赖 => 执行脚本

如何启动服务：

```sh
npm run depoly:start
```

如何停止服务：

```sh
npm run depoly:stop
```

如何查看服务：

```sh
# 查看服务状态
npm run depoly:status
# 查看服务日志
npm run depoly:log
```

### 云函数部署

直接使用按量付费的Serverless云函数，方便快捷，腾讯云函数、阿里云函数、华为云函数等等都可以~

支持指定固定IP，可以有效解决**可信IP**的问题，目前提供了基于腾讯云和华为云的教程，如下：

1. [deploy分支(作者基于腾讯云函数开发的)](https://github.com/JS-banana/notify-server/tree/deploy)：该分支可以帮助用户快速完成基于腾讯云函数的部署，`README.md`有操作步骤
2. [docs/腾讯云函数deploy分支部署方法详解.docx](docs/腾讯云函数deploy分支部署方法详解.docx)：**MAO12366**同学提供的零基础图文操作教程，针对腾讯云的小白用户可以参考这个
3. [docs/master分支华为云函数部署方法.docx](docs/master分支华为云函数部署方法.docx)：**MAO12366**同学提供的零基础图文操作教程，针对华为云的小白用户可以参考这个

<!-- ## 全局配置 -->

<!-- ## 开发计划

数据获取不仅仅依赖于开放接口API，本应用运行于NodeJS环境，一切可行的手段都可以实现，如：爬虫、RSS订阅源、自开发脚本等

接下来探索更多数据获取的可能性，如有需要可考虑结合云服务和数据库

思路：

- [Everything is RSSible](https://docs.rsshub.app/)
- 爬虫、数据分析

计划：

目前项目结构现在看来是有点混杂，接下来首要任务就是进行模块和功能的拆分、梳理，分层管理。

- [x] 天气接口重构
- [ ] 分层：核心能力模块与衍生功能点进行模块划分调整
- [ ] 女友生日倒计时（一个月时开始计时通知，消息展现在卡片中）
- [ ] 本地方式考虑支持定时任务以实现非手动执行（GitHub Action为线上服务方式）
- [ ] 美丽短句的开头语句优化调整
- [ ] 每周豆瓣热映电影
- [ ] 随机照片 -->

## 更新记录

- 2022-01-25：README文档更新、添加图示，免费天气接口稳定性及功能标注
- 2022-01-26：天气接口调整、功能调整，见分支`feat/weather`
- 2022-02-09：增加容错处理，增加独立配置文件方便用户定制
- 2022-08-24：fix 美丽短句config配置问题[adf87fc](https://github.com/JS-banana/notify-server/commit/adf87fc04c78547fbd7070be01b1e147b6a4b856)，完善文档
- 2022-08-30: 增加本地化部署自动化脚本服务的功能[PR](https://github.com/JS-banana/notify-server/pull/15)
- 2022-09-05: 美化模板，添加表情
- 2022-10-23：新增纪念日、生日提醒、自定义love message、彩蛋🎃
- 2022-10-24：新增高温提醒、低温提醒、自定义内容
- 2022-10-25：新增第二卡片：可以根据当前内容是否大于512字节自动启用，也支持手动启用，启用后纪念日、生日、彩蛋将只会在第二卡片中展示
- 2022-10-26：新增黄历、第二卡片根据重要消息智能启用
- 2022-12-07：整理了云函数部署的文档，以及专门针对腾讯云函数开发的deploy分支

## 交流

你可以关注我公众号（前端小帅），然后加我微信交流，或者直接添加交流群，一起沟通学习~

<table>
  <tr>
    <td valign="top">
      <img height="160" alt="公众号：前端小帅" src="https://cdn.jsdelivr.net/gh/JS-banana/images/vuepress/4.png" />
    </td>
    <td valign="top">
      <img height="160" alt="交流群" src="/images/wx-group.jpg" />
    </td>
  </tr>
</table>

<!-- ![微信](/images/wx.jpg) -->

## 版权声明

**[GPLv3](LICENSE) 协议**：凡使用本项目，其代码必须公开；如由此项目衍生的收费服务，必须提前告知终端用户此项目是可以免费获得及收费的理由；在本项目基础上 Fork、修改后的代码，必须采用 GPLv3 协议（**转载引用请注明作者和项目地址**）

## 鸣谢

感谢一直以来支持本项目的同学，并且为本项目的发展提供了很多思路和建议~❤

- [MAO12366](https://github.com/MAO12366)：图标模板贡献、云函数部署贡献
- [seph1rex](https://github.com/seph1rex)：可信域名解决方案提供

## 请作者喝咖啡☕

如果觉得这个项目还不错，或者这个项目对你有所帮助，可以选择请作者喝咖啡☕~

打赏时您可以备注名称，我会将您添加至打赏列表中（如有遗漏请联系我添加）

未备注的我会以咖啡命名😄，再次感谢各位的支持🧡~

<table>
  <tr>
    <td valign="top">
      <img height="200" alt="支付宝" src="/images/alipay.jpg" />
    </td>
    <td valign="top">
      <img height="200" alt="微信" src="/images/wechat.png" />
    </td>
  </tr>
</table>

| 捐赠者    |   捐赠金额 | 捐赠日期   |
| --------- | -------- | ---------- |
| 生椰拿铁    | 6.66 元   | 2022-11-15 |
| 卡布奇诺    | 20 元     | 2022-10-31 |
| A 🌸      | 5 元     | 2022-01-07 |

## 感谢star

你的 star 就是对我的最大支持🙏

[![Stargazers over time](https://starchart.cc/JS-banana/notify-server.svg)](https://starchart.cc/JS-banana/notify-server)
