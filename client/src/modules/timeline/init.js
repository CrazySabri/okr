import Vue from 'vue'
import  Routes from './routes'
import Store from './store'

export default {
  routes: Routes,
  stores: {
    timeline: Store
  }
}
