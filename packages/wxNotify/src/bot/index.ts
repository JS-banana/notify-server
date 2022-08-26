/**
 * @name WXbot
 * @description 群机器人
 */
import axios from 'axios'
import dotenv from 'dotenv'
import task from 'tasuku'

// 读取 .env环境变量
dotenv.config()
const { WX_BOT_KEY } = process.env

interface IOptionsProps {
  /** 发送内容 */
  content: string
}

interface BotProps extends IOptionsProps {
  wx_url: string
  wx_key: any
}

export class Bot {
  options: BotProps
  constructor(options: IOptionsProps) {
    this.options = {
      wx_url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send',
      wx_key: WX_BOT_KEY || '',
      ...options,
      //
    }
  }

  async send() {
    task('微信机器人发送消息...', async ({ setTitle, setError }) => {
      try {
        const { wx_key, wx_url, content } = this.options
        const response = await axios({
          url: `${wx_url}?key=${wx_key}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            msgtype: 'text',
            text: {
              content,
              mentioned_list: ['@all'], // 通知所有人或单个成员（支持ID和手机号）
              // mentioned_mobile_list: ['@all'],
            },
          },
        })

        // status
        response.data?.errcode === 0
          ? setTitle('机器人发送消息成功')
          : setError('机器人发送消息失败')
      } catch (error) {
        console.log(error)
      }
    })
  }
}
