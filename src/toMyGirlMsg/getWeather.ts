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
