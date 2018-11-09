import Vue from 'vue'
import CommentService from './services/Comment'

if(!('$service' in Vue)) {
  Vue.$service = {}
}

Vue.$service.comment = new CommentService

import CommentMixins from './mixins/Comment.js';
Vue.mixin(CommentMixins);

export default {};
