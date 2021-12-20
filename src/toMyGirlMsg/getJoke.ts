/**
 * @name getJoke
 * @description 获取笑话
 * https://api.vvhan.com/
 * https://api.vvhan.com/api/xh?type=json
 */
import axios from 'axios';
import { ResShockingJoke } from './typing';

// 笑话
// const URL = 'https://api.vvhan.com/api/xh?type=json';
// export async function getJoke(): Promise<string> {
//   try {
//     const response = await axios(URL);
//     return response.data?.joke;
//   } catch (error) {
//     console.log('笑话接口', error);
//     return '笑话接口断开连接~';
//   }
// }

// 一句一言
// const OneWordUrl = 'https://api.vvhan.com/api/ian?type=json';
// export async function getOneWord(): Promise<string> {
//   try {
//     const response = await axios(OneWordUrl);
//     return response.data?.ishan;
//   } catch (error) {
//     console.log('一句一言接口', error);
//     return '一句一言接口断开连接~';
//   }
// }

// 天行数据接口：雷人笑话
const URL = 'http://api.tianapi.com/joke/index?key=';
export async function getJokeList(key?: string): Promise<ResShockingJoke[]> {
  try {
    const response = await axios(URL + key + '&num=6');
    return response.data?.newslist;
  } catch (error) {
    console.log('笑话接口', error);
    return [];
  }
}
// 天行数据接口：彩虹屁
const RainbowFart_URL = 'http://api.tianapi.com/caihongpi/index?key=';
export async function getRainbowFart(key?: string): Promise<string> {
  try {
    const response = await axios(RainbowFart_URL + key);
    return response.data?.newslist?.[0]?.content;
  } catch (error) {
    console.log('笑话接口', error);
    return '笑话接口断开连接~';
  }
}

// 天行数据接口：励志古言
const OneWordUrl = 'http://api.tianapi.com/lzmy/index?key=';
export async function gteInspirationalWord(key?: string): Promise<string> {
  try {
    const response = await axios(OneWordUrl + key);
    return response.data?.newslist?.[0]?.saying;
  } catch (error) {
    console.log('一句一言接口', error);
    return '一句一言接口断开连接~';
  }
}
