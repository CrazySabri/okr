import Vue from 'vue'

import PageTimeline from './components/PageTimeline'
import PageTimelinePost from './components/PageTimelinePost'
import PageMyPageTimeline from './components/PageMyPageTimeline'

export default [
    {
        path: '/organization/timeline',
        name: 'PageTimeline',
        component: PageTimeline,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/timeline/post/:id',
        name: 'PageTimelinePost',
        component: PageTimelinePost,
        props: true,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/mypage/timeline',
        name: 'PageMyPageTimeline',
        component: PageMyPageTimeline,
        meta: {
          requireAuth: true
        }
      },
]