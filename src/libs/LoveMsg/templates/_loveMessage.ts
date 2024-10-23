// 自定义 love message

import { getRandomRange } from './_util'

interface IBirthdayInfo {
  todayIsBirthday: boolean
  who: string
  isEmpty: boolean
}

/**
 * 自定义 love message
 */
export const getLoveMessage = (
  template: string /* 模板内容 */,
  config: loveMsgProps /* 配置信息 */,
  birthdayInfo: IBirthdayInfo
): string => {
  //
  // 自定义 love message
  if (config.my_love_message_show) {
    let len = getRandomRange(1, config.my_love_message_content.length)
    // 彩蛋逻辑处理
    if (config.my_love_message_content[len - 1].includes('彩蛋')) {
      // 为彩蛋消息时需要二次触发，两次随机都一样时触发
      // 为确保随机的概率相对稳定，需要设定一个固定值，如：8 * 8 = 64
      const Max = Math.floor(config.my_love_message_egg_probability / len)
      const current = getRandomRange(1, Max)
      if (len === current) {
        // 🎉彩蛋
        len = current
        birthdayInfo.isEmpty = false
      } else {
        // 过滤掉彩蛋的内容，重新随机
        const filterEggs = config.my_love_message_content.filter(n => !n.includes('彩蛋'))
        len = getRandomRange(1, filterEggs.length)
      }
    }

    // 生日当天必出现彩蛋
    if (birthdayInfo.todayIsBirthday) {
      if (birthdayInfo.who === 'girl') len = config.my_love_message_content.length - 2
      if (birthdayInfo.who === 'boy') len = config.my_love_message_content.length - 1
    }

    const text = config.my_love_message_content[len - 1]

    if (text) template += `\n${text}`
  }
  template += '\n'

  return template
}
