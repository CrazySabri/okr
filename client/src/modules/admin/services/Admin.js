import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'


export default function() {
  return {
    adminRequired (to, from, next) {
      let check = false

      store.dispatch('isLoggedIn')
      .then(() => {
        let loggedInUser = store.state.account.loggedInUser
        let check = false

        if(loggedInUser) {
          check = loggedInUser.role === 'admin'
        }
        next(check ? true : {
          path: '/mypage'
        })
      })
    }
  }
}
