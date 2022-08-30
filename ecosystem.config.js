// PM2 配置文件: https://juejin.cn/post/6926357629375610887

module.exports = {
  apps: [
    {
      name: 'notify-server',
      script: 'scripts/schedule.js',
    },
  ],
}
