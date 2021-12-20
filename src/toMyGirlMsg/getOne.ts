/**
 *
 */
import axios from 'axios';

// 韩寒主编的ONE一个杂志，本接口返回每日一句。
const One_URL = 'http://api.tianapi.com/one/index?key=';
export async function getOne(key?: string): Promise<string> {
  try {
    const response = await axios(One_URL + key);
    return response.data?.newslist?.[0]?.word;
  } catch (error) {
    console.log('', error);
    return '断开连接~';
  }
}

// 故事大全
const Story_URL = 'http://api.tianapi.com/story/index?key=';
export async function getStory(key?: string): Promise<string> {
  try {
    const response = await axios(Story_URL + key);
    const { title, content } = response.data?.newslist?.[0] || {};
    return `${title}：\n${content}`;
  } catch (error) {
    console.log('', error);
    return '断开连接~';
  }
}

// 网易云热评
const HotComment_URL = 'http://api.tianapi.com/hotreview/index?key=';
export async function getHotComment(key?: string): Promise<string> {
  try {
    const response = await axios(HotComment_URL + key);
    const { source, content } = response.data?.newslist?.[0] || {};
    return `《${source}》\n${content}`;
  } catch (error) {
    console.log('', error);
    return '断开连接~';
  }
}
