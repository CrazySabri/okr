<template>

  <layout-default>
    <div class="page-organization">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-mypage></sidebar-mypage>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>Build Okr</h1>
              </div>
            </div>


            <template v-if="!okrRequest || !okrRequest.length">
              <div class="content-nodata">
                <p>There is no request</p>
              </div>
            </template>
            <template v-else>
              <div class="okr-request_list content-container background--transparent">
                <div class="okr-request_listItem"  v-for="okr in okrRequest">
                  <router-link :to="'/mypage/okr/build/'+okr._id" class="link--absolute"></router-link>
                  <okr-build-item :okr="okr"></okr-build-item>
                </div>
              </div>
            </template>
          </div>
          <div class="clear--both"></div>
        </div>
      </div>
    </div>
  </layout-default>

</template>

<script>
  import Vue from 'vue'
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import SidebarMyPage from '@/components/partials/common/SidebarMyPage';
  import OkrGridList from '@/components/partials/okr/GridList';
  import buildItem from '@/components/partials/okr/buildItem';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-mypage': SidebarMyPage,
      'okr-build-item': buildItem

    },
    mounted() {
      Vue.$service.okr.fetchPersonalOkr(this.currentUserId)
      .then((data) => {
        this.$store.dispatch('fetchPersonalOkr', data)
      })
    },
    computed: {
      okrRequest() {
        return this.$store.state.okr.personalList.filter((x) => {
          return x.status === 'request'
        })
      },
    }
  }
</script>
