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
                <h1>Create Account</h1>
              </div>
            </div>
            <div class="content-container wrap--content border--curved">
              <div class="form-group">
                <div class="row">
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Lastname</h1>
                    </div>
                    <input type="text" name="lastname" class="form-control" v-model="formData.lastname" />
                  </div>
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Firstname</h1>
                    </div>
                    <input type="text" name="firstname" class="form-control" v-model="formData.firstname" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Email</h1>
                    </div>
                    <input type="email" name="email" class="form-control" v-model="formData.email" />
                  </div>
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Passowrd (<a class="cursor--pointer" @click.stop="generatePassword">generate a password</a>)</h1>
                    </div>
                    <input type="text" name="password" class="form-control" v-model="formData.password" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Position</h1>
                    </div>
                    <input type="text" name="position" class="form-control" v-model="formData.position" />
                  </div>
                  <div class="col-xs-6">
                    <div class="label-title">
                      <h1>Role</h1>
                    </div>
                    <select name="role" class="form-control" v-model="formData.role">
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
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
          lastname: '',
          firstname: '',
          password: '',
          email: '',
          role: 'staff',
          position: '',
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
        Vue.$service.account.create({
          email: this.formData.email,
          password: this.formData.password,
          firstname: this.formData.firstname,
          lastname: this.formData.lastname,
          role: this.formData.role,
          position: this.formData.position,
          company_id: this.formData.company_id
        })
        .then((response) => {
          if(response.data.created) {
            this.$router.push('/admin/account')
          }
        })
        .catch((err) => {
          console.warn('Error', err)
        })
      }
    }
  }
</script>
