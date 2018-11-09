import Vue from 'vue'

import PageOkrRapportCreate from './components/rapport/PageOkrRapportCreate'

export default [
  {
    path: '/okr/:type/:id/rapport/create',
    name: 'PageOkrRapportCreate',
    component: PageOkrRapportCreate,
    meta: {
     requireUnauth: true,
     module: 'okr'
   },
    props: true
  }
]
