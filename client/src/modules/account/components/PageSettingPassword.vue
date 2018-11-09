<template>

  <layout-default>
    <div class="page-organization">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-setting></sidebar-setting>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>Password</h1>
              </div>
            </div>

            <div class="content-container wrap--content border--curved">

              <div class="form-group">
                <div class="label-title">
                  <h1>current password</h1>
                </div>
                <input type="password" class="ui-input--text" v-model="formData.currentpassword" novalidate :class="[{'state--error' : $v.formData.currentpassword.$error}]" />
                <p class="ui-input_error" v-if="$v.formData.currentpassword.$error">入力されたパスワード正しくありません。</p>
              </div>

              <div class="form-group">
                <div class="label-title">
                  <h1>nwe password</h1>
                </div>
                <input type="password" class="ui-input--text" v-model="formData.newpassword" novalidate :class="[{'state--error' : $v.formData.newpassword.$error}]" />
                <p class="ui-input_error" v-if="$v.formData.newpassword.$error">入力されたパスワード正しくありません。</p>
              </div>

              <div class="form-group">
                <div class="label-title">
                  <h1>new password confirm</h1>
                </div>
                <input type="password" class="ui-input--text" v-model="formData.newpasswordconfirm" novalidate :class="[{'state--error' : $v.formData.newpasswordconfirm.$error}]" />
                <p class="ui-input_error" v-if="$v.formData.newpasswordconfirm.$error">入力されたパスワード正しくありません。</p>
              </div>

            </div>

            <div class="form-group">
              <div class="text--center wrap--content">
                <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Change Password</button>
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
  import LayoutDefault from '@/components/layouts/LayoutDefault'
  import SidebarSetting from '@/components/partials/common/SidebarSetting'
  import Vuelidate from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  Vue.use(Vuelidate)

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-setting': SidebarSetting
    },
    data() {
      return {
        formData: {
          currentpassword: '',
          newpassword: '',
          newpasswordconfirm: '',
        }
      }
    },
    validations: {
      formData: {
        currentpassword: {
          required,
        },
        newpassword: {
          required,
        },
        newpasswordconfirm: {
          required,
        }
      }
    },
    methods: {
      esetForm() {
        this.$v.$reset()
        this.formData.currentpassword = ''
        this.formData.newpassword = ''
        this.formData.newpasswordconfirm = ''
      },
      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }

        if (this.formData.newpassword !== this.formData.newpasswordconfirm) return
          Vue.$api.post('/account/update-password', {
            user_id: this.currentUser._id,
            old_password: this.formData.currentpassword,
            new_password: this.formData.newpassword,
          })
          .then((response) => {
            this.$Progress.finish()
            this.resetForm()
          })
          .catch((err) => {
            this.$Progress.fail()
            this.resetForm()
          })
      },
    }
  }

</script>
