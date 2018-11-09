import Vue from 'vue'
import PageLogin from './components/PageLogin'
import PageSignup from './components/PageSignup'
import PageSignupInvite from './components/PageSignupInvite'
import PageLogout from './components/PageLogout'
import PageAccount from './components/PageAccount'
import PageRecoveryidentifier from './components/PageRecoveryidentifier'

export default [
  {
    path: '/login',
    name: 'PageLogin',
    component: PageLogin,
    beforeEnter: Vue.$service.auth.unauthRequired
  },
  {
    path: '/signup',
    name: 'PageSignup',
    component: PageSignup,
    beforeEnter: Vue.$service.auth.unauthRequired
  },
  {
    path: '/signup/invite/:id',
    name: 'PageSignupInvite',
    component: PageSignupInvite,
    beforeEnter: Vue.$service.auth.unauthRequired
  },
  {
    path: '/recoveryidentifier',
    name: 'PageRecoveryidentifier',
    component: PageRecoveryidentifier,
    beforeEnter: Vue.$service.auth.unauthRequired
  },
  {
    path: '/logout',
    name: 'PageLogout',
    component: PageLogout
  },
  {
    path: '/account',
    name: 'PageAccount',
    component: PageAccount,
    beforeEnter: Vue.$service.auth.authRequired
  }
]
