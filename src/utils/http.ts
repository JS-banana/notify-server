import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const { TIAN_API_KEY } = process.env

const instance = axios.create({
  withCredentials: true,
  timeout: 60000,
})

instance.interceptors.response.use(
  (response) => {
    const res = response.data
    // 正确状态
    // TODO: 这里只针对符合该条件的接口
    if (res.code === 200) return res.newslist

    return undefined
  },
  (error) => {
    // 新版本错误处理
    if (error.response) {
      console.log('Response error:', error.response.status, error.response.data)
    } else if (error.request) {
      console.log('Request error:', error.request)
    } else {
      console.log('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

const request = <T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  console.log('config', config)
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      })
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      })
    }
  } else {
    return instance.request<T, T>(config)
  }
}
export function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, options)
}

export function getTian<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  return request(
    { ...config, params: { ...(config.params || {}), key: TIAN_API_KEY }, method: 'GET' },
    options
  )
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  return request({ ...config, method: 'POST' }, options)
}

export default request
export type { AxiosInstance, AxiosResponse }
