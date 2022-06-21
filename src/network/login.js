import { request } from "./requset";
export function login(username, password) {
  return request({
    url: 'login',
    method: "POST",
    data: { username: username, password: password }
  })
}

