// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './routes/index.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(Element)

Vue.config.silent = true // 取消 Vue 所有的日志与警告
/* eslint-disable no-new */
new Vue({
  router: router.router,
  store,
  el: '#app',
  render: h => h(App)
})
