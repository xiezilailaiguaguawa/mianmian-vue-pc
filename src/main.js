import Vue from 'vue'
import App from './App.vue'
// 导入Element-ui
import ElementUI from 'element-ui';
// 导入Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入router.js
import router from './router/router';
// 导入自己的全局样式
import './style/base.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
