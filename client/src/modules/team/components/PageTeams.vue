<template>

  <layout-default>
    <div class="page-teams">

      <div class="page--inner">
        <div v-if="!teams || !teams.length" class="content-nodata">
          <p>There is no team</p>
        </div>
        <template v-else>
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
        </template>
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
    },
    mounted() {
      Vue.$service.team.fetchTeams(this.$store.getters.currentCompanyId)
      .then((data) => {
        this.$store.dispatch('fetchTeams', data)
      })
    },
    computed: {
      teams() {
        return this.$store.state.team.list
      }
    }
  }
</script>
