<template>
  <layout-default>
    <div class="page-management">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <template v-if="currentUserRole == 'admin'">
              <sidebar-admin></sidebar-admin>
            </template>
            <template v-else-if="currentUserRole == 'manager'">
              <sidebar-manager></sidebar-manager>
            </template>
          </div>
          <div class="page-content">
            <slot />
          </div>
          <div class="clear--both"></div>
        </div>
      </div>
    </div>
  </layout-default>
</template>

<script>
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import SidebarAdmin from '@/modules/admin/components/partials/SidebarAdmin';
  import SidebarManager from '@/modules/manager/components/partials/SidebarManager';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-admin': SidebarAdmin,
      'sidebar-manager': SidebarManager
    },
    name: 'LayoutManagement'
  }
</script>
