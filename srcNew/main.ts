import 'devextreme/dist/css/dx.common.css'
import './themes/generated/theme.base.css'
import './themes/generated/theme.additional.css'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import appInfo from './app-info'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$appInfo = appInfo

// Vue.component('popup-loading', PopUp)

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
