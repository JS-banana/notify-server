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
const start_stamp = '2021-03-26'

export const textCardTemplate = (data: TextCardTemplateProps) => {
  const {
    city,
    date,
    wea,
    tem1,
    tem2,
    win,
    win_speed_day,
    air,
    air_level,
    // air_tips,
    humidity,
    alarm,
    lunarInfo,
    week,
    oneWord,
  } = data

  // 今日、恋爱天数
  const today = date.replace('-', '年').replace('-', '月') + '日'
  const dateLength = dayjs(date).diff(start_stamp, 'day')

  // 公历节日、农历节日和二十四节气
  const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
  const festival_info = festival ? `| ${festival}` : ''
  const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : ''
  const jieqi_info = jieqi ? `| ${jieqi}` : ''

  // 拼接内容
  let description = `${city} | ${today} | ${week} ${festival_info}
农历 | ${lubarmonth}${lunarday} ${lunar_festival_info} ${jieqi_info}\n
今日天气状况：
天气：${wea}
${win}：${win_speed_day}
温度：${tem2}℃ ~ ${tem1}℃
湿度：${humidity}
空气：${air_level} | ${air}\n`

  // 添加预警天气
  if (alarm) {
    description += `
有预警信息哦：${alarm.alarm_type} | ${alarm.alarm_level}预警\n`
  }

  // 最高温度
  if (+tem1 <= 3) {
    description += `
哈喽哈喽~这里是来自崽崽的爱心提醒哦：
今日最高温度仅为🥶 ${tem1}℃，可冷可冷了~
鱼崽崽可要注意保暖哦~\n`
  }

  //   if (air_tips) {
  //     description += `
  // 出行建议：${air_tips}`
  //   }

  if (oneWord) {
    description += `
『 ${oneWord.hitokoto} 』`
  }

  // 内容末尾，自定义
  description += `
  [ 点我有惊喜 ] ❤️ 🧡 💛 💚 💖`

  const title = `这是我们相识的第 ${dateLength} 天`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      //   url: 'https://api.lovelive.tools/api/SweetNothings',
      //   url: 'https://v1.jinrishici.com/all.svg',
      url: 'https://api.vvhan.com/api/60s', // 60s看世界
      btntxt: 'By崽崽',
    },
  }
}
