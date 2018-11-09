<template>

  <layout-default>
    <div class="page-admin">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-admin></sidebar-admin>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="float--right">
                <router-link to="/admin/account/create" class="btn btn-primary">Create an account</router-link>
              </div>
              <div class="page-title">
                <h1>Account</h1>
              </div>
            </div>
            <div class="content-container wrap--content border--curved">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(account, index) in accountList">
                    <th scope="row">{{ index+1 }}</th>
                    <td><router-link :to="'/admin/account/'+account._id">{{ account.profile.lastname }} {{ account.profile.firstname }}</router-link></td>
                    <td>{{ account.email }}</td>
                    <td>{{ account.role }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="clear--both"></div>
        </div>
      </div>
    </div>
  </layout-default>

</template>

<script>
  import Vue from 'vue'
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import SidebarAdmin from '@/modules/admin/components/partials/SidebarAdmin';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-admin': SidebarAdmin
    },
    mounted() {
      this.$store.dispatch('fetchCompanyMembers', this.$store.getters.currentCompanyId)
    },
    computed: {
      accountList() {

        return this.$store.state.company.companyMembers
      }
    }
  }
</script>
