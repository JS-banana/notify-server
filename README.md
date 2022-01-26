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

<!-- [![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodMorning.yml) -->
<!-- [![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodAfternoon.yml)
[![ci](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml/badge.svg)](https://github.com/JS-banana/notify-server/actions/workflows/goodEvening.yml) -->

## 豆瓣每周电影和热映推送

方案&思路：

- 使用现成的RSS订阅源直接通过相关工具解析完成
- 自己写爬虫

目前在该项目下使用 `rsshub`库使有点问题，应该是和项目 package.json有关，延后处理

打算整理搞个自己的订阅源管理，方便以后使用
