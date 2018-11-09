<template>

  <layout-fullscreen :back="backLink" class="background--transparent">

    <container-tips :tip="objectiveTip" :show="objectiveTipShow"></container-tips>
    <container-tips :tip="keyresultTip" :show="keyresultTipShow"></container-tips>

      <div class="page-okr_build" v-if="!id || (id && okrId)">
        <div class="background--fullscreen">
          <div class="fullscreen--inner wrap--fullscreen">
            <template v-if="type == 'company'">
              <div class="page-title position--outside">
                <h1>Build a company OKR</h1>
              </div>
            </template>
            <template v-else-if="type == 'team' && currentTeam">
              <div class="page-title position--outside">
                <h1>Build {{ currentTeam.name }} team 's OKR</h1>
              </div>
            </template>

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
          <ui-stepper :steps="steps" :currentStep="step-1"></ui-stepper>
        </div>

        <div class="background--fullscreen">
          <div class="fullscreen--inner wrap--fullscreen">
            <template v-if="step == 1">
              <div class="content-title">
                <h1>Step 1 : Start</h1>
              </div>

              <div class="wrap--fullscreen">

                <div class="content-container wrap--content border--curved">
                  <div class="form-group">
                    <div class="label-title">
                      <h4>Name</h4>
                    </div>
                    <input class="form-control" v-model="formData.name" />
                  </div>
                </div>

                <template v-if="parentTeamOkr && parentTeamOkr.length">
                  <div class="content-container wrap--content border--curved">
                    <div class="row">
                      <div :class="selectedParentOkr ? 'col-xs-6' : 'col-xs-12'">
                        <div class="form-group">
                          <div class="label-title">
                            <h4>Select Parent OKR</h4>
                          </div>
                          <select v-model="formData.parentId" class="form-control">
                            <option value="">No parent</option>
                            <option :value="okr._id" v-for="okr in parentTeamOkr">{{ okr.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-xs-6" v-if="selectedParentOkr">
                        <div class="form-group">
                          <div class="label-title">
                            <h4>Parent OKR</h4>
                          </div>
                          <p>Objective : {{ selectedParentOkr.objective }}</p>
                          <p v-for="(keyresult, index) in selectedParentOkr.keyresults">KR-{{ index+1 }} : {{ keyresult.key }}、{{ keyresult.result }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <div class="content-container wrap--content border--curved">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-xs-6">
                        <div class="label-title">
                          <h1>Date start</h1>
                        </div>
                        <datepicker inputClass="ui-input--text" :bootstrapStyling="true"　v-model="formData.date_start" ></datepicker>
                      </div>
                      <div class="col-xs-6">
                        <div class="label-title">
                          <h1>Date end</h1>
                        </div>
                        <datepicker　inputClass="ui-input--text" :bootstrapStyling="true"　v-model="formData.date_end" ></datepicker>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </template>
            <template v-else-if="step == 2">
              <button class="btn btn-outline-primary float--right" @click="objectiveTipShow = !objectiveTipShow">
                <span class="glyphicon glyphicon-question-sign"></span> Tips
              </button>

              <div class="content-container background--transparent content-title">
                <h1>Step 2 : Objective</h1>
              </div>

              <div class="content-container wrap--content border--curved">
                <div class="form-group">
                  <textarea class="form-control" v-model="formData.objective"></textarea>
                </div>
              </div>
            </template>

            <template v-else-if="step == 3">
              <button class="btn btn-outline-primary float--right" @click="keyresultTipShow = !keyresultTipShow">
                <span class="glyphicon glyphicon-question-sign"></span> Tips
              </button>

              <div class="content-title">
                <h1>Step 3 : Key results</h1>
              </div>

              <div class="wrap--fullscreen">
                <div v-for="(keyresult, index) in formData.keyresults" class="content-container wrap--content border--curved">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="label-title">
                        <h4>Key</h4>
                      </div>
                      <div class="form-group">
                        <input class="form-control" v-model="keyresult.key" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="label-title">
                        <h4>Results</h4>
                      </div>
                      <div class="form-group">
                        <input class="form-control" v-model="keyresult.result" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <p class="text--sample">{{ getKeyResult(keyresult) }}</p>
                    </div>
                  </div>
                </div>

                <div class="text--center wrap--fullscreen">
                    <button class="btn btn-outline-primary" @click="addKR()"><span class="glyphicon glyphicon-plus-sign"></span> Add a KR</button>
                </div>
              </div>
            </template>

            <template v-else-if="step == 4">
              <div class="content-title">
                <h1>Step 4 : Confirm & save</h1>
              </div>

              <div class="wrap--fullscreen">

                <div class="content-container wrap--content border--curved">

                  <div class="content-container background--transparent" v-if="formData.name">
                    <div class="label-title">
                      <h4>Name</h4>
                    </div>
                    <p>{{ formData.name }}</p>
                  </div>

                  <div class="content-container background--transparent" v-if="formData.date_start || formData.date_end">
                    <div class="label-title">
                      <h4>Date</h4>
                    </div>
                    <p>{{ formData.date_start }} 〜　{{ formData.date_end }}</p>
                  </div>

                  <div class="content-container background--transparent" v-if="formData.objective">
                    <div class="label-title">
                      <h4>Objective</h4>
                    </div>
                    <p>{{ formData.objective }}</p>
                  </div>

                  <div class="content-container background--transparent" v-for="(keyresult, index) in formData.keyresults" v-if="keyresult.key && keyresult.result">
                    <div class="label-title">
                      <h4>KR-{{ index+1 }}</h4>
                    </div>
                    <p>{{ keyresult.key }}、{{ keyresult.result }}</p>
                  </div>
                </div>
              </div>
              <div class="text--center wrap--fullscreen">
                  <button v-if="showDraftSave" :disabled="!formData.name" class="ui-btn--main thick--big size--medium" @click="save('draft', true)">Draft</button>
                  <button class="ui-btn--main thick--big size--medium" @click="save('preconfirm')" :disabled="preconfirmDisable">Save</button>
              </div>
            </template>

            <div class="wrap--fullscreen">
              <template v-if="steps.length >= step+1">
                <div class="float--right">
                  <button v-if="showDraftSave" class="btn btn-outline-primary" @click="nextStep('draft')">Next and draft Save <span class="glyphicon glyphicon-menu-right"></span></button>
                  <button class="btn btn-outline-primary" @click="nextStep">Next <span class="glyphicon glyphicon-menu-right"></span></button>
                </div>
              </template>
              <template v-if="step > 1">
                <button class="btn btn-outline-primary" @click="prevStep"><span class="glyphicon glyphicon-menu-left"></span> Previous</button>
              </template>
              <div class="clear--both"></div>
            </div>
          </div>
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
        type: String
      },
      type: {
        type: String,
        required: true
      },
      team_id: {
        type: String
      }
    },
    mounted() {
      if(this.type == 'company' && this.team_id) {
        this.$router.push('/admin/team/'+this.team_id)
      }

      if(this.type == 'team' && !this.team_id) {
        this.$router.push('/admin/teams')
      }


      Vue.$service.okr.fetchCompanyOkr(this.$store.getters.currentCompanyId)
      .then((data) => {
        this.$store.dispatch('fetchCompanyOkr', data)
      })


      if(this.team_id) {
        Vue.$service.team.fetchOneTeam(this.team_id)
        .then((data) => {
          this.$store.dispatch('fetchOneTeam', data)

          if(data.parentId) {
            Vue.$service.okr.fetchTeamOkr(data.parentId)
            .then((data2) => {
              this.$store.dispatch('fetchTeamOkr', data2)
            })
          }

        })
      }



      if(this.id && this.type) {

        Vue.$service.okr.fetchOneOkr({
          id: this.id,
          type: this.type
        })
        .then((data) => {
          this.okrId = this.id
          this.formData = {
            objective: data.objective,
            keyresults: data.keyresults,
            name: data.name,
            date_start: data.date_start,
            date_end: data.date_end,
            parentId: data.parentId,
            status: data.status
          }
        })
        .catch(() => {
          this.$router.push('/admin/okr/company/list')
        })
      }
    },
    data() {
      return {
        okrId: null,
        steps: [
          {
            title: 'Start',
            description: 'Set okr detail'
          },
          {
            title: 'Objective',
            description: 'Set your objective'
          },
          {
            title: 'Key results',
            description: 'Set your results'
          },
          {
            title: 'Confirm',
            description: 'Confirm and send it'
          }
        ],
        step: 1,
        objectiveTipShow: false,
        keyresultTipShow: false,
        keyresultTip: {
          title: 'How to create KR',
          text: 'サンプルテキストtips1サンプルテキストtips1サンプルテキストtips1サンプルテキスト'
        },
        objectiveTip:{
          title: 'How to create Objective',
          text: 'サンプルテキストtips1サンプルテキストtips1サンプルテキストtips1サンプルテキスト'
        },
        formData: {
          parentId: null,
          objective: '',
          keyresults: [
            {
              key: '',
              result: ''
            }
          ],
          name: '',
          date_end: '',
          date_start: ''
        }
      }
    },
    computed: {
      backLink() {
        if(this.type == 'company') {
          return '/admin/okr/company/list'
        }
        else if(this.type == 'team') {
          return '/admin/team/'+this.team_id
        }
      },
      parentTeam() {
        if(this.currentTeam) {
          return this.currentTeam.parentTeam
        }
        return null;
      },
      currentTeam() {
        return this.$store.getters.getTeam(this.team_id)
      },
      currentCompany() {
        return this.$store.getters.currentCompany
      },
      parentTeamOkr() {
        if(this.type == 'team') {
          if(this.parentTeam) {
            return this.$store.state.okr.teamList
          }
          return this.$store.state.okr.companyList
          }
        return []
      },
      selectedParentOkr() {
        if(!this.parentTeamOkr) return null;
        return this.parentTeamOkr.find((x) => {
          return x._id === this.formData.parentId
        })
      },
      preconfirmDisable() {
        const formData = this.formData

        if(!formData.name) {
          return true
        }
        if(!formData.date_start) {
          return true
        }
        if(!formData.date_end) {
          return true
        }

        return false
      },
      showDraftSave() {
        if(!this.formData.name) return false
        if(this.formData.status == 'preconfirm') return false
        return true
      },
    },
    watch: {
      selectedParentOkr(okr) {
        if(okr) {
          this.formData.date_start = okr.date_start
          this.formData.date_end  = okr.date_end
        }
      }
    },
    methods: {
      prevStep() {
        if(this.step > 1) {
          this.keyresultTipShow = false
          this.objectiveTipShow = false
          this.step--
        }
      },
      nextStep(status) {
        if(this.steps.length >= this.step+1) {
          this.keyresultTipShow = false
          this.objectiveTipShow = false
          this.step++
          if(status == 'draft') {
            this.save('draft')
          }
        }
      },
      addKR() {
        this.formData.keyresults.push({
          status: 'new',
          key: '',
          result: ''
        })
      },
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
      save(status, redirect) {

        let url = '/okr/create'
        if(this.okrId) {
          url = '/okr/update/'+this.okrId
        }

        Vue.$api.post(url, {
          name: this.formData.name,
          objective: this.formData.objective,
          keyresults: this.formData.keyresults,
          ownerId: this.currentUser._id,
          companyId: this.currentCompany ? this.currentCompany._id : null,
          teamId: this.currentTeam ? this.currentTeam._id : null,
          parentId: this.formData.parentId ? this.formData.parentId : null,
          status: status,
          type: this.type,
          date_start: this.formData.date_start,
          date_end: this.formData.date_end,
        })
        .then((response) => {
          this.okrId = response.data.okr._id
          if(status == 'preconfirm' || redirect == true) {

            if(this.type == 'company') {
              this.$router.push('/admin/okr/company/list')
            }
            else if(this.type == 'team') {
              this.$router.push('/admin/team/'+this.team_id)
            }
          }
        })
        return false;
      }
    }
  }
</script>
