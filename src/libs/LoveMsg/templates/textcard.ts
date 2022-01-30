/**
 * @description 文本卡片模板 title + description
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

/**
 * 卡片类型模板定义
 * 模板内容配置
 * 微信通知 textcard类型的description内容限制512个字节
 */

import dayjs from '../../../utils/dayjs'

// 相识的日子
const start_stamp = '2021-03-14'

export const textCardTemplate = (data: TextCardTemplateProps) => {
  const {
    area,
    date,
    weather,
    highest,
    lowest,
    wind,
    windsc,
    humidity,
    week,
    pop,
    pcpn,
    tips,
    lunarInfo,
  } = data

  // 今日、恋爱天数
  const today = `${date.replace('-', '年').replace('-', '月')}日`
  const dateLength = dayjs(date).diff(start_stamp, 'day')

  // 公历节日、农历节日和二十四节气
  const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
  const festival_info = festival ? `| ${festival}` : ''
  const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : ''
  const jieqi_info = jieqi ? `| ${jieqi}` : ''

  // 拼接内容
  let description = `${area} | ${today} | ${week} ${festival_info}
农历 | ${lubarmonth}${lunarday} ${lunar_festival_info} ${jieqi_info}\n
今日天气状况：
天气：${weather}
${wind}：${windsc}
温度：${lowest} ~ ${highest}
湿度：${humidity}\n`

  if (weather.includes('雨')) {
    description += `降雨概率：${pop}%
降雨量：${pcpn}mm\n`
  }
  // 生活指数提示
  if (tips) {
    description += `
${tips}\n`
  }

  // 最高温度
  if (+Number(highest.replace(/\D/g, '')) <= 12) {
    description += `
Hey，What’s up beauty gir！呢度係来自华哥嘅爱心提醒：
今日最高温度仅有${highest}，冻到腾腾震哇
牛崽要注意保暖呀\n`
  }

  //   if (air_tips) {
  //     description += `
  // 出行建议：${air_tips}`
  //   }

  //   if (oneWord) {
  //     description += `
  // 『 ${oneWord.hitokoto} 』`
  //   }

  // 内容末尾，自定义
  description += `
  [ 点我有惊喜 ] ❤️ 🧡 💛 💚 💖`

  const title = `嘿嘿，今天係我哋拍拖仔嘅第 ${dateLength} 日咯喔❤️`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      url: 'https://api.vvhan.com/api/60s', // 60s看世界
      btntxt: 'By华哥',
    },
  }
}
