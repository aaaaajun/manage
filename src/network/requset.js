import axios from 'axios'
// 终极解决方案2
export function request(config) {
  // 1.创建实例,axios返回的是一个promise
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8888/api/private/v1/",
    timeout: 5000
  })
  // 2.配置拦截器
  instance.interceptors.request.use(
    //配置请求的一些信息
    config => {
      return config
    },
    err => {
      console.log(err);
    },
  )
  // 2.配置拦截器
  instance.interceptors.response.use(
    response => {
      return response.data
    },
    reason => {
      console.log('响应拦截器执行了失败的回调');
      console.log(reason);
      //中断promise链
      return new Promise(() => { })
    },
  )
  // 把这里的instance看成axios构造函数加axios实例去理解
  // 3.发送网络请求
  return instance(config)
}
