<template>
  <div class="app-nav">
    <div class="page--inner">

      <template v-if="loggedInUser.role == 'admin'">
        <ul class="float--right">
          <li><router-link to="/admin/team">Admin</router-link></li>
        </ul>
      </template>
      <template v-else-if="loggedInUser.role == 'manager'">
        <ul class="float--right">
          <li><router-link to="/admin/team">Management</router-link></li>
        </ul>
      </template>

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
      loggedInUser() {
        return this.$store.state.account.loggedInUser
      }
    }
  }
</script>
