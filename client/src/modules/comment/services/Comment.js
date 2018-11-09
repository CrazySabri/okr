import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'
import Vue from 'vue'

import moment from 'moment'

export default function() {
  return {
    postComment(params) {

      params = {
        type: params.type,
        parentId: params.parentId,
        comment: params.comment,
        ownerId: params.ownerId,
        date_created: moment().format('YYYY/MM/DD HH:mm:ss')
      }


      return new Promise((resolve, reject) => {
        Vue.$api.post('/comment/create', params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchComments(type, parent_id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/comment/list/'+type+'/'+parent_id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(comment_listItem_headerProfile)
        })
      })
    }
  }
}
