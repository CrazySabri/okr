import Vue from 'vue'
import Routes from './routes'
import Store from './store'
import ManagerService from './services/Manager'
import ManagerMixins from './mixins/Manager'

export default {
  routes: Routes,
  mixins: {
    manager: ManagerMixins
  },
  services: {
    manager: ManagerService
  },
  stores: {
    manager: Store
  }
}
