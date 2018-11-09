<template>

  <layout-default>
    <div class="page-organization">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-terms></sidebar-terms>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>Contact</h1>
              </div>
            </div>

            <div class="content-container wrap--content border--curved">


              <template v-if="!isSendSuccess">
                <form>
                  <div class="form-group">
                    <div class="label-title">
                      <h1>name</h1>
                    </div>
                    <input type="text" class="form-control ui-input--text" v-model="formData.name" novalidate :class="[{'state--error' : $v.formData.email.$error}]" />
                    <p class="ui-input_error" v-if="$v.formData.name.$error">入力された名前は正しくありません。</p>
                  </div>

                  <div class="form-group">
                    <div class="label-title">
                      <h1>email</h1>
                    </div>
                    <input type="email" placeholder="abs@exemple.jp" class="form-control ui-input--text" v-model="formData.email" novalidate :class="[{'state--error' : $v.formData.email.$error}]" />
                    <p class="ui-input_error" v-if="$v.formData.email.$error">入力されたメールアドレスは正しくありません。</p>
                  </div>

                  <div class="form-group">
                    <div class="label-title">
                      <h1>content</h1>
                    </div>
                    <textarea type="text" class="form-control ui-input--text" rows="5" v-model="formData.content" novalidate :class="[{'state--error' : $v.formData.email.$error}]" />
                    <p class="ui-input_error" v-if="$v.formData.content.$error">入力された内容は正しくありません。</p>
                  </div>

                  <div class="form-group">
                    <div class="text--center wrap--content">
                      <button class="ui-btn--main thick--big size--medium" @click.prevent="onSubmit">Send</button>
                    </div>
                  </div>
                </form>
              </template>

              <div class="form-group" v-if="isSendSuccess">
                <div>Send Success!</div>
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
  import SidebarTerms from '@/components/partials/common/SidebarTerms'
  import Vuelidate from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  Vue.use(Vuelidate)

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-terms': SidebarTerms
    },
    data() {
      return {
        formData: {
          name: '',
          email: '',
          content: ''
        },
        isSendSuccess: false
      }
    },
    validations: {
      formData: {
        name: {
        required,
        },
        email: {
          required,
          email
        },
        content: {
          required
        }
      }
    },
    methods: {
      resetForm() {
        this.$v.$reset()
        this.fomrData.name = ''
        this.fomrData.email = ''
        this.fomrData.content = ''
      },
      onSubmit() {

        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }

         this.$Progress.start()

        Vue.$api.post('/contact', {
          name: this.fomrData.name,
          email: this.fomrData.email,
          content: this.fomrData.content
        })
        .then((response) => {
          this.$Progress.finish()
          this.resetForm()
          this.isSendSuccess = true
        })
        .catch((err) => {
          this.$Progress.fail()
          this.isSendSuccess = false
        })
      },
    }
  }

</script>
