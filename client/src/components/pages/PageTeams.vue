<template>

  <layout-default>
    <div class="page-teams">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-teams></sidebar-teams>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>Teams</h1>
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
  import SidebarTeams from '@/components/partials/common/SidebarTeams';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-teams': SidebarTeams
    }
  }
</script>
