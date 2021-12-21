/**
 * @name getLunarDate
 * @description 获取农历信息
 */
import axios from 'axios';
import { ResLunarDate } from './typing';

const URL = 'http://api.tianapi.com/lunar/index?key=';
export async function getLunarDate(
  key?: string,
  date?: string
): Promise<ResLunarDate | null> {
  try {
    const response = await axios(URL + key + `&date=${date}`);
    return response.data?.newslist?.[0];
  } catch (error) {
    console.log('', error);
    return null;
  }
}
