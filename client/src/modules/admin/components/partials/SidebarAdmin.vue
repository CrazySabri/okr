<template>
  <div class="sidebar-admin">
    <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <router-link to="/admin/okr/company/list">Company OKR</router-link>
    </li>
      <li class="list-group-item">
        <router-link to="/admin/account">Users</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/team">Teams</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/organization/missionvision">Vision and Missions</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/okr/request">OKR Request</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/news">News</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

  }
</script>
