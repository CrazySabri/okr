import Vue from 'vue'
import AdminService from './services/Admin'

if(!('$service' in Vue)) {
  Vue.$service = {}
}

Vue.$service.admin = new AdminService

import AdminMixins from './mixins/Admin.js';
Vue.mixin(AdminMixins);

export default {};
