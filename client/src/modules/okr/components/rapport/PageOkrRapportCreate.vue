<template>
  <layout-fullscreen :back="backLink">
    <div class="page-rapport">
      <div class="fullscreen--inner">

        <div class="page-title position--fullscreen">
          <h2>Create a new Rapport</h2>
        </div>

        <div class="content-container wrap--content border--curved" v-if="currentOkr">
          <div class="okr-header">
            <div class="okr-header_profile">
              <p class="okr-header_name">
                <span>{{ currentOkr.name }}</span>
              </p>
            </div>
            <div class="clear--both"></div>
          </div>
        </div>

        <div class="content-container background--transparent">
          <div class="content-container wrap--content border--curved">

            <div class="label-title">
              <h4>Title</h4>
            </div>
            <div class="form-group">
              <input type="text" v-model="formData.title" class="form-control" />
            </div>
            <div class="form-group">

              <mavon-editor v-model="formData.rapport" language="en" :toolbars="toolbars" ref="md" />
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="text--center wrap--content">
            <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Submit</button>
          </div>
        </div>


      </div>
    </div>
  </layout-fullscreen>
</template>

<script>
  import Vue from 'vue';
  import moment from 'moment';
  import mavonEditor from 'mavon-editor'
  import LayoutFullscreen from '@/components/layouts/LayoutFullscreen';

  Vue.use(mavonEditor)

  export default {
    components: {
      'layout-fullscreen': LayoutFullscreen,
    },
    props: {
      id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        formData: {
          rapport: '',
          title: ''
        },
        toolbars: {
          bold: true,
          italic: true,
          header: true,
          underline: true,
          strikethrough: true,
          mark: true,
          superscript: true,
          subscript: true,
          quote: true,
          ol: true,
          ul: true,
          link: true,
          imagelink: false,
          code: true,
          htmlcode: true,
          table: true,
          help: true,
          alignleft: true,
          aligncenter: true,
          alignright: true,
          subfield: true,
          preview: true,
          undo: false,
          redo: false,
          fullscreen: false,
          readmodel: false,
          htmlcode: false,
          trash: false,
          save: false,
          navigation: false,
        }
      }
    },
    mounted() {
      Vue.$service.okr.fetchOneOkr({
        type: this.type,
        id: this.id
      })
      .then((data) => {
        this.$store.dispatch('fetchOneOkr', data)
      })
    },
    computed: {
      currentOkr() {
        return this.$store.getters.getOneOkr(this.id)
      },
      backLink() {
        if(this.okr) {
          return '/okr/'+this.currentOkr.type+'/'+this.currentOkr._id
        }
        return '/mypage'
      }
    },
    methods: {
      onSubmit() {
         Vue.$api.post('/okr/rapport/create', {
           rapport: this.$refs.md.$data.d_render,
           title: this.formData.title,
           ownerId: this.currentUserId,
           okrId: this.currentOkr._id,
           date_created: moment().format('YYYY/MM/DD')
        })
        .then((response) => {
          if(response.data.created) {
            this.$router.push('/okr/rapport/'+response.data.doc._id)
          }
        })
      }
    },
  }
</script>
