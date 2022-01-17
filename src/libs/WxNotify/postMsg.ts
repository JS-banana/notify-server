import axios from 'axios'

/**
 * 发送消息通知到企业微信
 */
const BASE_URL = 'https://qyapi.weixin.qq.com'

export const postMsg: FnReqPostMsg = async(accessToken, config) => {
  const response = await axios({
    url: `${BASE_URL}/cgi-bin/message/send?access_token=${accessToken}`,
    method: 'POST',
    data: {
      touser: config.touser || '@all',
      ...config,
    },
  })
  return response.data
}
