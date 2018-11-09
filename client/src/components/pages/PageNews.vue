<template>

  <layout-default>
    <div class="page-news">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-organization></sidebar-organization>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>News</h1>
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
  import SidebarOrganization from '@/components/partials/common/SidebarOrganization';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-organization': SidebarOrganization,
    }
  }
</script>
