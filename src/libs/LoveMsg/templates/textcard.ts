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

/**
 * 卡片: 天气、日期、黄历
 */
export const textCardTemplate = (data: TextCardTemplateProps) => {
  const { area, date, weather, highest, lowest, wind, windsc, week, pcpn, tips, lunarInfo } = data
  // 是否超过512字节
  let isMoreThan = false

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

  // 黄历信息
  if (CONFIG.date_huangli && lunarInfo) {
    let isEmpty = true

    if (lunarInfo.fitness) {
      description += `\n🌝【宜】${lunarInfo.fitness.replace(/\./g, ' ')}\n`
      isEmpty = false
    }

    if (lunarInfo.taboo) {
      if (isEmpty) description += '\n'
      description += `🌚【忌】${lunarInfo.taboo.replace(/\./g, ' ')}\n`
    }
  }

  description += `\n🖼今日天气状况：
⛅天气：${weather}
🎐${wind}：${windsc}
🌡温度：${lowest} ~ ${highest}\n`

  if (weather.includes('雨')) description += `🌧降雨量：${pcpn}mm\n`

  // 低温提醒
  if (CONFIG.weather_low_show && lowest && +lowest.replace('℃', '') <= CONFIG.weather_low_tem) {
    const only_one = CONFIG.weather_low_message.length === 1
    const len = only_one ? 1 : getRandomRange(1, CONFIG.weather_low_message.length)
    description += `\n${CONFIG.weather_low_message[len - 1].replace('{low}', lowest)}\n`
  }

  // 高温提醒
  if (CONFIG.weather_hight_show && highest && +highest.replace('℃', '') >= CONFIG.weather_hight_tem) {
    const only_one = CONFIG.weather_hight_message.length === 1
    const len = only_one ? 1 : getRandomRange(1, CONFIG.weather_hight_message.length)
    description += `\n${CONFIG.weather_hight_message[len - 1].replace('{hight}', highest)}\n`
  }

  // 第二卡片不开启时才展示
  if (!CONFIG.tips_card_show) {
    const birthdayInfo = { todayIsBirthday: false, who: '', isEmpty: true }

    // 保留原始数据，为了恢复时使用
    const cache = description

    // 纪念日相关日期内容处理
    description = getContentByDay(description, CONFIG, date, birthdayInfo)

    // 自定义 love message 以及 彩蛋
    description = getLoveMessage(description, CONFIG, birthdayInfo)

    // 根据是否有重要消息自动开启第二卡片
    if (CONFIG.tips_card_show_byMessage) {
      // 重要消息不为空：纪念日、生日、彩蛋，其他普通消息不算在内
      // 则独立显示第二卡片
      if (!birthdayInfo.isEmpty) {
        isMoreThan = true
        description = cache
      }
    }

    /**
     * 当第二卡片中的数据在此展示时，需要计算内容长度是否大于 512 字节
     */
    if (!isMoreThan) {
      const cache_before = description
      if (CONFIG.weather_tips && tips) {
        description += `\n📋小建议:
  ${tips}\n`
      }
      // 内容末尾，自定义
      if (CONFIG.card_end_message) description += `\n${CONFIG.card_end_message}`

      const byteLength = Buffer.byteLength(description, 'utf8')
      // 大于512字节是，恢复默认，开启第二卡片
      if (byteLength > 512) {
        description = cache
        isMoreThan = true
      }
      else {
        description = cache_before
      }
    }
  }

  // 生活指数提示
  if (CONFIG.weather_tips && tips) {
    description += `\n📋小建议:
${tips}\n`
  }

  // 内容末尾，自定义
  if (CONFIG.card_end_message) description += `${CONFIG.card_end_message}`

  // 加粗标题
  const title = CONFIG.start_stamp_message.replace('{day}', `${dateLength}`)

  // const byteLength = Buffer.byteLength(description, 'utf8')
  // console.log('字节长度', byteLength)

  return {
    isMoreThan, // 是否超过了 512 字符
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      // url: 'https://api.lovelive.tools/api/SweetNothings',
      // url: 'https://v1.jinrishici.com/all.svg',
      url: `${CONFIG.card_url}`, // 60s看世界
      btntxt: `By${CONFIG.boy_name}`,
    },
  }
}

/**
 * 卡片：信息提醒
 */
export const textCardImportantTips = (data: TextCardTemplateProps) => {
  const { date, oneWord } = data
  let description = ''
  // 保存生日信息，为彩蛋逻辑处理使用
  const birthdayInfo = { todayIsBirthday: false, who: '', isEmpty: true }

  // 纪念日相关日期内容处理
  description = getContentByDay(description, CONFIG, date, birthdayInfo)

  // 如果存在内容，需要添加换行
  if (!birthdayInfo.isEmpty) description += '\n'

  // 自定义 love message 以及 彩蛋
  description = getLoveMessage(description, CONFIG, birthdayInfo)

  // 一言
  if (CONFIG.tips_card_oneWord)
    description += `\n${oneWord?.hitokoto}—— ${oneWord?.creator}「${oneWord?.from}」`

  // 内容末尾，自定义
  description += CONFIG.tips_card_end_message

  // 加粗标题
  const title = CONFIG.tips_card_title

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      // url: 'https://api.lovelive.tools/api/SweetNothings',
      // url: 'https://v1.jinrishici.com/all.svg',
      url: `${CONFIG.tips_card_url}`, // 60s看世界
      btntxt: `By${CONFIG.boy_name}`,
    },
  }
}
