// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

if(!('$service' in Vue)) {
  Vue.$service = {}
}
import CompanyService from './services/Company'
Vue.$service.company = new CompanyService

import './modules'
import App from './App'
import router from './router'
import store from './store'
import api from './api'

Vue.config.productionTip = false
Vue.$api = api

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import OkrMixins from '@/mixins/Okr';
Vue.mixin(OkrMixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
