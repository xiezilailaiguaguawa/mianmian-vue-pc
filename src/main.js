import Vue from 'vue'
import App from './App.vue'

// 导入router.js
import router from './router/router';
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
