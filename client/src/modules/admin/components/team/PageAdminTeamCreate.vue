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
              <div class="page-title">
                <h1>Create Team</h1>
              </div>
            </div>
            <div class="content-container wrap--content border--curved">
              <div class="form-group">
                <div class="label-title">
                  <h1>name</h1>
                </div>
                <input type="text" name="name" class="form-control" v-model="formData.name" />
              </div>
              <div class="form-group" v-if="members && members.length">
                <div class="row">
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Members</h1>
                    </div>
                    <select name="members" class="form-control" v-model="formData.members" multiple>
                      <option v-for="member in members" :value="member._id">{{ member.profile.lastname }} {{ member.profile.firstname }}</option>
                    </select>
                  </div>
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Managers</h1>
                    </div>
                    <select name="managers" class="form-control" v-model="formData.managers" multiple>
                      <option v-for="member in members" :value="member._id">{{ member.profile.lastname }} {{ member.profile.firstname }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="text--center wrap--content">
                  <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Create</button>
                </div>
              </div>
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
    data() {
      return {
        formData: {
          name: '',
          members: [],
          managers: [],
          company_id: this.$store.getters.currentCompanyId
        }
      }
    },
    methods: {
      generatePassword() {
        this.formData.password = Math.random().toString(36).slice(-8);
        this.$forceUpdate()
        return false;
      },
      onSubmit() {
        Vue.$api.post('/team/create', {
          name: this.formData.name,
          members: this.formData.members,
          managers: this.formData.managers,
          companyId: this.formData.company_id
        })
        .then((response) => {
          if(response.data.created) {
            this.$router.push('/admin/team')
          }
        })
        .catch((err) => {
          console.warn('Error', err)
        })
      }
    },
    mounted() {
      this.$store.dispatch('fetchCompanyMembers', this.$store.getters.currentCompanyId)
    },
    computed: {
      members() {
        return this.$store.state.company.companyMembers
      }
    }
  }
</script>
