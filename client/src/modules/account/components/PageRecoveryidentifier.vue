<template>
  <div class="l-container--bg">
    <div class="recoveryidentifier-wrapper">

      <div class="recoveryidentifier-header">
        <div class="recoveryidentifier-header_logo">
          <router-link to="/"><img src="/static/img/logo.svg" alt="" /></router-link>
        </div>
      </div>

      <div class="recoveryidentifier-body l-container--fluid padded--large style--shadowed">
        <div class="ui-form">
          <h3>パスワードをリセット</h3>
          <form method="post" action="/">
            <input type="hidden" name="_token" value="" />
            <div class="ui-form_group">
              <label>メールアドレス</label>
              <input class="ui-input--text" type="email" name="email" v-model="email" novalidate :class="[{'state--error' : $v.email.$error}]" />
              <p class="ui-input_error" v-if="$v.password.$error">入力されたパスワードは正しくありません。</p>
            </div>
            <div class="ui-form_group">
              <button class="ui-btn--main thick--big size--fluid" @click.prevent="onSubmit">次へ</button>
            </div>
          </form>
        </div>
        <div class="recoveryidentifier-footer">
          <hr />
          <p><router-link to="/login">戻る</router-link></p>
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
      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }
      }
    }
  }
</script>
