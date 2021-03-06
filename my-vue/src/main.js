// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import echarts from 'echarts'
import 'mint-ui/lib/style.css'
import './assets/css/my-mint.css'

Vue.use(Mint)

Vue.use(VueResource)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
