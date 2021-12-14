import Vue from 'vue'
import App from './App.vue'
// 导入Element-ui
import ElementUI from 'element-ui';
// 导入Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入router.js
import router from './router/router';
// 导入axios
import axios from 'axios' ;

Vue.config.productionTip = false

// step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = axios

// step3：使每次请求都会带一个 /api 前缀 
axios.defaults.baseURL = '/api'
// 导入自己的全局样式
import './style/base.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
