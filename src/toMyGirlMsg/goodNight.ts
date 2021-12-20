/**
 * @name goodNight
 * @description  发送睡前消息
 */
import dotenv from 'dotenv';
import { wxNotify } from '../wxNotify';
import { getJokeList } from './getJoke';
import { getOne } from './getOne';
// 读取 .env环境变量
dotenv.config();
const { TIAN_API_KEY } = process.env;

export async function goodNight() {
  const one = await getOne(TIAN_API_KEY);
  const response = await getJokeList(TIAN_API_KEY);
  console.log(one, response);

  let text = '以下内容来自鱼崽小铃铛\n';

  text += `
把最好的晚安给我的鱼崽 :)
以下内容为笑话，愿你以快乐结束这美好的一天😝\n`;

  text += `
${response.map(n => `《${n.title}》\n${n.content}`).join('\n\n')}`;

  await wxNotify({
    msgtype: 'text',
    text: {
      content: text,
    },
  });
}
