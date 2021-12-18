// 导入 axios
import axios from "axios";
import { getToken, removeToken } from "../utils/token.js";
import { Message } from "element-ui";
import router from "../router/router.js";
axios.defaults.baseURL = "http://127.0.0.1/heimamm/public";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function(config) {
    config.headers.token = getToken();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    if (response.data.code === 0) {
      Message.error(response.data.message);
      removeToken();
      router.push("/login");
      return;
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export function login(data) {
  return axios({
    url: "/login",
    method: "post",
    data
  });
}

export function getsendsms(data) {
  return axios({
    url: '/sendsms',
    method: 'post',
    data
  });
}

export function register(data) {
  return axios({
    url: "/register",
    method: "post",
    data
  })
}

export function userInfo() {
  return axios({
    url: "/user/info",
    method: "get"
  })
}

export function token() {
  return axios({
    url: "/token",
    method: 'post'
  })
}

export function getSubjectList(params) {
  return axios({
    url: "/subject/list",
    method: 'get',
    params
  })
}

export function addSubject(data) {
  return axios({
    url: "/subject/add",
    method: 'post',
    data
  })
}

export function setSubjectStatus(data) {
  return axios({
    url: "/subject/status",
    method: 'post',
    data
  })
}

export function delSubject(data) {
  return axios({
    url: "/subject/remove",
    method: 'post',
    data
  })
}

export function editSubject(data) {
  return axios({
    url: "/subject/edit",
    method: 'post',
    data
  })
}