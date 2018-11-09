import Vue from 'vue'
import Store from './store'
import NewsService from './services/News'

export default {
  services: {
    news: new NewsService
  },
  stores: {
    news: Store
  }
}
