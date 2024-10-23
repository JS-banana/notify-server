/**
 * @name goodMorning
 * @description 说早安
 */
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardImportantTips, textCardTemplate } from './templates/textcard'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getSongLyrics(), // 最美宋词
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
    ])

    // 过滤掉异常数据
    const [sayLove, caiHongpi, oneWord, songLyrics, oneMagazines, netEaseCloud, dayEnglish] = dataSource.map(
      (n) => (n.status === 'fulfilled' ? n.value : null)
    )

    // 对象写法
    const data: any = {
      sayLove,
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
    }

    const template = textTemplate(data)
    console.log('goodWord', template)

    wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}

// 天气信息
const weatherInfo = async () => {
  try {
    const weather = await API.getWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(weather.date)
      const oneWord = await API.getOneWord()
      const template = textCardTemplate({ ...weather, lunarInfo })
      const { isMoreThan, ...args } = template

      console.log('weatherInfo', args)

      // 发送消息
      await wxNotify(args)

      // 手动开启、或者超出字节自动开启
      if (CONFIG.tips_card_show || isMoreThan) {
        const tips = textCardImportantTips({ ...weather, lunarInfo, oneWord })
        console.log('tips', tips)
        if (tips.textcard.description.replace(/\n/g, '').length) await wxNotify(tips)
      }
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}

// goodMorning
export const goodMorning = async () => {
  await weatherInfo()
  await goodWord()
}
