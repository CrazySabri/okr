<template>
  <div class="sidebar-okrs">
    <template v-if="type == 'team'">
      <sidebar-employees></sidebar-employees>
    </template>
    <template v-else-if="type == 'group'">
      <sidebar-teams></sidebar-teams>
    </template>
    <template v-else-if="type == 'personal'">
      <sidebar-personal :user_id="okr.ownerId"></sidebar-personal>
    </template>
  </div>
</template>

<script>
  import SidebarTeams from '@/components/partials/common/SidebarTeams';
  import SidebarEmployees from '@/components/partials/common/SidebarEmployees';
  import SidebarPersonal from '@/components/partials/common/SidebarPersonal';

  export default {
    components: {
      'sidebar-teams': SidebarTeams,
      'sidebar-employees': SidebarEmployees,
      'sidebar-personal': SidebarPersonal
    },
    props: {
      okr: {
        type: Object,
        required: true
      }
    },
    computed: {
      type() {
        return this.okr.type
      }
    }
  }
</script>
