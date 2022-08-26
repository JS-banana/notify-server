import { Bot } from '../packages/wxNotify/src'

function testBot() {
  const bot = new Bot({ content: '123' })
  bot.send()
}

testBot()
