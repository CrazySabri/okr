import Vue from 'vue'
import PageLogin from './components/PageLogin'
import PageSignup from './components/PageSignup'
import PageSignupInvite from './components/PageSignupInvite'
import PageLogout from './components/PageLogout'
import PageAccount from './components/PageAccount'
import PageRecoveryidentifier from './components/PageRecoveryidentifier'
import PageSetting from './components/PageSetting'
import PageSettingProfile from './components/PageSettingProfile'
import PageSettingPassword from './components/PageSettingPassword'

export default [
  {
    path: '/login',
    name: 'PageLogin',
    component: PageLogin,
    meta: {
      requireUnauth: true,
      module: 'account'
    },
  },
  {
    path: '/signup',
    name: 'PageSignup',
    component: PageSignup,
    meta: {
      requireUnauth: true,
      module: 'account'
    },
  },
  {
    path: '/recoveryidentifier',
    name: 'PageRecoveryidentifier',
    component: PageRecoveryidentifier,
    meta: {
      requireUnauth: true,
      module: 'account'
    },
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
    meta: {
      requireUnauth: true,
      module: 'account'
    },
  },
  {
    path: '/mypage/settings',
    name: 'PageSetting',
    component: PageSetting,
    meta: {
      requireUnauth: true,
      module: 'account'
    },
  },
  {
    path: '/mypage/settings/profile',
    name: 'PageSettingProfile',
    component: PageSettingProfile,
    meta: {
      requireUnauth: true,
      module: 'account'
    },
  },
  {
    path: '/mypage/settings/password',
    name: 'PageSettingPassword',
    component: PageSettingPassword,
    meta: {
      requireUnauth: true,
      module: 'account'
    },
  }
]
