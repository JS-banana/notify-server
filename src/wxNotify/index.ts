/**
 * @name WXbot
 * @description 获取环境变量参数，执行微信消息通知函数
 */

import dotenv from 'dotenv';
import { MsgData } from './typing';
import WXWorkNotify from './WXWorkNotify';

// 读取 .env环境变量
dotenv.config();
const { WX_COMPANY_ID, WX_APP_ID, WX_APP_SECRET } = process.env;
console.log({ WX_COMPANY_ID, WX_APP_ID, WX_APP_SECRET });

// 变量
// let msg = '消息通知：\n';
let timer: any = '';

// 主函数
export function wxNotify(args: any) {
  return new Promise((resolve, reject) => {
    if (WX_COMPANY_ID && WX_APP_ID && WX_APP_SECRET) {
      let msgData: MsgData = { msgtype: 'text' };

      if (typeof args === 'string') {
        // 字符串
        // msg += args + '\n';
        msgData = {
          msgtype: 'text',
          text: {
            content: args,
          },
        };
      } else {
        // 对象
        msgData = args;
      }

      timer && clearTimeout(timer);
      timer = setTimeout(function() {
        WXWorkNotify({
          id: WX_COMPANY_ID, // 企业 ID
          agentId: WX_APP_ID, // 应用 ID
          secret: WX_APP_SECRET, // 应用 secret
          msgData,
        })
          .then(resolve)
          .catch(reject);
      }, 500);
    }
  });
}
