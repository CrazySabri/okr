import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'
import Vue from 'vue'

export default function() {
  return {
    signup(params) {
      return Vue.$api.post('/account/create', {
        email: params.email,
        password: params.password,
        firstname: params.firstname,
        lastname: params.lastname
      })
    },
    getAccountListByCompanyId() {
      return;
      return new Promise((resolve, reject) => {
        Vue.$api.get('/account/list')
        .then((response) => {
          store.dispatch('fetchAccounts', response.data.list)
          resolve()
        })
        .catch((err) => {
          reject()
        })
      })
    }
  }
}
