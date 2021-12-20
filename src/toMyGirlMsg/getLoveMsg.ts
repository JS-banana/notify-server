/**
 * @name getLoveMsg
 * @description 获取土味情话
 * http://www.ainicr.cn/qh/t83.html
 * https://api.lovelive.tools/api/SweetNothings
 */
import axios from 'axios';

// 接口1
const URL = 'https://api.lovelive.tools/api/SweetNothings';
export async function getLoveMsg(): Promise<string> {
  try {
    const response = await axios(URL);
    return response.data;
  } catch (error) {
    return '快通知男朋友，你的土味情话断开连接了！';
  }
}

// 接口2
// const Han_URL = 'https://api.vvhan.com/api/love?type=json';
// export async function getLoveMsgByHan(): Promise<string> {
//   try {
//     const response = await axios(Han_URL);
//     return response.data?.ishan;
//   } catch (error) {
//     return '快通知男朋友，你的土味情话断开连接了！';
//   }
// }

// 天行数据接口：土味情话
const Han_URL = 'http://api.tianapi.com/saylove/index?key=';
export async function getLoveMsgByHan(key?: string): Promise<string> {
  try {
    const response = await axios(Han_URL + key);
    return response.data?.newslist?.[0].content;
  } catch (error) {
    return '快通知男朋友，你的土味情话断开连接了！';
  }
}
