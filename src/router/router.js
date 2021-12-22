import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入Element-ui的弹框
import { Message } from "element-ui";

// 导入 获取token的方法
import { getToken,removeToken } from "../utils/token.js";

// 导入 获取用户信息的逻辑
import { userInfo } from "../api/api.js";

// 导入 仓库
import store from "../store/store.js";
// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);
import login from '../views/login/login.vue'
import index from "../views/component/index.vue"
import subject from "../views/component/subject.vue"
import dataRecord from "../views/component/dataRecord.vue"
import userList from "../views/component/userList.vue"
import questionList from "../views/component/questionList.vue"
import enterprise from "../views/component/enterprise.vue"
import error from "../views/component/error.vue"
const routes = [
  { path: '/', redirect: 'login' },
  {
    path: "/login",
    component: login
  },
  {
    path: "/index",
    component: index,
    redirect: '/index/dataRecord',
    meta: {
      roles: ['管理员', '老师', '学生']
    },
    children: [
      {
        path: "subject",
        component: subject,
        meta: {
          roles: ['管理员']
        },
      },
      {
        path: "dataRecord",
        component: dataRecord,
        meta: {
          roles: ['管理员', '老师', '学生']
        },
      },
      {
        path: "userList",
        component: userList,
        meta: {
          roles: ['管理员']
        },
      },
      {
        path: "questionList",
        component: questionList,
        meta: {
          roles: ['管理员', '老师', '学生']
        },
      },
      {
        path: "enterprise",
        component: enterprise,
        meta: {
          roles: ['管理员']
        },
      },
    ]
  },
  {
    path: '/error',
    component: error
  },
]

const router = new VueRouter({
  routes
})
const whitePaths = ["/login"];
// 导航守卫
router.beforeEach((to, from, next) => {
  if (whitePaths.includes(to.path) === true) {
    return next();
  }
  if (to.matched.length === 0 ) {
    if (getToken()) {
      return userInfo().then(res => {
        store.commit("CHANGEINFO", res.data.data);
        next('/error')
      });
    }
  }
  if(to.matched[0].path==='/error') {
    if (getToken()) {
      return userInfo().then(res => {
        store.commit("CHANGEINFO", res.data.data);
        next();
      });
    }
  }
  if (getToken()) {
    // 存在
    // 调用接口验证对错 异步操作
    return userInfo().then(res => {
      store.commit("CHANGEINFO", res.data.data);
      if (res.data.data.status === 0) {
        Message.warning("请等待管理员启用你！！");
        return next("/login");
      }
      if (res.data.code === 0 ) {
        Message.error(res.data.message);
        removeToken();
        router.push("/login");
        return;
      }
      if (to.meta.roles.indexOf(res.data.data.role) == -1) {
        Message.warning("你不允许访问这个页面");
        return next(false);
      }
      // 放走
      next();
    });
  }
  Message("请先登录");
  next("/login");
});
export default router;
