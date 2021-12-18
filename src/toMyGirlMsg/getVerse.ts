/**
 * @name getVerse
 * @description 随机获取古诗词
 * https://www.jinrishici.com/
 */
import axios from 'axios';
import { IInspirationalEnglishProps, IVerseProps } from './typing';

const URL = 'https://v1.jinrishici.com/all.json';

export async function getVerse(): Promise<IVerseProps | null> {
  try {
    const response = await axios(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// 今日英语
const IE_URL = 'https://api.vvhan.com/api/en';
export async function getInspirationalEnglish(): Promise<IInspirationalEnglishProps | null> {
  try {
    const response = await axios(IE_URL);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
