/**
 * @name getVerse
 * @description 随机获取古诗词
 * https://www.jinrishici.com/
 */
import axios from 'axios';
import { IVerseProps, ResEnglishProps } from './typing';

// const URL = 'https://v1.jinrishici.com/all.json';
// export async function getVerse(): Promise<IVerseProps | null> {
//   try {
//     const response = await axios(URL);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// 天行数据接口：最美宋词
const Verse_URL = 'http://api.tianapi.com/zmsc/index?key=';
export async function getVerse(key?: string): Promise<IVerseProps | null> {
  try {
    const response = await axios(Verse_URL + key);
    return response.data.newslist?.[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// 今日英语
// const IE_URL = 'https://api.vvhan.com/api/en';
// export async function getInspirationalEnglish(): Promise<IInspirationalEnglishProps | null> {
//   try {
//     const response = await axios(IE_URL);
//     return response.data?.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// 每日一句美好英语
const IE_URL = 'http://api.tianapi.com/everyday/index?key=';
export async function getInspirationalEnglish(
  key?: string
): Promise<ResEnglishProps | null> {
  try {
    const response = await axios(IE_URL + key);
    return response.data.newslist?.[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
