import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'


export default function() {
  return {
    adminRequired (to, from, next) {
      store.dispatch('isLoggedIn')
      .then(() => {
        let loggedInUserRole = store.getters.getLoggedInAccountRole
        let check = loggedInUserRole === 'admin'

        next(check ? true : {
          path: '/mypage'
        })
      })
    }
  }
}
