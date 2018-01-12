/*
 * @Author: Leon Zhang
 * @Date: 2018-01-02 16:43:15
 * @Last Modified by: Leon Zhang
 * @Last Modified time: 2018-01-12 15:06:18
 */

import Axios from 'axios'
import webConfig from 'config/web-config'

const axiosModel = Axios.create({})
const ajaxMethod = ['get', 'post']
const api = {}

if (process.env.NODE_ENV === 'production') {
  axiosModel.defaults.baseURL = webConfig.web_product_domain
}

axiosModel.defaults.headers.post['Content-Type'] = 'application/json'

axiosModel.defaults.timeout = 50000

axiosModel.defaults.responseType = 'json'

axiosModel.defaults.transformRequest = [
  function (data) {
    // 数据处理
    // let req = {
    //   data: data
    // }
    return JSON.stringify(data)
  }
]

axiosModel.defaults.validateStatus = function () {
  return true
}

axiosModel.interceptors.request.use(function (config) {
  // 配置config
  config.headers.Accept = 'application/json, text/plain, */*'
  // config.headers.System = 'vue';
  // let token = Vue.localStorage.get('token');
  // if(token){
  //     config.headers.Token = token;
  // }
  return config
})

axiosModel.interceptors.response.use(function (response) {
  let data = response.data
  // let head = data.head
  // if (head && head.errcode === 0) {
  //   return Promise.resolve(data.result || {})
  // } else {
  //   return Promise.reject(data.result || {})
  // }
  return Promise.resolve(data || {})
})

ajaxMethod.forEach(method => {
  // 数组取值的两种方式
  api[method] = function (uri, data, config) {
    return new Promise(function (resolve) {
      let param = {}
      if (method === 'get') {
        param.params = data
      } else {
        param = data
      }
      axiosModel[method](uri, param, config)
        .then(response => {
          console.log('fetch success')
          /* 根据后台数据进行处理
           *1 code===200   正常数据+错误数据     code!==200   网络异常等
           *2 code===200   正常数据     code!==200   错误数据+网络异常等
           * 这里使用的是第一种方式
           * ......
           */
          resolve(response)
        })
        .catch(err => {
          // reject response
          console.log('fetch fail err:')
          console.log(err)
        })
    })
  }
})

export default api
