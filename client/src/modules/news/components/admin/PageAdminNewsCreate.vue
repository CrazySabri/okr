<template>

  <layout-management>
    <div class="content-container wrap--content border--curved">
      <div class="page-title">
        <h1>Create News</h1>
      </div>
    </div>
    <div class="content-container wrap--content border--curved">
      <div class="form-group">
        <div class="label-title">
          <h1>title</h1>
        </div>
        <input type="text" class="ui-input--text" v-model="formData.title" novalidate :class="[{'state--error' : $v.formData.title.$error}]" />
        <p class="ui-input_error" v-if="$v.formData.title.$error">入力された内容は正しくありません。</p>
      </div>
      <div class="form-group">
        <div class="label-title">
          <h1>content</h1>
        </div>
        <textarea type="text" class="ui-input--textarea" rows="5" v-model="formData.content" novalidate :class="[{'state--error' : $v.formData.content.$error}]" />
        <p class="ui-input_error" v-if="$v.formData.content.$error">入力された内容は正しくありません。</p>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="formData.draft">
            draft
          </label>
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
          title: '',
          content: '',
          draft: false,
          company_id: this.$store.getters.currentCompanyId
        }
      }
    },
    validations: {
      formData: {
        title: {
          required,
        },
        content: {
          required,
        }
      }
    },
    computed: {
      date() {
        const today = new Date()
        return today.getMonth() + 1 + "/"+ today.getDate()
      }
    },
    methods: {
      resetForm() {
        this.$v.$reset()
        this.formData.title = ''
        this.formData.content = ''
      },
      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }
        Vue.$api.post('/news/create', {
          title: this.formData.title,
          content: this.formData.content,
          status: this.formData.status,
          draft: this.draft,
          companyId: this.formData.company_id
        })
        .then((response) => {
          this.$Progress.finish()
          if(response.data.created) {
            this.$router.push('/admin/news')
          }
        })
        .catch((err) => {
          this.$Progress.finish()
          console.warn('Error', err)
        })
      }
    },
  }

</script>
