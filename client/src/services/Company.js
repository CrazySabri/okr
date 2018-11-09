import Vue from 'vue'
import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'

export default function() {
  return {
    fetchCurrentCompany() {

      return new Promise((resolve, reject) => {

        let c_company_session = sessionStorage.getItem('c_company_session')
        if(c_company_session) {
          store.dispatch('setCurrentCompany', c_company_session)
          .then(() => {
            resolve(true)
          })
        } else if(store.state.account.loggedInUser) {

          console.log('store.state.account.loggedInUser._id', store.state.account)
          Vue.$api.get('/company/list/member_of/'+store.state.account.loggedInUser._id)
          .then((response) => {
            if(!response.data.err && response.data.length) {
              store.dispatch('setCurrentCompany', response.data[0])
              .then(() => {
                resolve(true)
              })
            }
          })
          .catch((err) => {
            resolve(true)
          });
        } else {
          resolve(true)
        }

      })

    }
  }
}
