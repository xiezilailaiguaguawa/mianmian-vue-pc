// 导入axios
import axios from 'axios'
// 导入获取token的工具函数
import { getToken }  from '../utils/token.js'
//  统一设置基地址
axios.defaults.baseURL = "http://127.0.0.1/heimamm/public";
// 设置跨域携带cookie
// 1.axios跨域请求时,默认不会携带cookie,导致验证码无法验证
// 2.为了携带cookie 添加一个设置:withCredentials:true 设置为true即可
axios.defaults.withCredentials = true;
// 封装登录接口（login）
export function login(data) {
    return axios({
        url: "/login",
        method: "post",
        data
    });
}
// 封装短信验证码接口
export function sendsms(data) {
    return axios({
        url: "/sendsms",
        method: "post",
        data
    });

}
// 用户注册接口
export function register(data) {
    return axios({
        url: "/register",
        method: "post",
        data
    });
}
// 获取用户信息接口
export function userInfo() {
    return axios({
        url: "/user/info",
        method: "get",
        headers: {
                token:getToken()
        }
    });
}