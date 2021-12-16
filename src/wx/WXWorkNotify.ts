import axios from 'axios';
import { FnReqPostMsg, IReqNoticeWork, IReqToken } from './typing';

const BASE_URL = 'https://qyapi.weixin.qq.com';

/**
 * @name getToken
 * @description 根据企业ID、secret 获取token
 */
async function getToken({ id, secret }: IReqToken): Promise<string> {
  try {
    const response = await axios({
      url: `${BASE_URL}/cgi-bin/gettoken?corpid=${id}&corpsecret=${secret}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.log(error);
    return '';
  }
}

/**
 * @name postMsg
 * @description 发送微信应用消息到客户端
 */
const postMsg: FnReqPostMsg = async (
  msgData = { msgtype: 'text' },
  options
) => {
  const { accessToken, agentid, touser = '@all' } = options;
  const response = await axios({
    url: `${BASE_URL}/cgi-bin/message/send?access_token=${accessToken}`,
    method: 'POST',
    data: {
      touser,
      agentid,
      ...msgData,
    },
  });
  return response.data;
};

// 执行发送消息逻辑
async function WXWorkNotify(options: IReqNoticeWork) {
  try {
    const { id, secret, agentId, touser, msgData } = options;
    const accessToken = await getToken({ id, secret });
    const res = await postMsg(msgData, {
      accessToken,
      touser,
      agentid: agentId,
    });
    console.log('postMsg', res);
    if (res?.errcode === 0) {
      console.log('🎉发送成功！！！');
    }
  } catch (error) {
    console.log(`发送失败 => ${error}`);
  }
}

export default WXWorkNotify;
