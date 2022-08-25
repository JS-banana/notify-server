/**
 * config.yml 配置项
 */
interface loveMsgProps {
  /* 与女朋友相识的日子 */
  start_stamp: string
  /* 女朋友所在城市（不要带‘市’） */
  city_name: string
  /* 对女朋友的爱称 */
  girl_name: string
  /* 对自己的称呼 */
  boy_name: string
  /* 点击卡片详情地址 */
  card_url: string
  /**
   * 天气生活指数提示（默认开启）
   * @default true
   */
  weather_tips: boolean
  /**
   * 极端天气温度提醒（默认开启）
   * 卡片内容字节限制可能显示不完全
   * @default true
   */
  weather_tem: boolean
  /**
   * 农历信息（默认开启）
   * @default true
   */
  date_lunarInfo: boolean
}

type IConfigProps = { loveMsg: loveMsgProps }
