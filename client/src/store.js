import Vue from 'vue';
import Vuex from 'vuex';
import cookies from '@/cookies'

Vue.use(Vuex);

import account from '@/modules/account/store';
import okr from './store/okr';
import company from './store/company';

export default new Vuex.Store({
  modules: {
    account: account,
    company: company,
    okr: okr
  },
  state: {},
  getters: {},
  actions: {},
  mutations:{}
})
