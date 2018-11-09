<template>

  <layout-management>
    <div class="content-container wrap--content border--curved">
      <div class="float--right">
        <router-link to="/admin/team/create" class="btn btn-primary">Create a team</router-link>
      </div>
      <div class="page-title">
        <h1>Teams</h1>
      </div>
    </div>
    <div class="content-container wrap--content border--curved">

      <template v-if="!teams || !teams.length">
        <div class="content-nodata">
          <p>There is no team</p>
        </div>
      </template>
      <template v-else>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team, index) in teams">
              <th scope="row">{{ index+1 }}</th>
              <td><router-link :to="'/admin/team/'+team._id">{{ team.name }}</router-link></td>
              <td>{{ team.members.length }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </layout-management>

</template>

<script>
  import Vue from 'vue'
  import LayoutManagement from '@/components/layouts/LayoutManagement';

  export default {
    components: {
      'layout-management': LayoutManagement
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
