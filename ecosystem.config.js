// PM2 配置文件: https://juejin.cn/post/6926357629375610887

module.exports = {
  apps: [
    {
      name: 'notify-server',
      script: 'scripts/schedule.js',
      max_memory_restart: '200M', // 服务占用的内存超过150M，自动进行重启
    },
  ],
}
