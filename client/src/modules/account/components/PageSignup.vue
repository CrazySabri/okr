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
              <div class="ui-form_group row">
                <div class="col-md-6">
                  <label>姓</label>
                  <input class="ui-input--text" type="text" name="lastname" v-model="lastname" novalidate :class="[{'state--error' : $v.lastname.$error}]" />
                  <p class="ui-input_error" v-if="$v.lastname.$error">入力された姓は正しくありません。</p>
                </div>
                <div class="col-md-6">
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
        <div class="signup-body l-container--fluid padded--large style--shadowed">
          <div class="ui-form">
            <h3>会社情報を設定</h3>
            <form method="post" action="/">
              <div class="ui-form_group">
                <label>会社名</label>
                <input class="ui-input--text" type="text" name="companyname" v-model="companyname" novalidate :class="[{'state--error' : $v.companyname.$error}]" />
                <p class="ui-input_error" v-if="$v.companyname.$error">入力された会社名は正しくありません。</p>
              </div>
              <div class="ui-form_group">
                <label>会社コード</label>
                <input class="ui-input--text" type="text" name="companycode" v-model="companycode" novalidate :class="[{'state--error' : $v.companyname.$error}]" />
                <p class="ui-input_error" v-if="$v.companycode.$error">入力された会社コードは正しくありません。</p>
              </div>
              <div class="ui-form_group">
                <button class="ui-btn--main thick--big size--fluid" @click.prevent="onSubmit(2)">次へ</button>
              </div>
            </form>
          </div>
        </div>
      </template>
      <template v-else-if="step == 3">
        <div class="signup-body  l-container--fluid padded--large style--shadowed">
          <div class="ui-form">
            <p class="text--center">新規アカウント登録ができました</p>
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
        companyname: 'none',
        companycode: 'none',
        ownerId: ''
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
      },
      companyname: {
        required
      },
      companycode: {
        required
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
            this.companyname = ''
            this.companycode = ''
            this.step++
            this.$v.$reset()
            break;
          case 2:
            this.$Progress.start()

            Vue.$service.account.signup({
              email: this.email,
              password: this.password,
              firstname: this.firstname,
              lastname: this.lastname,
              position: 'admin',
              role: 'admin',
              company: {
                name: this.companyname,
                code: this.companycode
              }
            })
            .then((response) => {
              if(response.created) {
                this.step++
                this.$Progress.finish()
              } else {
                console.warn('Error', response.data.err)
                this.$Progress.fail()
              }
            })
            .catch((err) => {
              console.warn('Error', err)
              this.$Progress.fail()
            })
            break;
        }
      }
    }
  }
</script>
