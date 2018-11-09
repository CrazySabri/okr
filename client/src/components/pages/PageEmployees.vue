<template>

  <layout-default>
    <div class="page-employees">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-employees></sidebar-employees>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>Employees</h1>
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
  import SidebarEmployees from '@/components/partials/common/SidebarEmployees';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-employees': SidebarEmployees
    }
  }
</script>
