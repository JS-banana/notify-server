import dotenv from 'dotenv';
import { toMyGirlMsg } from './toMyGirlMsg';
import { goodNight } from './toMyGirlMsg/goodNight';

// 读取 .env环境变量
dotenv.config();
const { IS_GOOD_NIGHT } = process.env; // 读取的值为字符串，Boolean类型需要注意

// main
(function main() {
  console.log('IS_GOOD_NIGHT', IS_GOOD_NIGHT);
  IS_GOOD_NIGHT ? goodNight() : toMyGirlMsg();
})();
