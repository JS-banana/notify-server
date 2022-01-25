/**
 * @name WXbot
 * @description 群机器人
 */
import axios from 'axios'
import dotenv from 'dotenv'
// 读取 .env环境变量
dotenv.config()
const { WX_BOT_KEY } = process.env

const URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send'

export default async function WXbot(msg: string) {
  try {
    console.log('WXbot', WX_BOT_KEY, msg)
    const response = await axios({
      url: `${URL}?key=${WX_BOT_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        msgtype: 'text',
        text: {
          content: msg,
          mentioned_list: ['@all'], // 通知所有人或单个成员（支持ID和手机号）
          // mentioned_mobile_list: ['@all'],
        },
      },
    })
    if (response.data?.errcode === 0) console.log('🎉发送成功！！！')
  } catch (error) {
    console.log(`发送失败 => ${error}`)
  }
}
