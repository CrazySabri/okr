import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'


export default function() {
  return {
    login(params) {
      let persistant = params.persistant || false
      let account = params.account
      if(persistant) {
        cookies.set('c_account', account, "3y")
      }
      sessionStorage.setItem('c_account_session', JSON.stringify(account))

      return store.dispatch('login', account)
    },
    logout() {
      sessionStorage.removeItem("c_account_session");
      cookies.remove('c_account')
      return store.dispatch('logout')
    },
    unauthRequired (to, from, next) {
      store.dispatch('isLoggedIn')
      .then(() => {
        let check = store.state.account.isLoggedIn
        next(!check ? true : {
          path: '/mypage'
        })
      })
    },
    authRequired (to, from, next) {
      store.dispatch('isLoggedIn')
      .then(() => {
        let check = store.state.account.isLoggedIn

        next(check ? true : {
          path: '/login',
          query: {
            redirect: to.name
          }
        })
      })
    }
  }
}
