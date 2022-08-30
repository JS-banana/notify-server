const { exec } = require('child_process')
const cron = require('node-cron')
const dayjs = require('dayjs')
const chalk = require('chalk') // 4.1.2以上版本不支持 CommonJS

// node-cron 定时任务模块
// # ┌────────────── second (optional)  // 0-59
// # │ ┌──────────── minute             // 0-59
// # │ │ ┌────────── hour               // 0-23
// # │ │ │ ┌──────── day of month       // 1-31
// # │ │ │ │ ┌────── month              // 1-12 (or names)
// # │ │ │ │ │ ┌──── day of week        // 0-7 (or names, 0 or 7 are sunday)
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

// 为了方便你进行测试，你可以把时间配置成这样，默认为1分钟运行一次
// cron.schedule('* * * * *', () => {})

// 每天 7:30
cron.schedule(
  '30 7 * * *',
  (now) => {
    console.log(
      chalk.greenBright('🕒 当前时间:'),
      chalk.yellowBright(dayjs(now).format('YYYY-MM-DD HH:mm:ss'))
    )

    console.log(chalk.cyan('🎃 开始执行发送消息脚本...'))
    exec('npm run start', (err, stdout) => {
      if (err) {
        console.log(chalk.red('❌ 发送消息脚本执行失败'))
        console.log('err: ', err)
      } else {
        console.log(chalk.green('✅ 发送消息脚本执行成功'))
        console.log('stdout: ', stdout)
      }
    })
  },
  { timezone: 'Asia/Shanghai' }
)
