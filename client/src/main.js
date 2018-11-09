// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

import './modules'

import App from './App'
import router from './router'
import store from './store'
import api from './api'

Vue.config.productionTip = false
Vue.$api = api

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import OkrMixins from '@/mixins/Okr'
Vue.mixin(OkrMixins)

import UtilMixins from '@/mixins/Util'
Vue.mixin(UtilMixins)

Vue.use(VueProgressBar, {
  color: '#04538e',
  failedColor: '#ff3d55',
  height: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 800
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
