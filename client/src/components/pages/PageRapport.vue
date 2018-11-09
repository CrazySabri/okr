<template>

  <layout-fullscreen :back="back">
    <div class="page-rapport" v-if="rapport">
      <div class="fullscreen--inner">

        <div class="page-title position--fullscreen">
          <h2>Rapport</h2>
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

        <div class="content-title position--outside">
          <h2>{{ this.rapport.title }}</h2>
        </div>
        <div class="content-container wrap--content border--curved">
          <div v-html="rapport.text"></div>
        </div>

        <div class="content-title position--outside">
          <h2>Comments</h2>
        </div>
        <div class="content-container background--transparent" v-if="this.rapport">
          <module-comment type="rapport" :id="this.rapport.id" />
        </div>
      </div>
    </div>
  </layout-fullscreen>

</template>

<script>
  import Vue from 'vue';
  import moment from 'moment';
  import LayoutFullscreen from '@/components/layouts/LayoutFullscreen';
  import ModuleComment from '@/modules/comment/components/PageComment';

  export default {
    components: {
      'layout-fullscreen': LayoutFullscreen,
      'module-comment': ModuleComment
    },
    props: {
      id: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        rapport: null
      }
    },
    mounted() {
      Vue.$service.okr.getOkrRapport(this.id)
      .then((data) => {
        this.rapport = {
          title: data.title,
          text: data.rapport,
          okrId: data.okrId,
          id: data._id
        }

        Vue.$service.okr.fetchOneOkrNoType(data.okrId)
        .then((data2) => {
          this.$store.dispatch('fetchOneOkr', data2)
        })
      })
    },
    computed: {
      currentOkr() {
        if(this.rapport) {
          return this.$store.getters.getOneOkr(this.rapport.okrId)
        }
        return null
      },
      back() {
        if(this.currentOkr) {
          return '/okr/'+this.currentOkr.type+'/'+this.currentOkr._id+'#rl'
        }
        return '/mypage'
      }
    }
  }
</script>
