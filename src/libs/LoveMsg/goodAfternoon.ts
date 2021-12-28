/**
 * @name goodAfternoon
 * @description 说午安
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'

export const goodAfternoon = async() => {
  const res = await API.getJoke()

  let text = '今日份午安来喽:\n'

  text += `
请欣赏以下雷人笑话😝\n`

  text += `
${res.map(n => `『${n.title}』${n.content}`).join('\n\n')}`

  const template = {
    msgtype: 'text',
    text: {
      content: text,
    },
  }

  await wxNotify(template)
}
