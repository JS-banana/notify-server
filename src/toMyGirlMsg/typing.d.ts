export interface ICityCode {
  [key: string]: number;
}

interface ItextCardProps {
  title: string;
  description: string;
  url: string;
  btntxt?: string;
}

export interface ItemplateProps {
  msgtype: string;
  textcard: ItextCardProps;
}
export interface ItemplateTextProps {
  msgtype: string;
  text: { content: string };
}

// 定义参数类型
export interface IOptionsConfigProps {
  /** 城市名称 */
  city_name?: string;
  /** 城市 code */
  city_code?: number; // 杭州: 101210101 蚌埠: 101220201
  /** 相认开始时间 */
  start_stamp?: number | string;
}

// 预警信息
interface IAlarmProps {
  /** 暴雨 */
  alarm_type: '';
  /** 橙色 */
  alarm_level: '';
  /** 内容 */
  alarm_content: '';
}
// 定义天气返回值类型
export interface IWeatherResponseProps {
  /** 2021-12-18 */
  date: string;
  /** 星期六 */
  week: string;
  /** 蚌埠 */
  city: string;
  /** 晴 */
  wea: string;
  /** 西南风 */
  win: string;
  /** 3-4级 */
  win_speed_day: string;
  /** 湿度：35% */
  humidity: string;
  /** 空气：67 */
  air: string;
  /** 空气质量：良 */
  air_level: string;
  /** pm2.5：21 */
  air_pm25: string;
  /** 当前温度 4 */
  tem: string;
  /** 最高温度 8 */
  tem1: string;
  /** 最低温度 -2 */
  tem2: string;
  alarm: IAlarmProps | null;
}

export interface IVerseProps {
  /** 长安白日照春空，绿杨结烟垂袅风。 */
  content: string;
  /** 阳春歌 */
  origin: string;
  /** 李白 */
  author: string;
  /** 古诗文-天气-太阳 */
  category: string;
  /** 天行数据接口 名称 */
  source: string;
}

// 非天气的其他数据
export interface IOtherProps {
  /** 诗句 */
  verse: IVerseProps;
  /** 情话 */
  loveWord: string;
}

export type IConfigTemplateProps = IWeatherResponseProps & IOtherProps;

export interface IInspirationalEnglishProps {
  month: string;
  day: string;
  zh: string;
  en: string;
  pic: string;
}

export interface IConfigTextProps {
  /** 笑话 */
  joke?: string;
  /** 一句一言 */
  oneWord: string;
  /** 励志英语 */
  inspirationalEnglish: IInspirationalEnglishProp | null;
  /** 彩虹屁 */
  rainbowFart: string;
  one: string;
  hotComment: string;
}

/**
 * 以下是天行数据接口==========>
 */

// 最美英语
export interface ResEnglishProps {
  content: string;
  note: string;
  imgurl: string;
  date: string;
}

export interface ResShockingJoke {
  title: string;
  content: string;
}
