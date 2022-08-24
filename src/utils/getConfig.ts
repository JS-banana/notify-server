/**
 * @name getConfig
 * @description 读取 config.yml全局配置文件
 */

import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

export const getConfig = (): IConfigProps => {
  console.log('配置文件路径：', path.resolve(process.cwd(), './config.yml'))
  const file = fs.readFileSync(path.resolve(process.cwd(), './config.yml'), 'utf8')
  return YAML.parse(file)
}
