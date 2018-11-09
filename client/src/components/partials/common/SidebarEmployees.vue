<template>
  <div class="sidebar-employees">
    <div v-if="employees && employees.length" class="sidebar-employeeList">
      <ul>
        <li v-for="employee in employees">
          <router-link :to="'/employee/'+employee._id">
            <span class="avatar-user size--sidebar">
              <img src="/static/img/dummy-avatar.jpg" />
            </span>
            <p>
              <span>{{ employee.profile.lastname }} {{ employee.profile.firstname }}</span>
              <span class="text--position">{{ employee.profile.position }}</span>
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
      this.$store.dispatch('fetchCompanyMembers', this.$store.getters.currentCompanyId)
    },
    computed: {
      employees() {
        return this.$store.state.company.companyMembers
      }
    }
  }
</script>
