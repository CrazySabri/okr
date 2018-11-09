<template>
  <div class="sidebar-teams">
    <div v-if="teams && teams.length" class="sidebar-teamList">
      <ul>
        <li v-for="team in teams">
          <router-link :to="'/team/'+team._id">
            <span class="avatar-user size--sidebar">
              <img src="/static/img/dummy-team-avatar.png" />
            </span>
            <p>
              <span>{{ team.name }}</span>
              <span class="text--position" v-if="team.group">{{ team.group }}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else class="content-nodata">
      <p>There is no team</p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
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
