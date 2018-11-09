<template>

  <layout-management>
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
            <input type="text" name="lastname" class="ui-input--text" v-model="formData.lastname" novalidate :class="[{'state--error' : $v.formData.lastname.$error}]" />
            <p class="ui-input_error" v-if="$v.formData.lastname.$error">入力された名前は正しくありません。</p>
          </div>
          <div class="col-xs-6">
            <div class="label-title">
              <h1>Firstname</h1>
            </div>
            <input type="text" name="firstname" class="ui-input--text" v-model="formData.firstname" novalidate :class="[{'state--error' : $v.formData.firstname.$error}]" />
            <p class="ui-input_error" v-if="$v.formData.firstname.$error">入力された名前は正しくありません。</p>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-xs-6">
            <div class="label-title">
              <h1>Email</h1>
            </div>
            <input type="email" name="email" class="ui-input--text" v-model="formData.email" novalidate :class="[{'state--error' : $v.formData.email.$error}]" />
            <p class="ui-input_error" v-if="$v.formData.email.$error">入力されたメールアドレスは正しくありません。</p>
          </div>
          <div class="col-xs-6">
            <div class="label-title">
              <h1>Password (<a class="cursor--pointer" @click.stop="generatePassword">generate a password</a>)</h1>
            </div>
            <input type="text" name="password" class="form-control" v-model="formData.password" novalidate :class="[{'state--error' : $v.formData.password.$error}]" />
            <p class="ui-input_error" v-if="$v.formData.password.$error">入力されたパスワード正しくありません。</p>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-xs-6">
            <div class="label-title">
              <h1>Position</h1>
            </div>
            <input type="text" name="position" class="ui-input--text" v-model="formData.position" novalidate :class="[{'state--error' : $v.formData.position.$error}]" />
            <p class="ui-input_error" v-if="$v.formData.position.$error">入力されたポジションは正しくありません。</p>
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
    </div>
    <div class="form-group">
      <div class="text--center wrap--content">
        <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Create</button>
      </div>
    </div>

  </layout-management>

</template>

<script>
  import Vue from 'vue'
  import LayoutManagement from '@/components/layouts/LayoutManagement'
  import Vuelidate from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  Vue.use(Vuelidate)

  export default {
    components: {
      'layout-management': LayoutManagement
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
          company_id: this.$store.getters.currentCompanyId,
          company_code: this.$store.getters.currentCompanyCode
        }
      }
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
        },
        position: {
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
        this.formData.password = ''
        this.formData.position = ''
      },
      generatePassword() {
        this.formData.password = Math.random().toString(36).slice(-8);
        this.$forceUpdate()
        return false;
      },
      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }

        this.$Progress.start()
        Vue.$service.account.create({
          email: this.formData.email,
          password: this.formData.password,
          firstname: this.formData.firstname,
          lastname: this.formData.lastname,
          role: this.formData.role,
          position: this.formData.position,
          company: {
            id: this.formData.company_id,
            code: this.formData.company_code
          }
        })
        .then((response) => {
          if(response.created) {
            this.$router.push('/admin/account')
            this.$Progress.finish()
            this.resetForm()
          } else {
            this.$Progress.fail()
            this.resetForm()
          }
        })
        .catch((err) => {
          console.warn('Error', err)
          this.$Progress.fail()
          this.resetForm()
        })
      }
    }
  }
</script>
