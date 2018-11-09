import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

Vue.use(Router)

import Page404 from '@/components/errors/Page404'
import PageIndex from '@/components/pages/PageIndex'
import PageOrganization from '@/components/pages/PageOrganization'
import PageNews from '@/components/pages/PageNews'
import PageTimeline from '@/components/pages/PageTimeline'
import PageMissionVision from '@/components/pages/PageMissionVision'
import PageTeams from '@/components/pages/PageTeams'
import PageTeamDetail from '@/components/pages/PageTeamDetail'
import PageEmployees from '@/components/pages/PageEmployees'
import PageEmployeeDetail from '@/components/pages/PageEmployeeDetail'
import PageOkrDetail from '@/components/pages/PageOkrDetail'
import PageTimelinePost from '@/components/pages/PageTimelinePost';
import PageRapport from '@/components/pages/PageRapport';
import PageOkrTree from '@/components/pages/PageOkrTree';
import PageMyPage from '@/components/pages/PageMyPage'
import PageMyPageOkr from '@/components/pages/PageMyPageOkr'
import PageMyPageTimeline from '@/components/pages/PageMyPageTimeline'
import PageMyPageOkrBuild from '@/components/pages/PageMyPageOkrBuild'
import PageMyPageOkrBuildForm from '@/components/pages/PageMyPageOkrBuildForm'

import ModuleCommentRoutes from '@/modules/comment/routes';
import ModuleAccountRoutes from '@/modules/account/routes';
import ModuleAdminRoutes from '@/modules/admin/routes';

const router = new Router({
  mode: 'history',
  routes: [
    ...ModuleAccountRoutes,
    ...ModuleCommentRoutes,
    ...ModuleAdminRoutes,
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    {
      path: '/organization',
      name: 'PageOrganization',
      component: PageOrganization,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/organization/news',
      name: 'PageNews',
      component: PageNews,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/organization/missionvision',
      name: 'PageMissionVision',
      component: PageMissionVision,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/organization/timeline',
      name: 'PageTimeline',
      component: PageTimeline,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/teams',
      name: 'PageTeams',
      component: PageTeams,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/team/:id',
      name: 'PageTeamDetail',
      component: PageTeamDetail,
      beforeEnter: Vue.$service.auth.authRequired,
      props: true
    },
    {
      path: '/employees',
      name: 'PageEmployees',
      component: PageEmployees,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/employee/:id',
      name: 'PageEmployeeDetail',
      component: PageEmployeeDetail,
      props: true,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/okr/rapport/:id',
      name: 'PageRapport',
      component: PageRapport,
      props: true,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/okr/tree',
      name: 'PageOkrTree',
      component: PageOkrTree,
      props: true,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/okr/tree/:id',
      name: 'PageOkrTree',
      component: PageOkrTree,
      props: true,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/okr/:type/:id',
      name: 'PageOkrDetail',
      component: PageOkrDetail,
      props: true,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/timeline/post/:id',
      name: 'PageTimelinePost',
      component: PageTimelinePost,
      props: true,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/mypage',
      name: 'PageMyPage',
      component: PageMyPage,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/mypage/okr',
      name: 'PageMyPageOkr',
      component: PageMyPageOkr,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/mypage/okr/build/:id',
      name: 'PageMyPageOkrBuildForm',
      component: PageMyPageOkrBuildForm,
      props: true,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/mypage/okr/build',
      name: 'PageMyPageOkrBuild',
      component: PageMyPageOkrBuild,
      beforeEnter: Vue.$service.auth.authRequired
    },
    {
      path: '/mypage/timeline',
      name: 'PageMyPageTimeline',
      component: PageMyPageTimeline,
      beforeEnter: Vue.$service.auth.authRequired
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

  if(to.meta && to.meta.beforeEnter) {
    to.meta.beforeEnter()
  }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log()
  if(store.state.account) {
    Vue.$service.company.fetchCurrentCompany()
    .then(() => {
      next(true)
    })
  }
})
export default router
