// 固定的key
const KEY = "mmtoken";
export function setToken(token) {
  window.localStorage.setItem(KEY, token);
}
// 获取
export function getToken() {
  return window.localStorage.getItem(KEY);
}
// 删除
export function removeToken() { 
    window.localStorage.removeItem(KEY);
}
