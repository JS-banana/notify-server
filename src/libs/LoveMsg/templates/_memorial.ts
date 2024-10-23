import dayjs from '../../../utils/dayjs'

interface IBirthdayInfo {
  todayIsBirthday: boolean
  who: string
  isEmpty: boolean
}

const getMemorialText = (
  currentDay: string,
  memorial_day: string,
  memorial_day_day: number,
  memorial_day_message: string,
  memorial_day_message_now: string) => {
  const currentYear = currentDay.substring(0, 4)

  let text = ''
  let now = false
  // 相差天数
  const DAY = dayjs(currentYear + memorial_day.substring(5)).diff(currentDay, 'day')
  // 当天
  if (DAY === 0) {
    now = true
    const year = dayjs(currentDay).diff(memorial_day, 'year')
    text = memorial_day_message_now.replace('{year}', `${year > 0 ? year : ''}`)
  }
  // 倒计时
  if (DAY > 0 && DAY <= memorial_day_day) text = memorial_day_message.replace('{day}', `${DAY}`)

  return {
    text,
    now
  }
}

/**
 * 纪念日 日期相关
 */
export const getContentByDay = (
  template: string /* 模板内容 */,
  config: loveMsgProps /* 配置信息 */,
  currentDay: string /* 今天日期 */,
  birthdayInfo: IBirthdayInfo
): string => {
  // 取当前日期年份
  const currentYear = currentDay.substring(0, 4)
  // 配置参数
  const {
    // 相识纪念日
    memorial_day,
    memorial_day_show,
    memorial_day_message,
    memorial_day_message_now,
    memorial_day_day,
    memorial_card_show,
    // 女朋友生日
    girl_birthday_show,
    girl_birthday_date,
    girl_birthday_day,
    girl_birthday_message,
    girl_birthday_message_now,
    // 男朋友生日
    boy_birthday_show,
    boy_birthday_date,
    boy_birthday_day,
    boy_birthday_message,
    boy_birthday_message_now,
  } = config

  /**
   * 相识纪念日的逻辑处理
   */
  memorial_day_show.forEach((isShow, index) => {
    if (isShow) {
      const obj = getMemorialText(
        currentDay,
        memorial_day[index],
        memorial_day_day[index],
        memorial_day_message[index],
        memorial_day_message_now[index])
      //
      if (obj.text) {
        template += `\n${obj.text}`
        // 手动开启或者当天
        if (memorial_card_show[index] || obj.now) birthdayInfo.isEmpty = false
      }
    }
  })
  // if (memorial_day_show) {
  //   let text = ''
  //   // 相差天数
  //   const DAY = dayjs(currentYear + memorial_day.substring(5)).diff(currentDay, 'day')
  //   // 当天
  //   if (DAY === 0) {
  //     const year = dayjs(currentDay).diff(memorial_day, 'year')
  //     text = memorial_day_message_now.replace('{year}', `${year}`)
  //   }
  //   // 倒计时
  //   if (DAY > 0 && DAY <= memorial_day_day) text = memorial_day_message.replace('{day}', `${DAY}`)

  //   if (text) {
  //     template += `\n${text}`
  //     birthdayInfo.isEmpty = false
  //   }
  // }

  /**
   * 女朋友生日
   */
  if (girl_birthday_show) {
    let text = ''
    // 相差天数
    const DAY = dayjs(`${currentYear}/${girl_birthday_date}`).diff(currentDay, 'day')
    // 当天
    if (DAY === 0) {
      text = girl_birthday_message_now
      birthdayInfo.todayIsBirthday = true
      birthdayInfo.who = 'girl'
    }

    // 倒计时
    if (DAY > 0 && DAY <= girl_birthday_day) text = girl_birthday_message.replace('{day}', `${DAY}`)

    if (text) {
      template += `\n${text}`
      birthdayInfo.isEmpty = false
    }
  }

  /**
   * 男朋友生日
   */
  if (boy_birthday_show) {
    let text = ''
    // 相差天数
    const DAY = dayjs(`${currentYear}/${boy_birthday_date}`).diff(currentDay, 'day')
    // 当天
    if (DAY === 0) {
      text = boy_birthday_message_now
      birthdayInfo.todayIsBirthday = true
      birthdayInfo.who = 'boy'
    }

    // 倒计时
    if (DAY > 0 && DAY <= boy_birthday_day) text = boy_birthday_message.replace('{day}', `${DAY}`)

    if (text) {
      template += `\n${text}`
      birthdayInfo.isEmpty = false
    }
  }

  return template
}
