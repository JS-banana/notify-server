/**
 * @name getWeather
 * @description 获取天气信息
 * https://www.tianqiapi.com/
 */
import axios from 'axios';
import { ICityCode } from './typing';

// 基础路径
const URL = 'https://v0.yiketianqi.com/api';
// const baseArgs = 'unescape=1&version=v61&appid=43656176&appsecret=I42og6Lm';

// const fetchUrl = `${URL}?${baseArgs}&cityid=`;

const CityCode: ICityCode = {
  杭州: 101210101,
  蚌埠: 101220201,
};

export async function getWeather(city_name: '杭州' | '蚌埠'): Promise<any> {
  try {
    const city_code = CityCode[city_name];
    const response = await axios({
      url: URL,
      method: 'get',
      params: {
        unescape: '1',
        version: 'v61',
        appid: '43656176',
        appsecret: 'I42og6Lm',
        // 上面固定默认值
        cityid: city_code,
      },
    });
    console.log('[getWeather]天气请求成功==>', city_name);
    const result = response.data;
    // 预警天气
    if (!response.data.alarm.alarm_type && !response.data.alarm_content) {
      result.alarm = null;
    }
    return result;
  } catch (error) {
    console.log('[getWeather]天气请求失败==>', error);
  }
}

// 根据天气获取 天气诗句

const WeatherType: { [key: string]: number } = {
  风: 1,
  云: 2,
  雨: 3,
  雪: 4,
  霜: 5,
  露: 6,
  雾: 7,
  雷: 8,
  晴: 9,
  阴: 10,
};
const Type_URL = 'http://api.tianapi.com/tianqishiju/index?key=';
export async function getVerseByWeather(key?: string, weather?: string) {
  let type = 1;

  if (weather) {
    if (WeatherType[weather]) {
      type = WeatherType[weather];
    } else {
      const current = Object.keys(WeatherType).find(
        n => weather.indexOf(n) > -1
      );
      type = current ? WeatherType[current] : 1;
    }
  }

  //
  try {
    const response = await axios(Type_URL + key + `&tqtype=${type}`);
    return response.data.newslist?.[0];
  } catch (error) {
    console.log('[getVerseByWeather]天气请求失败==>', error);
  }
}
