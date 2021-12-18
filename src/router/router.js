// 导入vue-router
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
// 导入 登录页面组件
import login from '../views/login/login.vue'
// 导入 首页组件
import index from '../views/index/index.vue'
// 嵌套路由的组件导入
import subject from '../views/index/subject/subject.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import dataRecord from '../views/index/dataRecord/dataRecord.vue'
import userList from '../views/index/userList/userList.vue'
import questionList from '../views/index/questionList/questionList.vue'
// use
Vue.use(VueRouter)
// 规则
const routes = [
    {
        // 登录组件规则
        path: "/login",
        component: login
    },
    {
        // 首页组件规则
        path: "/index",
        component: index,
        // 嵌套路由
        children :[
            {
            path: "subject", // 匹配的是/index/subject
            component: subject
        },
            {
            path: "enterprise", // 匹配的是/index/subject
            component: enterprise
        },
            {
            path: "dataRecord", // 匹配的是/index/dataRecord
            component: dataRecord
        },
            {
            path: "userList", // 匹配的是/index/userList
            component: userList
        },
            {
            path: "questionList", // 匹配的是/index/questionList
            component: questionList
        }
    ]
        
    }
]

// 创建路由实例
const router = new VueRouter({
    routes
})
// 挂载vue实例上
// 暴露出去
// shugf
// 类似于 moudle.exports = router
export default router;
