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
                <h1>Profile</h1>
              </div>
            </div>

            <div class="content-container wrap--content border--curved">

              <div class="form-row">
                <div class="form-group col-md-6 name-input_firstname">
                  <div class="label-title">
                    <h1>first name</h1>
                  </div>
                  <input type="text" class="ui-input--text" v-model="formData.firstname" novalidate :class="[{'state--error' : $v.formData.lastname.$error}]" />
                  <p class="ui-input_error" v-if="$v.formData.lastname.$error">入力された名前は正しくありません。</p>
                </div>
                <div class="form-group col-md-6 name-input_lastname">
                  <div class="label-title">
                    <h1>last name</h1>
                  </div>
                  <input type="text" class="ui-input--text" v-model="formData.lastname" novalidate :class="[{'state--error' : $v.formData.firstname.$error}]" />
                  <p class="ui-input_error" v-if="$v.formData.firstname.$error">入力された名前は正しくありません。</p>
                </div>
              </div>

              <div class="form-group">
                <div class="label-title">
                  <h1>email</h1>
                </div>
                <input type="text" class="ui-input--text" v-model="formData.email" novalidate :class="[{'state--error' : $v.formData.email.$error}]" />
                <p class="ui-input_error" v-if="$v.formData.email.$error">入力されたメールアドレスは正しくありません。</p>
              </div>

            </div>
            <div class="form-group">
              <div class="text--center wrap--content">
                <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Change Profile</button>
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
    computed: {
      formData() {
        return {
          firstname: this.currentUser.profile.firstname,
          lastname: this.currentUser.profile.lastname,
          email: this.currentUser.email
        }
      },
    },
    validations: {
      formData: {
        lastname: {
          required,
        },
        firstname: {
          required,
        },
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    methods: {
      resetForm() {
        this.$v.$reset()
        this.formData.lastname = ''
        this.formData.firstname = ''
        this.formData.email = ''
      },
      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }

        this.$Progress.start()

        // Vue.$api.post('/mypage/setting/profile', {
        //     id: this.currentUser._id,
        //     firstname: this.formData.firstname,
        //     lastname: this.formData.lastname,
        //     email: this.formData.email
        //   })
        //   .then((response) => {
        //     this.$Progress.finish()
        //     this.resetForm()
        //   })
        //   .catch((err) => {
        //     console.warn('Error', err)
        //     this.$Progress.fail()
        //     this.resetForm()
        //   })
        }
    },
  }

</script>
