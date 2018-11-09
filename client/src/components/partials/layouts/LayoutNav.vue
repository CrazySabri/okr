<template>
  <div class="app-nav">
    <div class="page--inner">

      <ul class="float--right">
        <template v-if="role == 'manager'">
          <li><router-link to="/manager/team">Management</router-link></li>
        </template>
        <template v-if="role == 'admin'">
          <li><router-link to="/admin/team">Admin</router-link></li>
        </template>
      </ul>

      <ul class="float--left">
        <li><router-link to="/mypage">My Page</router-link></li>
        <li><router-link to="/employees">Employees</router-link></li>
        <li><router-link to="/teams">Teams</router-link></li>
        <li><router-link to="/organization">Organization</router-link></li>
        <li><router-link to="/okr/tree">Okr tree</router-link></li>
      </ul>
      <div class="clear--both"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LayoutHeaderNav',
    computed: {
      role() {
        return this.$store.getters.getLoggedInAccountRole
      },
      loggedInUser() {
        return this.$store.getters.loggedInUser
      },
      hasTeamHasManager() {
        return false
      }
    }
  }
</script>
