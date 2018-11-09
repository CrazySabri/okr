<template>

  <layout-fullscreen :back="backLink" class="background--transparent">

      <div class="page-okr_build" v-if="currentOkr">
        <div class="background--fullscreen">
          <div class="fullscreen--inner wrap--fullscreen">
            <div class="page-title position--outside">
              <h1>Confirm OKR</h1>
            </div>

            <div class="wrap--fullscreen" v-if="currentCompany || currentTeam">
              <div class="row">
                <div class="col-md-6">
                  <div class="content-container wrap--content border--curved">
                    <div class="label-title">
                      <h4>Vision</h4>
                    </div>
                    <template v-if="type == 'company' && currentCompany">
                      <p>{{ currentCompany.vision }}</p>
                    </template>
                    <template v-else-if="type == 'team' && currentTeam">
                      <p>{{ currentTeam.vision }}</p>
                    </template>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="content-container wrap--content border--curved">
                    <div class="label-title">
                      <h4>Mission</h4>
                    </div>
                    <template v-if="type == 'company' && currentCompany">
                      <p>{{ currentCompany.mission }}</p>
                    </template>
                    <template v-else-if="type == 'team' && currentTeam">
                      <p>{{ currentTeam.mission }}</p>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fullscreen--inner wrap--fullscreen">


          <div class="content-container wrap--content border--curved">

            <div class="content-container background--transparent" v-if="currentOkr.name">
              <div class="label-title">
                <h4>Name</h4>
              </div>
              <p>{{ currentOkr.name }}</p>
            </div>

            <div class="content-container background--transparent" v-if="currentOkr.date_start || currentOkr.date_end">
              <div class="label-title">
                <h4>Date</h4>
              </div>
              <p>{{ currentOkr.date_start }} 〜　{{ currentOkr.date_end }}</p>
            </div>

            <div class="content-container background--transparent" v-if="currentOkr.objective">
              <div class="label-title">
                <h4>Objective</h4>
              </div>
              <p>{{ currentOkr.objective }}</p>
            </div>

            <div class="content-container background--transparent" v-for="(keyresult, index) in currentOkr.keyresults" v-if="keyresult.key && keyresult.result">
              <div class="label-title">
                <h4>KR-{{ index+1 }}</h4>
              </div>
              <p>{{ keyresult.key }}、{{ keyresult.result }}</p>
            </div>
          </div>
        </div>

        <div class="text--center wrap--fullscreen">
          <button class="ui-btn--main thick--big size--medium" @click="confirmOkr">Confirm OKR</button>
        </div>
      </div>
  </layout-fullscreen>

</template>

<script>
  import Vue from 'vue'
  import LayoutFullscreen from '@/components/layouts/LayoutFullscreen';
  import buildItem from '@/components/partials/okr/buildItem';
  import Datepicker from '@/components/partials/ui/form/Datepicker'
  import StepperComponent from '@/components/partials/ui/Stepper';
  import TipsContainer from '@/components/partials/ui/TipsContainer';

  export default {
    components: {
      'layout-fullscreen': LayoutFullscreen,
      'okr-build-item': buildItem,
      'container-tips': TipsContainer,
      'ui-stepper': StepperComponent,
      'datepicker': Datepicker,
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
    mounted() {
      if(this.id && this.type) {
        Vue.$service.okr.fetchOneOkr({
          id: this.id,
          type: this.type
        })
        .then((data) => {
          this.currentOkr = data

          if(data.status !== 'preconfirm') {
            if(this.type == 'company') {
              this.$router.push('/admin/okr/company/list')
            }
            else if(this.type == 'team') {
              this.$router.push('/admin/team/'+data.teamId)
            }
          }
        })
        .catch(() => {
          this.$router.push('/admin/okr/company/list')
        })
      }
    },
    data() {
      return {
        currentOkr: null
      }
    },
    computed: {
      backLink() {
        if(this.type == 'company') {
          return '/admin/okr/company/list'
        }
        else if(this.type == 'team' && this.team_id) {
          return '/admin/team/'+this.team_id
        }
      },
      currentTeamId() {
        return this.currentOkr ? this.currentOkr.teamId : null
      },
      currentTeam() {
        if(this.currentTeamId) {
          return this.$store.getters.getTeam(this.currentTeamId)
        }
      },
      currentCompany() {
        return this.$store.getters.currentCompany
      },
    },
    methods: {
      getKeyResult(kr) {
        if(kr.key && kr.result) {
          return kr.key+'、'+kr.result
        }
        else if(kr.key) {
          return kr.key
        }
        else if(kr.result) {
          return kr.result
        }
        return ''
      },
      confirmOkr() {
        if(confirm('Do you really want to confirm it ? You could not change afterward !')) {
          Vue.$service.okr.changeOkrStatus(this.currentOkr._id, 'confirmed')
          .then((data) => {
            this.$router.push('/okr/'+this.type+'/'+this.id)
          })
        }
        return false
      }
    }
  }
</script>
