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
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('fetchCompanyTeams', this.$store.getters.currentCompanyId)
    },
    computed: {
      teams() {
        return this.$store.state.company.companyTeams
      }
    }
  }
</script>
