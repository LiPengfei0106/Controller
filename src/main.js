// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import api from '@/api'
import VueLazyload from 'vue-lazyload'
import './assets/css/common.css'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
// import {Search} from 'vue-ydui/dist/lib.rem/search';
// import {BackTop} from 'vue-ydui/dist/lib.rem/backtop';
// Vue.component(BackTop.name, BackTop);
// Vue.component(Search.name, Search);

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad:1.2
})
Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading,
};

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  // api,
  template: '<App/>',
  components: { App }
})