import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(LocalizedFormat)

dayjs.tz.setDefault('Asia/Shanghai') // 受地理位置影响，时间可能不符合预期，设置时区

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

export default dayjs
