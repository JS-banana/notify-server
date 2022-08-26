import { Message } from '../packages/wxNotify/src'

function testBot() {
  const bot = new Message({ content: '123' })
  bot.send()
}

testBot()
