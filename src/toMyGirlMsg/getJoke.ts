/**
 * @name getJoke
 * @description 获取笑话
 * https://api.vvhan.com/
 * https://api.vvhan.com/api/xh?type=json
 */
import axios from 'axios';

// 笑话
const URL = 'https://api.vvhan.com/api/xh?type=json';
export async function getJoke(): Promise<string> {
  try {
    const response = await axios(URL);
    return response.data?.joke;
  } catch (error) {
    console.log('笑话接口', error);
    return '笑话接口断开连接~';
  }
}

// 一句一言
const OneWordUrl = 'https://api.vvhan.com/api/ian?type=json';
export async function getOneWord(): Promise<string> {
  try {
    const response = await axios(OneWordUrl);
    return response.data?.ishan;
  } catch (error) {
    console.log('一句一言接口', error);
    return '一句一言接口断开连接~';
  }
}
