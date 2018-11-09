import Vue from 'vue';
import Router from './router/';
import Store from './store';
import accessInit from '@/modules/access/init.js';
import commentInit from '@/modules/comment/init.js'
import accountInit from '@/modules/account/init.js';
import adminInit from '@/modules/admin/init.js';
import managerInit from '@/modules/manager/init.js';
import teamInit from '@/modules/team/init.js';
import okrInit from '@/modules/okr/init.js';
import newsInit from '@/modules/news/init.js';
import notificationInit from '@/modules/notification/init.js';
import timelineInit from '@/modules/timeline/init.js';
import companyInit from '@/modules/company/init.js';
import planInit from '@/modules/plan/init.js';

let modules = [
  accessInit,
  commentInit,
  accountInit,
  adminInit,
  managerInit,
  teamInit,
  okrInit,
  newsInit,
  notificationInit,
  timelineInit,
  companyInit,
  planInit
]

Vue.$service = {}
Vue.$module = {
  access: true,
  comment: true,
  account: true,
  admin: true,
  manager: true,
  team: true,
  okr: true,
  news: true,
  notification: true,
  timeline: true,
  company: true,
  plan: true
}

modules.map((module) => {
  if(!module) return;

  if('mixins' in module) {
    for(var key in module.mixins) {
      let mixin = module.mixins[key]
      Vue.mixin(mixin)
    }
  }

  if('services' in module) {
    for(var key in module.services) {
      let service = module.services[key]
      Vue.$service[key] = service
    }
  }

  if('routes' in module) {
    Router.addRoutes(module.routes)
  }
  if('stores' in module) {
    for(var key in module.stores) {
      let store = module.stores[key]
      Store.registerModule(key, store)
    }
  }
})
