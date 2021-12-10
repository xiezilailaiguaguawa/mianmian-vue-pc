// 导入vue-router
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
// 导入 登录页面组件
import login from '../views/login/login.vue'
// use
Vue.use(VueRouter)
// 规则
const routes = [{
    // 登录组件规则
    Path:"/login",
    component:login
}]

// 创建路由实例
const router = new VueRouter({
    routes
})
// 挂载vue实例上
// 暴露出去
// shugf
// 类似于 moudle.exports = router
export default router;
