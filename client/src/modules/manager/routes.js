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

export default [
  {
    path: '/manager/team/:id',
    name: 'PageManagerTeamDetail',
    component: PageAdminTeamDetail,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
    props: true
  },
  {
    path: '/manager/team',
    name: 'PageManagerTeam',
    component: PageAdminTeam,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
  },
  {
    path: '/manager/okr/member/:user_id/team/:team_id/',
    name: 'PageManagerTeamMemberOkr',
    component: PageAdminTeamMemberOkr,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
    props: true
  },
  {
    path: '/manager/okr/member/:user_id/team/:team_id/newrequest',
    name: 'PageManagerTeamMemberOkrNewRequest',
    component: PageAdminTeamMemberOkrNewRequest,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
    props: true
  },
  {
    path: '/manager/okr/member/:user_id',
    name: 'PageManagerTeamMemberOkr',
    component: PageAdminTeamMemberOkr,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
    props: true
  },
  {
    path: '/manager/okr/member/:user_id/newrequest',
    name: 'PageManagerTeamMemberOkrNewRequest',
    component: PageAdminTeamMemberOkrNewRequest,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
    props:true
  },
  {
    path: '/manager/okr/team/:team_id/list',
    name: 'PageAdminOkrList',
    component: PageAdminOkrList,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
    props: true
  },
  {
    path: '/manager/okr/team/:team_id/build/:id',
    name: 'PageAdminOkrBuildForm',
    component: PageAdminOkrBuildForm,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
    props: true
  },
  {
    path: '/manager/okr/team/:team_id/build',
    name: 'PageManagerCompanyOkrBuildForm',
    component: PageAdminOkrBuildForm,
    meta: {
     requireUnauth: true,
     module: 'manager'
   },
  }
]
