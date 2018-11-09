import Vue from 'vue'
import Store from './store'
import CompanyService from './services/Company'

export default {
  services: {
    company: new CompanyService
  },
  stores: {
    company: Store
  }
}
