import Vue from 'vue'

import PageAdminTeam from '@/modules/team/components/admin/PageAdminTeam';
import PageAdminTeamDetail from '@/modules/team/components/admin/PageAdminTeamDetail';
import PageAdminTeamCreate from '@/modules/team/components/admin/PageAdminTeamCreate';
import PageAdminAccount from '@/modules/account/components/admin/PageAdminAccount';
import PageAdminAccountCreate from '@/modules/account/components/admin/PageAdminAccountCreate';
import PageAdminVisionMissions from '@/modules/admin/components/organization/PageAdminVisionMissions';

import PageAdminTeamMemberOkr from '@/modules/okr/components/admin/PageAdminTeamMemberOkr';
import PageAdminTeamMemberOkrNewRequest from '@/modules/okr/components/admin/PageAdminTeamMemberOkrNewRequest';
import PageAdminNews from '@/modules/news/components/admin/PageAdminNews';
import PageAdminNewsCreate from '@/modules/news/components/admin/PageAdminNewsCreate';
import PageAdminNewsEdit from '@/modules/news/components/admin/PageAdminNewsEdit';
import PageAdminOkrList from '@/modules/okr/components/admin/PageAdminOkrList';
import PageAdminOkrBuildForm from '@/modules/okr/components/admin/PageAdminOkrBuildForm';
import PageAdminOkrPreconfirm from '@/modules/okr/components/admin/PageAdminOkrPreconfirm';

export default [
  {
    path: '/admin/team/create/:team_id',
    name: 'PageAdminTeamCreate',
    component: PageAdminTeamCreate,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/team/create',
    name: 'PageAdminTeamCreate',
    component: PageAdminTeamCreate,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
  },
  {
    path: '/admin/team/:id',
    name: 'PageAdminTeamDetail',
    component: PageAdminTeamDetail,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/team',
    name: 'PageAdminTeam',
    component: PageAdminTeam,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
  },
  {
    path: '/admin/account',
    name: 'PageAdminAccount',
    component: PageAdminAccount,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
  },
  {
    path: '/admin/account/create',
    name: 'PageAdminAccountCreate',
    component: PageAdminAccountCreate,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
  },
  {
    path: '/admin/organization/missionvision',
    name: 'PageAdminVisionMissions',
    component: PageAdminVisionMissions,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
  },
  {
    path: '/admin/okr/member/:user_id/team/:team_id/',
    name: 'PageAdminTeamMemberOkr',
    component: PageAdminTeamMemberOkr,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/member/:user_id/team/:team_id/newrequest',
    name: 'PageAdminTeamMemberOkrNewRequest',
    component: PageAdminTeamMemberOkrNewRequest,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/member/:user_id',
    name: 'PageAdminTeamMemberOkr',
    component: PageAdminTeamMemberOkr,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/member/:user_id/newrequest',
    name: 'PageAdminTeamMemberOkrNewRequest',
    component: PageAdminTeamMemberOkrNewRequest,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props:true
  },
  {
    path: '/admin/news',
    name: 'PageAdminNews',
    component: PageAdminNews,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
  },
  {
    path: '/admin/news/create',
    name: 'PageAdminNewsCreate',
    component: PageAdminNewsCreate,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
  },
  {
    path: '/admin/news/edit/:id',
    name: 'PageAdminNewsEdit',
    component: PageAdminNewsEdit,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/company/list',
    name: 'PageAdminOkrList',
    component: PageAdminOkrList,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/preconfirm/:type/:id',
    name: 'PageAdminOkrPreconfirm',
    component: PageAdminOkrPreconfirm,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/build/:type/id/:team_id/:id',
    name: 'PageAdminOkrBuildForm',
    component: PageAdminOkrBuildForm,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/build/:type/id/:team_id',
    name: 'PageAdminOkrBuildForm',
    component: PageAdminOkrBuildForm,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/build/:type',
    name: 'PageAdminOkrBuildForm',
    component: PageAdminOkrBuildForm,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  },
  {
    path: '/admin/okr/build/:type/:id',
    name: 'PageAdminOkrBuildForm',
    component: PageAdminOkrBuildForm,
    meta: {
     requireAuth: true,
     module: 'admin'
   },
    props: true
  }
]
