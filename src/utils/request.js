import axios from 'axios'
import qs from 'qs'
import local from '@/utils/local.js'
import { Message } from 'element-ui'

/* 请求拦截器 */
axios.interceptors.request.use(config => {
  const token = local.get('t_k')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

/* 响应拦截器 */
axios.interceptors.response.use(res => {
  const { code, msg } = res.data
  if (code === 0) {
    Message({
      showClose: true,
      type: 'success',
      message: msg
    })
  } else if (code === 1) {
    Message({
      showClose: true,
      type: 'error',
      message: msg
    })
  }
  return res
})

/* 设置默认请求路径 */
axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.timeout = 5000

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, reqbody) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(reqbody))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
