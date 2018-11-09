<template>

  <layout-default>
    <div class="page-employees">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-organization></sidebar-organization>
          </div>
          <div class="page-content">
            <div class="page-title position--outside" id="tl">
              <h1>Timeline</h1>
            </div>

            <app-timeline></app-timeline>
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
  import AppTimeline from '@/components/partials/okr/AppTimeline';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-organization': SidebarOrganization,
      'app-timeline': AppTimeline
    }
  }
</script>
