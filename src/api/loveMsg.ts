import axios from 'axios'
import { getTian } from '../utils/http'

/**
 * 给女朋友发送内容的相关接口
 */
enum LoveMsgURL {
  // 天气接口：默认获取最近7天的数据
  weather = 'http://api.tianapi.com/tianqi/index',
  // 每日简报
  dailyBriefing = 'https://apis.tianapi.com/bulletin/index',
  // 今日头条
  topNews = 'https://apis.tianapi.com/topnews/index',
  // 最美宋词
  songLyrics = 'https://apis.tianapi.com/zmsc/index',
  // 每日一句美好英语
  dayEnglish = 'https://apis.tianapi.com/everyday/index',
  // 韩寒主编的ONE一个杂志，本接口返回每日一句
  oneMagazines = 'https://apis.tianapi.com/one/index',
  // 故事大全
  storybook = 'https://apis.tianapi.com/story/index',
  // 网易云热评
  netEaseCloud = 'https://apis.tianapi.com/hotreview/index',
  // 获取农历信息
  lunarDate = 'https://apis.tianapi.com/lunar/index',
  // 土味情话
  saylove = 'https://apis.tianapi.com/saylove/index',
  // 彩虹屁
  caihongpi = 'https://apis.tianapi.com/caihongpi/index',
  // 励志古言
  inspirationalWord = 'https://apis.tianapi.com/lzmy/index',
  // 笑话
  joke = 'https://apis.tianapi.com/joke/index',
  // 一言
  oneWord = 'https://v1.hitokoto.cn/?encode=json',
  // 随机一句情话
  random_love = 'https://api.vvhan.com/api/love',
}

class API {
  key: string
  constructor(key?: string) {
    this.key = key || '' // 为了方便，key在 http中统一添加
  }

  getKey() {
    return this.key
  }

  /**
   * 接口 ++++++++++
   */

  // 天气
  async getWeather(city_name: string): Promise<IWeatherResponseProps> {
    // 默认返回7天的数据，指定type只返回1天
    const res = await getTian({ url: LoveMsgURL.weather, params: { city: city_name, type: '1' } })
    console.log('weather', res)
    return res?.[0]
  }

  // 每日简报
  async getDailyBriefing() {
    const res = await getTian<DailyBriefing[]>({ url: LoveMsgURL.dailyBriefing })
    return res
  }

  // 今日头条
  async getTianTopNews() {
    const res = await getTian<TodayHeadlines[]>({ url: LoveMsgURL.topNews })
    return res
  }

  // 最美宋词
  async getSongLyrics() {
    const res = await getTian<IVerseProps[]>({ url: LoveMsgURL.songLyrics })
    return res?.[0]
  }

  // 每日一句美好英语
  async getDayEnglish() {
    const res = await getTian<ResEnglishProps[]>({ url: LoveMsgURL.dayEnglish })
    return res?.[0]
  }

  // one一个杂志
  async getOneMagazines() {
    const res = await getTian<OneMagazines[]>({ url: LoveMsgURL.oneMagazines })
    return res?.[0]
  }

  // 故事大全
  async getStorybook() {
    const res = await getTian<StorybookProps[]>({ url: LoveMsgURL.storybook })
    return res?.[0]
  }

  // 网易云热评
  async getNetEaseCloud() {
    const res = await getTian<NetEaseCloudProps[]>({ url: LoveMsgURL.netEaseCloud })
    return res?.[0]
  }

  // 获取农历信息
  async getLunarDate(date: string) {
    const res = await getTian<ResLunarDateProps[]>({ url: LoveMsgURL.lunarDate, params: { date } })
    return res?.[0]
  }

  // 土味情话
  async getSaylove() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.saylove })
    return res?.[0]
  }

  // 彩虹屁
  async getCaihongpi() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.caihongpi })
    return res?.[0]
  }

  // 雷人笑话
  async getJoke(num = 6) {
    const res = await getTian<JokeProps[]>({ url: LoveMsgURL.joke, params: { num } })
    return res
  }

  // 一言
  async getOneWord(): Promise<OneWordProps | null> {
    try {
      const response = await axios(LoveMsgURL.oneWord, { timeout: 60000 })
      return response.data
    }
    catch (error) {
      console.log(error)
      return null
    }
  }

  // 随机一句情话
  async getRandomLove(): Promise<string | null> {
    try {
      const response = await axios(LoveMsgURL.random_love, { timeout: 60000 })
      return response.data
    }
    catch (error) {
      console.log(error)
      return null
    }
  }
}

export default new API()
