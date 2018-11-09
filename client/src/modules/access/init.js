import Vue from 'vue'
import Routes from './routes'
import Store from './store'
import AccessMixins from './mixins/Access'
import AccessService from './services/Access'

export default {
  routes: Routes,
  mixins: {
    access: AccessMixins
  },
  stores: {
    access: Store
  },
  services: {
    access: new AccessService
  }
}
