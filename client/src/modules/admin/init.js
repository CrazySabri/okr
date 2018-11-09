import Vue from 'vue'
import Routes from './routes'
import Store from './store'
import AdminService from './services/Admin'
import AdminMixins from './mixins/Admin';

export default {
  routes: Routes,
  mixins: {
    admin: AdminMixins
  },
  services: {
    admin: new AdminService
  },
  stores: {
    admin: Store
  }
}
