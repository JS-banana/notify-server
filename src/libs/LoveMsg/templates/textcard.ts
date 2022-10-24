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
import { getConfig } from '../../../utils/getConfig'
import { getLoveMessage } from './_loveMessage'
import { getContentByDay } from './_memorial'
import { getRandomRange } from './_util'

const CONFIG = getConfig().loveMsg

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
    randomLove,
  } = data

  // 今日、恋爱天数
  const today = `${date.replace('-', '年').replace('-', '月')}日`
  const dateLength = dayjs(date).diff(CONFIG.start_stamp, 'day')

  // 拼接内容
  let description = `📍${area} | ${today} | ${week}`

  if (CONFIG.date_lunarInfo && lunarInfo) {
    const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
    // 公历节日、农历节日和二十四节气
    const festival_info = festival ? `| ${festival}` : ''
    const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : ''
    const jieqi_info = jieqi ? `| ${jieqi}` : ''

    description += `${festival_info}
📆农历 | ${lubarmonth}${lunarday} ${lunar_festival_info} ${jieqi_info}\n`
  }

  description += `\n🖼今日天气状况：
⛅天气：${weather}
🎐${wind}：${windsc}
🌡温度：${lowest} ~ ${highest}
💦湿度：${humidity}\n`

  if (weather.includes('雨')) {
    description += `🌧降雨概率：${pop}%
💧降雨量：${pcpn}mm\n`
  }

  // 保存生日信息，为彩蛋逻辑处理使用
  const birthdayInfo = { todayIsBirthday: false, who: '' }

  // 纪念日相关日期内容处理
  description = getContentByDay(description, CONFIG, date, birthdayInfo)

  // 自定义 love message 以及 彩蛋
  description = getLoveMessage(description, CONFIG, birthdayInfo)

  // 每日情话
  if (CONFIG.random_love && randomLove) description += `\n📋${randomLove}\n`

  // 低温提醒
  if (CONFIG.weather_low_show && lowest && +lowest.replace('℃', '') <= CONFIG.weather_low_tem) {
    const only_one = CONFIG.weather_low_message.length === 1
    const len = only_one ? 1 : getRandomRange(1, CONFIG.weather_low_message.length)
    description += `\n${CONFIG.weather_low_message[len - 1].replace('{low}', lowest)}`
  }

  // 高温提醒
  if (CONFIG.weather_hight_show && highest && +highest.replace('℃', '') >= CONFIG.weather_hight_tem) {
    const only_one = CONFIG.weather_hight_message.length === 1
    const len = only_one ? 1 : getRandomRange(1, CONFIG.weather_hight_message.length)
    description += `\n${CONFIG.weather_hight_message[len - 1].replace('{hight}', highest)}`
  }

  // 生活指数提示
  if (CONFIG.weather_tips && tips) {
    description += `\n📋小建议:
${tips}\n`
  }

  // 内容末尾，自定义
  description += `
  [ 点击查看每日新闻 ] ❤️ 🧡 💛 💚 💖`

  const title = `今天是我们相恋的第 ${dateLength} 天`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      //   url: 'https://api.lovelive.tools/api/SweetNothings',
      //   url: 'https://v1.jinrishici.com/all.svg',
      url: `${CONFIG.card_url}`, // 60s看世界
      btntxt: `By${CONFIG.boy_name}`,
    },
  }
}
