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

## 重构天气功能

为了求稳，决定暂时先不用免费的接口了，该功能使用**天行数据**提供的接口API，

简要说明：

其他非天气接口，注册会员用户每天可免费调用100次，个人使用足够了，对于天气这种特殊接口采用独立计费模式，不过价格也足够便宜，1元10000次，且申请接口后立即赠送500次。
