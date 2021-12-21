/**
 * @name toMyGirlMsg
 * @description 每天给女朋友发送土味情话、天气信息等
 * @returns
 * 给 鱼崽 发送的内容是：
 * 2021年12月16日
 * 这是我们相识的第 200 天
 * 当前天气状况：
 * <预警信息>
 * 温度：4℃，湿度：40%，PM2.5：40.0
 * <愿你拥有比阳光明媚的心情>
 * 温度：-2℃ - 8℃
 * 东南方：3-4级
 * 空气：67
 *
 * <情话>
 */

import { getVerseByWeather, getWeather } from './getWeather';
import { IOptionsConfigProps } from './typing';
import { getLoveMsgByHan } from './getLoveMsg';
import { wxNotify } from '../wxNotify';
import { config_template, config_text } from './configTemplate';
import { getInspirationalEnglish, getVerse } from './getVerse';
import { gteInspirationalWord, getRainbowFart } from './getJoke';
import dotenv from 'dotenv';
import { getHotComment, getOne } from './getOne';
import { getLunarDate } from './getLunarDate';
// 读取 .env环境变量
dotenv.config();
const { TIAN_API_KEY } = process.env;

// 默认值
const defaultOptions: IOptionsConfigProps = {
  city_code: 101220201,
  start_stamp: '2021-03-26',
};

// toMyGirlMsg
export async function toMyGirlMsg(options: IOptionsConfigProps = {}) {
  const mergeOptions = { ...defaultOptions, ...options };
  try {
    console.log(options);
    // 1. 卡片模式：今日天气

    // 天气数据
    const localWeatherData = await getWeather('蚌埠');
    // 农历
    const lunarInfo = await getLunarDate(TIAN_API_KEY, localWeatherData.date);
    // 根据天气获取诗句
    const weatherVerse = await getVerseByWeather(
      TIAN_API_KEY,
      localWeatherData.wea
    );
    // 更新模板
    const templateArgs = {
      ...localWeatherData,
      lunarInfo,
      weatherVerse,
    };

    const template = config_template(templateArgs, mergeOptions);
    console.log(template);
    await wxNotify(template);

    // 2. 文本模式：笑话、段子、英语
    // 获取情话
    const loveWord = await getLoveMsgByHan(TIAN_API_KEY);
    // 获取古诗词
    const verse = await getVerse(TIAN_API_KEY);
    // one
    const one = await getOne(TIAN_API_KEY);
    // 网易云热评
    const hotComment = await getHotComment(TIAN_API_KEY);
    // 获取笑话
    const rainbowFart = await getRainbowFart(TIAN_API_KEY);
    // 一句一言
    const oneWord = await gteInspirationalWord(TIAN_API_KEY);
    // 今日英语
    const inspirationalEnglish = await getInspirationalEnglish(TIAN_API_KEY);
    const text = config_text({
      one,
      hotComment,
      rainbowFart,
      oneWord,
      verse,
      loveWord,
      inspirationalEnglish,
    });

    // wxNotify(text);
    // WXbot(text);
    console.log(text);
    await wxNotify(text);
  } catch (error) {
    console.log(error);
  }
}
