// 导入axios
import axios from 'axios'
// 导入获取token的工具函数
import { getToken, removeToken } from '../utils/token.js'
// 导入 Element-ui对话框
import { Message } from 'element-ui';
// 导入 路由
import router from "../router/router.js"
//  统一设置基地址
axios.defaults.baseURL = "http://127.0.0.1/heimamm/public";
// 设置跨域携带cookie
// 1.axios跨域请求时,默认不会携带cookie,导致验证码无法验证
// 2.为了携带cookie 添加一个设置:withCredentials:true 设置为true即可
axios.defaults.withCredentials = true;

// 统一设置axios拦截器
// 请求拦截器
// 请求发送 之前
// config 是当前这次请求的 各种设置
// 可以统一设置header
axios.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    console.log(1);
    // console.log('request--interceptors')
    // console.log(config);
    // config.headers.token="i am a token"
    // config.headers.auth="i have a little secret"
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
// axios 直接使用的.then之前
// response 服务器响应的内容
axios.interceptors.response.use(
    function (response) {
        if (response.data.code === 0) {
            // token有问题
            Message.error("token有问题");
            // 删除token
            removeToken();
            // 去登录页
            router.push("/login");
            return;
        }

        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
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
        // headers: {
        //     token: getToken()
        // }
    });
}
// 作用域 抽取学科接口
// 可以用subject.add subject.list调用接口
export const subject = {
    // 新增
    add(data) {
        return axios({
            url: "subject/add",
            method: "post",
            data
        })
    },
    // 列表
    // get 请求的参数用params来传递
    list(data) {
        return axios({
            url: "subject/list",
            params: "get",
            data
        })
    },
    // 状态
    status(data) {
        return axios({
            url: "subject/status",
            method: "post",
            data
        })
    },
    // 编辑
    edit(data) {
        return axios({
            url: "subject/edit",
            method: "post",
            data
        })
    },
    // 删除
    remove(data) {
        return axios({
            url: "subject/remove",
            method: "post",
            data
        })
    }
}