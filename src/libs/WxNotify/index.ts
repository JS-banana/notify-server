/**
 * @name WXbot
 * @description 获取环境变量参数，执行微信消息通知函数
 */

import dotenv from 'dotenv'
import { getToken } from './getToken'
import { postMsg } from './postMsg'

// 读取 .env环境变量
dotenv.config()
const { WX_COMPANY_ID, WX_APP_ID, WX_APP_SECRET } = process.env
console.log({ WX_COMPANY_ID, WX_APP_ID, WX_APP_SECRET })

// 主函数
export async function wxNotify(config: any) {
  try {
    // 获取token
    const accessToken = await getToken({
      id: WX_COMPANY_ID as string,
      secret: WX_APP_SECRET as string,
    })

    // 发送消息
    const defaultConfig = {
      msgtype: 'text',
      agentid: WX_APP_ID,
      ...config,
    }
    const option = { ...defaultConfig, ...config }
    const res = await postMsg(accessToken, option)
    console.log('wx:信息发送成功！', res)
    return true
  }
  catch (error) {
    console.log('wx:信息发送失败！', error)
    return false
  }
}
