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
                <h1>My Page</h1>
              </div>
            </div>
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

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-mypage': SidebarMyPage
    }
  }
</script>
