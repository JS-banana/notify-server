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
import { getContentByDay, getRandomRange } from './_util'

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

  // 自定义 love message
  if (CONFIG.my_love_message_show) {
    let len = getRandomRange(0, CONFIG.my_love_message_content?.length || 0)
    if (len === 0) return
    // 彩蛋逻辑处理
    if (CONFIG.my_love_message_content[len - 1].includes('彩蛋')) {
      // 为彩蛋消息时需要二次触发，两次随机都一样时触发
      // 为确保随机的概率相对稳定，需要设定一个固定值，如：8 * 8 = 64
      const Max = Math.floor(CONFIG.my_love_message_egg_probability / len)
      const current = getRandomRange(0, Max)
      if (len === current) {
        // 🎉彩蛋
        len = current
      } else {
        // 过滤掉彩蛋的内容，重新随机
        const filterEggs = CONFIG.my_love_message_content.filter((n) => !n.includes('彩蛋'))
        len = getRandomRange(0, filterEggs.length)
      }
    }

    // 生日当天必出现彩蛋
    if (birthdayInfo.todayIsBirthday) {
      if (birthdayInfo.who === 'girl') len = CONFIG.my_love_message_content.length - 2
      if (birthdayInfo.who === 'boy') len = CONFIG.my_love_message_content.length - 1
    }

    const text = CONFIG.my_love_message_content[len - 1]

    if (text) description += `\n${text}\n`
    description += '\n'
  }

  // 每日情话
  if (CONFIG.random_love && randomLove) description += `\n📋${randomLove}\n`

  // 生活指数提示
  if (CONFIG.weather_tips && tips) {
    description += `\n📋小建议:
${tips}\n`
  }

  // 最高温度
  if (CONFIG.weather_tem && highest && +highest.replace('℃', '') <= 3) {
    description += `
哈喽哈喽~这里是来自${CONFIG.boy_name}的爱心提醒哦：
今日最高温度仅为🥶 ${highest}，可冷可冷了~
${CONFIG.girl_name}可要注意保暖哦~\n`
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
