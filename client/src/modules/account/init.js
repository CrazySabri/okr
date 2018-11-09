import Vue from 'vue'
import Routes from './routes'
import Store from './store'
import AuthService from './services/Auth'
import AccountService from './services/Account'
import AccountMixins from './mixins/Account'

export default {
  routes: Routes,
  mixins: {
    account: AccountMixins
  },
  services: {
    auth: new AuthService,
    account: new AccountService
  },
  stores: {
    account: Store
  }
}
