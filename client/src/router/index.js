import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Page404 from '@/components/errors/Page404'
import PageIndex from '@/components/pages/PageIndex'
import PageHelp from '@/components/pages/PageHelp'
import PageTerms from '@/components/pages/PageTerms'
import PagePrivacy from '@/components/pages/PagePrivacy'
import PageContact from '@/components/pages/PageContact'
import PageOrganization from '@/components/pages/PageOrganization'
import PageNews from '@/components/pages/PageNews'
import PageMissionVision from '@/components/pages/PageMissionVision'
import PageTeams from '@/modules/team/components/PageTeams'
import PageTeamDetail from '@/modules/team/components/PageTeamDetail'
import PageEmployees from '@/components/pages/PageEmployees'
import PageEmployeeDetail from '@/components/pages/PageEmployeeDetail'
import PageOkrDetail from '@/components/pages/PageOkrDetail'
import PageRapport from '@/components/pages/PageRapport'
import PageOkrTree from '@/components/pages/PageOkrTree'
import PageMyPage from '@/components/pages/PageMyPage'
import PageMyPageOkr from '@/components/pages/PageMyPageOkr'
import PageMyPageOkrBuild from '@/components/pages/PageMyPageOkrBuild'
import PageMyPageOkrBuildForm from '@/components/pages/PageMyPageOkrBuildForm'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    {
      path: '/help',
      name: 'PageHelp',
      component: PageHelp,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/terms',
      name: 'PageTeams',
      component: PageTerms,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/privacy',
      name: 'PagePrivacy',
      component: PagePrivacy,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/contact',
      name: 'PageContact',
      component: PageContact,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/organization',
      name: 'PageOrganization',
      component: PageOrganization,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/organization/news',
      name: 'PageNews',
      component: PageNews,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/organization/missionvision',
      name: 'PageMissionVision',
      component: PageMissionVision,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/teams',
      name: 'PageTeams',
      component: PageTeams,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/team/:id',
      name: 'PageTeamDetail',
      component: PageTeamDetail,
      meta: {
        requireAuth: true
      },
      props: true
    },
    {
      path: '/employees',
      name: 'PageEmployees',
      component: PageEmployees,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/employee/:id',
      name: 'PageEmployeeDetail',
      component: PageEmployeeDetail,
      props: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/okr/rapport/:id',
      name: 'PageRapport',
      component: PageRapport,
      props: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/okr/tree',
      name: 'PageOkrTree',
      component: PageOkrTree,
      props: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/okr/tree/:id',
      name: 'PageOkrTree',
      component: PageOkrTree,
      props: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/okr/:type/:id',
      name: 'PageOkrDetail',
      component: PageOkrDetail,
      props: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mypage',
      name: 'PageMyPage',
      component: PageMyPage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mypage/okr',
      name: 'PageMyPageOkr',
      component: PageMyPageOkr,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mypage/okr/build/:id',
      name: 'PageMyPageOkrBuildForm',
      component: PageMyPageOkrBuildForm,
      props: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mypage/okr/build',
      name: 'PageMyPageOkrBuild',
      component: PageMyPageOkrBuild,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 0 }
      }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if(to.meta) {
    if(to.meta.beforeEnter) {
      to.meta.beforeEnter(to, from, next)
    }

    if(to.meta.module == 'admin') {
      Vue.$service.admin.adminRequired(to, from, next)
    } else {
      if(to.meta.requireUnauth === true) {
        Vue.$service.auth.unauthRequired(to, from, next)
      }
      else if(to.meta.requireAuth === true) {
        Vue.$service.auth.authRequired(to, from, next)
      } else {
        next()
      }
    }
  }
})

router.beforeResolve((to, from, next) => {
  if(to.name == 'PageLogin') {
    next(true)
    return;
  }
  if(store.state.account && store.state.account.loggedInUser) {
    Vue.$service.company.fetchCompanyByCode(store.state.account.loggedInUser.company.code)
    .then((data) => {
      store.dispatch('setCurrentCompany', data)
      next(true)
    })
    .catch(() => {
      next({
        path: '/login'
      })
    })
  } else {
    next(true)
  }
})
export default router
