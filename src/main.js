import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入iconfont
import './assets/fonts/iconfont.css'
// 引入css reset
import './assets/css/base.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
