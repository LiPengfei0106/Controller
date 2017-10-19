// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import api from '@/api'
import VueLazyload from 'vue-lazyload'
import './assets/css/common.css'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad:1.2
})

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  // api,
  template: '<App/>',
  components: { App }
})