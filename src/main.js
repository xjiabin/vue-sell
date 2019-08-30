import Vue from 'vue'
import router from './routers/router.js'
import store from './store/store'
import App from './App.vue'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
