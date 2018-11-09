<template>

  <layout-management>
    <div class="content-container wrap--content border--curved">
      <div class="float--right">
        <router-link to="/admin/account/create" class="btn btn-primary">Create an account</router-link>
      </div>
      <div class="page-title">
        <h1>Account</h1>
      </div>
    </div>
    <div class="content-container wrap--content border--curved">

      <template v-if="!accountList || !accountList.length">
        <div class="content-nodata">
          <p>There is no account</p>
        </div>
      </template>
      <template v-else>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Position</th>
              <th scope="col">Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(account, index) in accountList">
              <th scope="row">{{ index+1 }}</th>
              <td><router-link :to="'/admin/account/'+account._id">{{ account.profile.lastname }} {{ account.profile.firstname }}</router-link></td>
              <td>{{ account.email }}</td>
              <td>{{ account.profile.position }}</td>
              <td>{{ account.company.role }}</td>
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
      Vue.$service.company.fetchCompanyMembers(this.$store.getters.currentCompanyId)
      .then((data) => {
        this.$store.dispatch('fetchCompanyMembers', data)
      })
    },
    computed: {
      accountList() {
        return this.$store.state.company.companyMembers
      }
    }
  }
</script>
