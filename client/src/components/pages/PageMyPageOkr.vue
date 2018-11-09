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
                <h1>My Okr</h1>
              </div>
            </div>


            <template v-if="!okrList || !okrList.length">
              <div class="content-nodata">
                <p>There is no OKR</p>
              </div>
            </template>
            <template v-else>
              <okr-grid :list="okrList" type="personal" filter="all"></okr-grid>
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

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-mypage': SidebarMyPage,
      'okr-grid': OkrGridList,
    },
    mounted() {
      this.$store.dispatch('fetchOkrOwnerOf', this.$store.getters.getLoggedInAccountId)
    },
    computed: {
      okrList() {
        return this.$store.state.okr.okrOwnerOf
      },
      currentUser() {
        return {
          id: 1,
          firstname: 'Firstname',
          lastname: 'Lastname',
          position: 'Engineer',
          team: {
            name: 'Team name'
          }
        }
      }
    }
  }
</script>
