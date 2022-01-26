import dotenv from 'dotenv'
import { doubanMovieWeekly } from './libs/RSS'
// import LoveMsg from './libs/LoveMsg'
dotenv.config()

// 早安、午安、晚安 => 由环境变量控制
// LoveMsg()
doubanMovieWeekly()
