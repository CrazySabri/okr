import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'


export default function() {
  return {
    managerRequired (to, from, next) {
      let check = false

      store.dispatch('isLoggedIn')
      .then(() => {
        let loggedInUserRole = store.getters.getLoggedInAccountRole
        let check = loggedInUserRole === 'manager'

        next(check ? true : {
          path: '/mypage'
        })
      })
    }
  }
}
