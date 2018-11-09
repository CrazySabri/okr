import Vue from 'vue'
import Routes from './routes'
import Store from './store'
import OkrService from './services/Okr'
import OkrMixins from './mixins/Okr.js';

export default {
  routes: Routes,
  mixin: {
    okr: OkrMixins
  },
  services: {
    okr: new OkrService
  },
  stores: {
    okr: Store
  }
}
