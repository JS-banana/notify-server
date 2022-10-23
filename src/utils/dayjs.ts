import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(duration)
dayjs.extend(LocalizedFormat)

const WEEKS: { [key: number]: string } = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  0: '星期日',
}

// TODO：时间统一走接口，这里的获取本地日期方法之后废弃
export const weekToday = () => {
  const week = dayjs().get('days')
  return WEEKS[week]
}

// 日期差值
export const getDiffByDate = (date: string): number | null => {
  try {
    return dayjs(date).diff(dayjs(), 'day')
  } catch (error) {
    console.log('日期错误', error)
    return null
  }
}

export default dayjs
