import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'
import Vue from 'vue'

export default function() {
  return {
    fetchNews(company_id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/news/list/'+company_id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchOneNew(id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/news/get/'+id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    deleteNew(id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/news/delete/' + id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }
}
