<template>
  <div class="l-container--bg">
    <div class="signup-wrapper">

      <div class="signup-header">
        <div class="signup-header_logo">
          <router-link to="/"><img src="/static/img/logo.svg" alt="" /></router-link>
        </div>
      </div>
      <template v-if="step == 1">
        <div class="signup-body l-container--fluid padded--large style--shadowed">
          <div class="ui-form">
            <h3>新規アカウントを作成</h3>
            <form method="post" action="/">
              <div class="ui-form_group ui-form_group--inline">
                <div class="ui-form_group_col">
                  <label>姓</label>
                  <input class="ui-input--text" type="text" name="lastname" v-model="lastname" novalidate :class="[{'state--error' : $v.lastname.$error}]" />
                  <p class="ui-input_error" v-if="$v.lastname.$error">入力された姓は正しくありません。</p>
                </div>
                <div class="ui-form_group_col">
                  <label>名</label>
                  <input class="ui-input--text" type="text" name="firstname" v-model="firstname" novalidate :class="[{'state--error' : $v.firstname.$error}]" />
                  <p class="ui-input_error" v-if="$v.firstname.$error">入力された名は正しくありません。</p>
                </div>
              </div>
              <div class="ui-form_group">
                <label>メールアドレス</label>
                <input class="ui-input--text" type="email" name="email" v-model="email" novalidate :class="[{'state--error' : $v.email.$error}]" />
                <p class="ui-input_error" v-if="$v.email.$error">入力されたメールアドレスは正しくありません。</p>
              </div>
              <div class="ui-form_group">
                <label>パスワード</label>
                <input class="ui-input--text" name="password" type="password" v-model="password" :class="[{'state--error' : $v.password.$error}]" />
                <p class="ui-input_error" v-if="$v.password.$error">入力されたパスワードは正しくありません。</p>
              </div>
              <div class="ui-form_group">
                <button class="ui-btn--main thick--big size--fluid" @click.prevent="onSubmit(1)">次へ</button>
              </div>
            </form>
          </div>
          <div class="signup-footer">
            <hr />
            <p><router-link to="/login">既にアカウントを持っている方はこちら</router-link></p>
          </div>
        </div>
      </template>
      <template v-else-if="step == 2">
        <div class="signup-body  l-container--fluid padded--large style--shadowed">
          <div class="ui-form">
            <p class="text--center">アカウント登録ができました</p>
            <p class="text--center"><router-link to="/login">ログイン</router-link></p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Vuelidate from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  Vue.use(Vuelidate)

  export default {
    name: 'PageLogin',
    data() {
      return {
        step: 1,
        email: '',
        password: '',
        lastname: '',
        firstname: '',
        companyId: 'none'
      }
    },
    validations: {
      lastname: {
        required
      },
      firstname: {
        required
      },
      password: {
        required
      },
      email: {
        required,
        email
      }
    },
    methods: {
      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }

        switch(this.step) {
          case 1:
            Vue.$service.account.signup({
              email: this.email,
              password: this.password,
              firstname: this.firstname,
              lastname: this.lastname,
              companyId: this.companyId
            })
            .then((response) => {
              if(response.data.created) {
                this.$v.$reset()
                this.ownerId = response.data.doc._id
                this.companyname = ''
                this.step++
              } else {
                console.warn('Error', response.data.err)
              }
            })
            .catch((err) => {
              console.warn('Error', err)
            })
            break;
        }
      }
    }
  }
</script>
