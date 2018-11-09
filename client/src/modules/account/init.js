import Vue from 'vue'
import AuthService from './services/Auth'
import AccountService from './services/Account'

if(!('$service' in Vue)) {
  Vue.$service = {}
}

Vue.$service.auth = new AuthService
Vue.$service.account = new AccountService

import AccountMixins from './mixins/Account.js';
Vue.mixin(AccountMixins);

export default {}
