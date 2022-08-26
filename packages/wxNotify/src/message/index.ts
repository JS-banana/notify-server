/**
 * @name wxNotify
 * @description 获取环境变量参数，执行微信消息通知函数
 */

import dotenv from 'dotenv'
import task from 'tasuku'
import { getToken } from './getToken'
import { postMsg } from './postMsg'

// 读取 .env环境变量
dotenv.config()
const { WX_COMPANY_ID, WX_APP_ID, WX_APP_SECRET } = process.env
console.log({ WX_COMPANY_ID, WX_APP_ID, WX_APP_SECRET })

interface IOptionsProps extends PostMsgOption {}

interface MessageProps {
  /** 企业微信 ID */
  wx_company_id: string
  /** 应用 ID */
  wx_app_id: string
  /** 应用 secret */
  wx_app_secret: string
}

export class Message {
  accessToken: string
  config: MessageProps
  options: IOptionsProps
  constructor(options: IOptionsProps) {
    this.accessToken = ''
    this.config = {
      wx_company_id: WX_COMPANY_ID || '',
      wx_app_id: WX_APP_ID || '',
      wx_app_secret: WX_APP_SECRET || '',
    }
    this.options = {
      msgtype: 'text',
      agentid: WX_APP_ID || '',
      touser: options.touser || '@all',
    }
  }

  async getToken() {
    const params = {
      id: this.config.wx_company_id,
      secret: this.config.wx_app_secret,
    }
    this.accessToken = await getToken(params)
  }

  async send() {
    await task('获取token...', async () => {
      await this.getToken()
    })

    await task('发送消息...', async ({ setTitle, setError }) => {
      try {
        const res = await postMsg(this.accessToken, this.options)
        setTitle('wx:信息发送成功')
        console.log(res)
      } catch (error) {
        setError('wx:信息发送失败！')
        console.log(error)
      }
    })
  }
}
