import { request } from "./requset";

export function getDetail(id) {
  return request({
    url: "/detail",
    params: {
      // 前面是接口的变量,后面是组件的变量
      iid: id,
    }
  })
}
export function getRecommend() {
  return request({
    url: "/recommend",
  })
}



