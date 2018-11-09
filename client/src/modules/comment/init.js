import Vue from 'vue'
import Routes from './routes'
import Store from './store'
import CommentService from './services/Comment'
import CommentMixins from './mixins/Comment'

export default {
  routes: Routes,
  services: {
    comment: new CommentService
  },
  stores: {
    comment: Store
  }
}
