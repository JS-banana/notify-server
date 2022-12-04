const fs = require('fs')
const path = require('path')
const { cwd } = require('process')
const chalk = require('chalk') // 4.1.2以上版本不支持 CommonJS

// 复制文件操作
function copyFile() {
  console.log(chalk.yellowBright('😀 开始移动文件...'))

  // 目标文件夹
  const destDir = path.resolve(cwd(), 'deploy')

  // 是否存在
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, (err) => {
      if (err) console.log(err)
    })
  }

  const files = ['./dist/build.js', './lib/index.js', '.env', 'config.yml', 'package.json']

  files.forEach((file) => {
    // 获取到各个文件的路径
    const sourcePath = path.resolve(cwd(), file)
    let targetPath = path.resolve(cwd(), 'deploy', file)

    // 文件夹存在时
    if (file === './dist/build.js')
      targetPath = path.resolve(cwd(), 'deploy', 'build.js')
    else if (file === './lib/index.js')
      targetPath = path.resolve(cwd(), 'deploy', 'index.js')

    // 读写文件
    const rs = fs.createReadStream(sourcePath).on('error', (error) => {
      console.log(chalk.red('❌ 读取文件时发生错误'))
      console.log(error)
    })
    const ws = fs.createWriteStream(targetPath).on('error', (error) => {
      console.log(chalk.red('❌ 写入文件时发生错误'))
      console.log(error)
    })

    rs.pipe(ws)
    console.log(chalk.green(`✅ 文件：${sourcePath} 移动至 ${targetPath} 完成`))
  })
}

copyFile()
