import Vue from 'vue'

import PageAdminTeam from './components/team/PageAdminTeam';
import PageAdminTeamCreate from './components/team/PageAdminTeamCreate';
import PageAdminAccount from '@/modules/account/components/admin/PageAdminAccount';
import PageAdminAccountCreate from '@/modules/account/components/admin/PageAdminAccountCreate';
import PageAdminVisionMissions from '@/modules/admin/components/organization/PageAdminVisionMissions';

export default [
  {
    path: '/admin/team',
    name: 'PageAdminTeam',
    component: PageAdminTeam,
    beforeEnter: Vue.$service.admin.adminRequired
  },
  {
    path: '/admin/team/create',
    name: 'PageAdminTeamCreate',
    component: PageAdminTeamCreate,
    beforeEnter: Vue.$service.admin.adminRequired
  },
  {
    path: '/admin/account',
    name: 'PageAdminAccount',
    component: PageAdminAccount,
    beforeEnter: Vue.$service.admin.adminRequired
  },
  {
    path: '/admin/account/create',
    name: 'PageAdminAccountCreate',
    component: PageAdminAccountCreate,
    beforeEnter: Vue.$service.admin.adminRequired
  },
  {
    path: '/admin/organization/missionvision',
    name: 'PageAdminVisionMissions',
    component: PageAdminVisionMissions,
    beforeEnter: Vue.$service.admin.adminRequired
  }
]
