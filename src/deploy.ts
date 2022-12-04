import LoveMsg from './libs/LoveMsg'

// 早安、午安、晚安 => 由环境变量控制

// 对外暴露指定函数名：main_handler
// 配合云函数调用执行
export const main_handler = LoveMsg
