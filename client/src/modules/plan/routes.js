import Vue from 'vue'

import PagePlanList from './components/PagePlanList.vue'
import PagePlanDetail from './components/PagePlanDetail.vue'
import PagePlanConfirm from './components/PagePlanConfirm.vue'

export default [
    {
        path: '/plan',
        name: 'PagePlanList',
        component: PagePlanList,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/plan/:id',
        name: 'PagePlanDetail',
        component: PagePlanDetail,
        props: true,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/plan/confirm/:id',
        name: 'PagePlanConfirm',
        component: PagePlanConfirm,
        props: true,
        meta: {
            requireAuth: true
        }
    }
]
