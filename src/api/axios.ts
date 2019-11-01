import axios from 'axios'
import { Md5 } from 'ts-md5/dist/md5'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
axios.interceptors.request.use(function (config: any): any {
  const type = Object.prototype.toString.call(config.data)
  if (type === '[object FormData]') { // FormData 用于上传文件，不做任何处理
    return config
  }

  if (typeof config.data === 'object' && config.data !== null && !config.data.sign) { // 通过sign 字段判断是否有签名
    config.data.sign = createSign(config.data) // 生成签名
    const keys: (string | number)[] = Object.keys(config.data)
    config.data = keys.reduce((arr: (string| number)[], cur: string| number): (string| number)[] => {
      arr.push(`${cur}=${config.data[cur]}`)
      return arr
    }, []).join('&')
  } else if (typeof config.params === 'object' && config.params !== null && !config.params.sign) {
    config.params.sign = createSign(config.params) // 生成签名
    const keys: (string | number)[] = Object.keys(config.params)
    config.params = keys.reduce((arr: (string| number)[], cur: string| number): (string| number)[] => {
      arr.push(`${cur}=${config.params[cur]}`)
      return arr
    }, []).join('&')
  }
  return config
}, function (err: any): any {
  return Promise.reject(err)
})
axios.interceptors.response.use(function (response: any): any {
  return Promise.resolve(response)
}, function (err: any): any {
  return Promise.reject(err)
})

export default axios

/*
  @param:{} data 生成签名的参数是个对象
  @return：string sign 返回签名
*/ 

export function createSign(data: any): string | ArrayBuffer {
  const keys: (string | number)[] = Object.keys(data)
  let str: (string | number)[] = []
  keys.sort()
  for (let i: number = 0; i < keys.length; i++) {
    str.push(data[keys[i]])
  }
  return Md5.hashStr(str.join(''))
}