<template>

  <layout-fullscreen back="/mypage/okr/build" class="background--transparent">

    <container-tips :tip="objectiveTip" :show="objectiveTipShow"></container-tips>
    <container-tips :tip="keyresultTip" :show="keyresultTipShow"></container-tips>


    <div class="page-okr_build">
      <div class="background--fullscreen">
        <div class="fullscreen--inner wrap--fullscreen">

          <div class="page-title position--outside">
            <h1>Build Okr</h1>
          </div>
          <okr-build-item></okr-build-item>

          <div class="wrap--fullscreen">
            <div class="row">
              <template v-if="parentOkr">
                <div class="col-md-6">
                  <div class="content-container wrap--content border--curved" @click="showParentVision = !showParentVision">
                    <div class="ribbon-title">
                      <div class="float--left">
                        <span class="glyphicon" :class="showParentVision ? 'glyphicon-menu-down' : 'glyphicon-menu-up'"></span>
                      </div>
                      <h4>Team/Group Vision & Missions</h4>
                    </div>

                    <div v-show="showParentVision">
                      <hr />
                      <div class="label-title">
                        <h4>Vision</h4>
                      </div>
                      <p>{{ parentOkr.vision }}</p>

                      <hr />
                      <div class="label-title">
                        <h4>Missions</h4>
                      </div>
                      <p v-for="mission in parentOkr.missions">{{ mission }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="content-container wrap--content border--curved" @click="showParentOKR = !showParentOKR">
                    <div class="ribbon-title">
                      <div class="float--left">
                        <span class="glyphicon" :class="showParentOKR ? 'glyphicon-menu-down' : 'glyphicon-menu-up'"></span>
                      </div>
                      <h4>Team/Group OKR</h4>
                    </div>

                    <div v-show="showParentOKR">
                      <hr />
                      <div class="label-title">
                        <h4>Objective</h4>
                      </div>
                      <p>{{ parentOkr.objective }}</p>

                      <hr />
                      <div class="label-title">
                        <h4>Key results</h4>
                      </div>
                      <p v-for="keyresult in parentOkr.keyresults">{{ keyresult }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="fullscreen--inner wrap--fullscreen">

          <ui-stepper :steps="steps" :currentStep="step-1"></ui-stepper>

          <template v-if="managerComment">
            <div  class="alert alert-danger">
              <span class="glyphicon glyphicon-alert "></span> {{ managerComment }}
            </div>
          </template>
        </div>
      </div>
      <div class="background--fullscreen">
        <div class="fullscreen--inner wrap--fullscreen">
          <template v-if="step == 1">
            <button class="btn btn-outline-primary float--right" @click="objectiveTipShow = !objectiveTipShow">
              <span class="glyphicon glyphicon-question-sign"></span> Tips
            </button>

            <div class="content-container background--transparent content-title">
              <h1>Step 1 : Objective</h1>
            </div>

            <div class="content-container wrap--content border--curved">
              <template v-if="formData.objective.status == 'confirmed'">
                <p>{{ formData.objective.value }}</p>
              </template>
              <template v-else-if="formData.objective.status == 'remanded'">
                <div class="form-group">
                  <textarea class="form-control" v-model="formData.objective.value"></textarea>
                </div>
              </template>
              <template v-else-if="formData.objective.status == 'new'">
                <div class="form-group">
                  <textarea class="form-control" v-model="formData.objective.value"></textarea>
                </div>
              </template>
            </div>
          </template>

          <template v-else-if="step == 2">
            <button class="btn btn-outline-primary float--right" @click="keyresultTipShow = !keyresultTipShow">
              <span class="glyphicon glyphicon-question-sign"></span> Tips
            </button>

            <div class="content-title">
              <h1>Step 2 : Key results</h1>
            </div>

            <div class="wrap--fullscreen">
              <div v-for="(keyresult, index) in formData.keyresults" class="content-container wrap--content border--curved">

                <template v-if="keyresult.status == 'confirmed'">
                  <p>{{ getKeyResult(keyresult) }}</p>
                </template>
                <template v-else>
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

                </template>
              </div>

              <div class="text--center wrap--fullscreen">
                  <button class="btn btn-outline-primary" @click="addKR()"><span class="glyphicon glyphicon-plus-sign"></span> Add a KR</button>
              </div>
            </div>
          </template>

          <template v-else-if="step == 3">
            <div class="content-title">
              <h1>Step 3 : Confirm & Send to Manager</h1>
            </div>

            <div class="wrap--fullscreen">
              <div class="content-container background--transparent">
                <div class="label-title">
                  <h4>Objective</h4>
                </div>
                <p>{{ formData.objective.value }}</p>
              </div>

              <div class="content-container background--transparent" v-for="(keyresult, index) in formData.keyresults" v-if="keyresult.key && keyresult.result">
                <div class="label-title">
                  <h4>KR-{{ index+1 }}</h4>
                </div>
                <p>{{ keyresult.key }}、{{ keyresult.result }}</p>
              </div>
            </div>
            <div class="text--center wrap--fullscreen">
                <button class="ui-btn--main thick--big size--medium" @click="sendToManager()">Send</button>
            </div>
          </template>

          <div class="wrap--fullscreen">
            <template v-if="steps.length >= step+1">
              <div class="float--right">
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
  import TipsContainer from '@/components/partials/ui/TipsContainer';
  import StepperComponent from '@/components/partials/ui/Stepper';

  export default {
    components: {
      'layout-fullscreen': LayoutFullscreen,
      'okr-build-item': buildItem,
      'container-tips': TipsContainer,
      'ui-stepper': StepperComponent
    },
    data() {
      return {
        steps: [
          {
            title: 'Objective',
            description: 'Description description'
          },
          {
            title: 'Key results',
            description: 'Description description'
          },
          {
            title: 'Confirm',
            description: 'Description description'
          }
        ],
        step: 1,
        showParentVision: false,
        showParentOKR: false,
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
        managerComment: 'コメントコメントコメントコメントコメントコメントコメントコメントコメントコメント',
        formData: {
          objective: {
            status: 'remanded',
            value: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト'
          },
          keyresults: [
            {
              status: 'new',
              key: 'Objectiveサンプルテキスト',
              result: 'ObjectiveサンプルテキストObjectiveサンプルテキストObjectiveサンプルテキスト'
            }
          ]
        }
      }
    },
    computed: {
      parentOkr() {
        return {
          vision: 'ビージョンサンプルテキストビージョンサンプルテキストビージョンサンプルテキスト',
          missions: [
            'ミッションサンプルテキストサンプルテキストサンプル',
            'ミッションサンプルテキストサンプルテキストサンプル',
            'ミッションサンプルテキストサンプルテキストサンプル'
          ],
          objective: 'Objectiveサンプルテキスト',
          keyresults: [
            'KRサンプルテキストサンプルテキストサンプル',
            'KRサンプルテキストサンプルテキストサンプル',
            'KRサンプルテキストサンプルテキストサンプル'
          ]
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
      nextStep() {
        if(this.steps.length >= this.step+1) {
          this.keyresultTipShow = false
          this.objectiveTipShow = false
          this.step++
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
      sendToManager() {
        if(confirm('Send OK to Manager')) {
          this.$router.push('/mypage/okr/build')
        }
        return false;
      }
    }
  }
</script>
