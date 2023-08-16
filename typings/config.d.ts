/**
 * config.yml 配置项
 */
interface loveMsgProps {
  /* 与女朋友相识的日子 */
  start_stamp: string
  /* 卡片标题信息：今天是我们相恋的第 {day} 天，这里的 {day} 为固定替换相恋多久 */
  start_stamp_message: string
  /* 女朋友所在城市（不要带‘市’） */
  city_name: string
  /* 对女朋友的爱称 */
  girl_name: string
  /* 对自己的称呼 */
  boy_name: string
  /* 农历信息 */
  date_lunarInfo: boolean
  /* 黄历信息 */
  date_huangli: boolean
  /* 卡片末尾自定义信息 */
  card_end_message: string
  /* 点击卡片详情地址 */
  card_url: string

  /* 天气生活指数提示（默认开启） */
  weather_tips: boolean
  /* 低温提醒: 是否开启 */
  weather_low_show: boolean
  /* 低温提醒: 0 => 最低温度低于 0℃ 时触发 */
  weather_low_tem: number
  /* 低温提醒: 提醒内容 */
  weather_low_message: Array<string>

  /* 高温提醒: 是否开启 */
  weather_hight_show: boolean
  /* 高温提醒: 30 => 最高温度高于 30℃ 时触发 */
  weather_hight_tem: number
  /* 高温提醒: 提醒内容 */
  weather_hight_message: Array<string>

  /* 第二卡片 */
  tips_card_show: boolean
  /* 在有信息提醒时直接启用第二卡片展示，如 纪念日提醒、生日、彩蛋等 */
  tips_card_show_byMessage: boolean
  /* 卡片标题信息（加粗显示） */
  tips_card_title: string
  /* 卡片末尾自定义信息（为空则不显示） */
  tips_card_end_message: string
  /* 是否显示随机一言 */
  tips_card_oneWord: boolean
  /* 点击卡片详情地址 */
  tips_card_url: string

  /* 需要提醒的纪念日: 日期 */
  memorial_day: string[]
  /* 需要提醒的纪念日: 是否开启 */
  memorial_day_show: boolean[]
  /* 需要提醒的纪念日: 提醒内容，这里的 {day} 为固定替换模板，不可更改 */
  memorial_day_message: string[]
  /* 需要提醒的纪念日: 提醒内容，当天 */
  memorial_day_message_now: string[]
  /* 需要提醒的纪念日: 倒计时多久时开始提醒，单位天 */
  memorial_day_day: number[]
  /* 需要独立卡片显示: 当天默认启用独立卡片显示  */
  memorial_card_show: boolean[]

  /* 女朋友的生日 是否开启 */
  girl_birthday_show: boolean
  /* 女朋友的生日 12月15日 */
  girl_birthday_date: string
  /* 女朋友的生日: 提醒内容，这里的 {day} 为固定替换模板，不可更改 */
  girl_birthday_message: string
  /* 女朋友的生日: 提醒内容，当天 */
  girl_birthday_message_now: string
  /* 女朋友的生日 倒计时多久时开始提醒，单位天 */
  girl_birthday_day: number

  /* 男朋友的生日 是否开启 */
  boy_birthday_show: boolean
  /* 男朋友的生日 3月21日 */
  boy_birthday_date: string
  /* 男朋友的生日: 提醒内容，这里的 {day} 为固定替换模板，不可更改 */
  boy_birthday_message: string
  /* 男朋友的生日: 提醒内容，当天 */
  boy_birthday_message_now: string
  /* 男朋友的生日 倒计时多久时开始提醒，单位天 */
  boy_birthday_day: number

  /* 我的自定义情话、消息 */
  my_love_message_show: boolean
  /* 自定义情话内容 */
  my_love_message_content: Array<string>
  /* 设置概率最大公约数，1/64 的概率 */
  my_love_message_egg_probability: number
}

type IConfigProps = { loveMsg: loveMsgProps }
