<template>
  <div class="l-container--bg">
    <div class="login-wrapper">

      <div class="login-header">
        <div class="login-header_logo">
          <router-link to="/"><img src="/static/img/logo.svg" alt="" /></router-link>
        </div>
      </div>

      <div class="login-body l-container--fluid padded--large style--shadowed">
        <div class="ui-form">
          <form method="post" action="/">
            <input type="hidden" name="_token" value="" />
            <div class="ui-form_group">
              <label>メールアドレス</label>
              <input class="ui-input--text" type="email" name="email" v-model="email" novalidate :class="[{'state--error' : $v.email.$error}]" />
              <p class="ui-input_error" v-if="$v.email.$error">入力されたメールアドレスは正しくありません。</p>
            </div>
            <div class="ui-form_group">
              <p class="login-form_group_forgotPassword"><router-link to="/recoveryidentifier">パスワードを忘れた方はこちら</router-link></p>
              <label>パスワード</label>
              <input class="ui-input--text" name="password" type="password" v-model="password" :class="[{'state--error' : $v.password.$error}]" />
              <p class="ui-input_error" v-if="$v.password.$error">入力されたパスワードは正しくありません。</p>
            </div>
            <div class="ui-form_group">
              <button class="ui-btn--main thick--big size--fluid" @click.prevent="onSubmit">ログイン</button>
            </div>
          </form>
        </div>
        <div class="login-footer">
          <hr />
          <p><router-link to="/signup">新しいアカウントを作成</router-link></p>
          <p class="login-form_group_forgotPassword"><router-link to="/recoveryidentifier">パスワードを忘れた方はこちら</router-link></p>
        </div>
      </div>
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
        email: '',
        password: ''
      }
    },
    validations: {
      password: {
        required,
      },
      email: {
        required,
        email
      }
    },
    methods: {
      resetForm() {
        this.$v.$reset()
        this.email = ''
        this.password = ''
      },
      onSubmit() {

        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }

        Vue.$api.post('/account/login', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          if(response.data.loggedin) {
            Vue.$service.auth.login({
              persistant: true,
              account: response.data.account
            })
            .then(() => {
              this.resetForm()
              this.$router.push('/mypage')
            })
          } else {
            console.log('User does not Exist !')
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
        return false
      }
    }
  }
</script>
