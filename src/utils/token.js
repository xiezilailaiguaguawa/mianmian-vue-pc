// 固定的KEY
const KEY = "mmtoken";

// 暴露三个方法
// 设置
export function setToken(token) {
    window.localStorage.setItem(KEY,token)
}
// 获取
export function getToken() {
    return window.localStorage.getItem(KEY)
}
// 删除
export function removeToken() {
    // 根据key 删除指定的值
    window.localStorage.removeItem(KEY)
    // 清空(太过暴力,用的很少)
    // window.localStorage.clear()
}