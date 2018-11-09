<template>

  <layout-management>

    <container-tips :tip="checkinTip" :show="checkinTipShow"></container-tips>

    <div v-if="user">
      <div class="content-container wrap--content border--curved">
        <div class="float--right">
          <template v-if="team && canUpdateTeam(team)">
            <router-link :to="'/admin/team/'+team._id" class="btn btn-outline-primary">Back</router-link>
          </template>
        </div>
        <div class="page-title">
          <h1>New OKR Request</h1>
        </div>
      </div>

      <div class="content-container wrap--content border--curved" v-if="team">

        <div class="form-group">
          <div class="row">
            <div class="col-xs-6">
              <div class="label-title">
                <h1>Team</h1>
              </div>
              <p>{{ team.name }}</p>
            </div>
            <div class="col-xs-6">
              <div class="label-title">
                <h1>Member</h1>
              </div>
              <p>{{ user.profile.lastname }} {{ user.profile.firstname }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="content-container wrap--content border--curved">
        <div class="form-group">
          <div class="row">
            <div class="col-xs-4">
              <div class="label-title">
                <h1>Date start</h1>
              </div>
              <datepicker inputClass="ui-input--text" :bootstrapStyling="true"　v-model="formData.date_start" ></datepicker>
            </div>
            <div class="col-xs-4">
              <div class="label-title">
                <h1>Date end</h1>
              </div>
              <datepicker　inputClass="ui-input--text" :bootstrapStyling="true"　v-model="formData.date_end" ></datepicker>
            </div>
            <div class="col-xs-4">
              <div class="label-title">
                <button class="btn btn-outline-primary float--right" @click="checkinTipShow = !checkinTipShow">
                  <span class="glyphicon glyphicon-question-sign"></span>
                </button>
                <h1>Check In</h1>
              </div>
              <select class="ui-input--text" v-model="formData.checkinInterval" :disabled="!checkinInterval.length" @change="setCheckins()">
                <option :value="interval" v-for="interval in checkinInterval">Every {{ interval | capitalize }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <template v-if="formData.checkinInterval && formData.date_end && formData.date_start">

        <div class="content-title position--outside">
          <h1>Check-ins</h1>
        </div>
        <div class="content-container wrap--content border--curved">

          <div class="row">
            <div class="col-xs-3" v-for="(checkin, index) in this.checkins">
              <div class="label-title">
                <h4>
                  {{ checkin.title }}
                </h4>
              </div>
              <datepicker　inputClass="ui-input--text" :bootstrapStyling="true"　v-model="checkin.date" ></datepicker>
            </div>
          </div>
        </div>

      </template>
      <div class="form-group">
        <div class="text--center wrap--content">
          <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Create a new request</button>
        </div>
      </div>
    </div>
  </layout-management>

</template>

<script>
  import Vue from 'vue'
  import moment from 'moment';
  import LayoutManagement from '@/components/layouts/LayoutManagement';
  import Datepicker from '@/components/partials/ui/form/Datepicker'
  import TipsContainer from '@/components/partials/ui/TipsContainer';

  export default {
    components: {
      'layout-management': LayoutManagement,
      'datepicker': Datepicker,
      'container-tips': TipsContainer
    },
    props: {
      team_id: {
        type: String,
        required: false
      },
      user_id: {
        type: String,
        required: true
      }
    },
    watch: {
      checkinInterval() {
        if(this.checkinInterval.indexOf(this.formData.checkinInterval) < 0) {
          this.formData.checkinInterval = this.checkinInterval[0]
        }
      },
      "formData.date_start"() {
        this.setCheckins(this.formData.checkinInterval)
      },
      "formData.date_end"() {
        this.setCheckins(this.formData.checkinInterval)
      }
    },
    data() {
      return {
        checkins: [],
        checkinTipShow: false,
        checkinTip: {
          title: 'What is Check in ?',
          text: 'サンプルテキストWhat is Check inサンプルテキストtips1サンプルテキストtips1サンプルテキスト'
        },
        okr_team_id: this.team_id,
        formData: {
          date_start: '',
          date_end: '',
          companyId: this.$store.getters.currentCompanyId,
          teamId: this.team_id,
          personalId: this.user_id,
          checkins: this.checkins
        }
      }
    },
    mounted() {
      if(this.team_id) {
        Vue.$service.team.fetchOneTeam(this.team_id)
        .then((data) => {
          this.$store.dispatch('fetchOneTeam', data)
        })
      }
      Vue.$service.account.fetchOneAccount(this.user_id)
      .then((data) => {
        this.$store.dispatch('fetchOneAccount', data)
      })
    },
    computed: {
      user() {
        return this.$store.getters.getAccount(this.user_id)
      },
      team() {
        return this.$store.getters.getTeam(this.team_id)
      },

      checkinInterval() {
        if(this.formData.date_end && this.formData.date_start) {
          let de = moment(this.formData.date_end)
          let ds = moment(this.formData.date_start)


          let diff_months = parseInt(de.diff(ds, 'months'))
          if(diff_months) {
            return ['month', 'week', 'day']
          }

          let diff_weeks = parseInt(de.diff(ds, 'weeks'))
          let diff_days = parseInt(de.diff(ds, 'days'))

          if(diff_weeks && diff_days > 8) {
            return ['week', 'day']
          }

          if(diff_days > 2) {
            return ['day']
          }
          return []
        }
        return []
      }
    },
    methods: {
      setCheckins(interval) {
        if(interval === undefined) {
          interval = this.formData.checkinInterval
        }
        console.log('interval', interval)
        let checkins = []
        if(interval) {
          let ds = moment(this.formData.date_start)
          let de = moment(this.formData.date_end)
          let di;
          let i = 1;
          while(!di || de.unix() > di.unix()) {
            di = moment(this.formData.date_start).add(i, interval+'s')

            checkins.push({
              title: 'Check In '+i,
              date: di.format('YYYY/MM/DD')
            })
            i++
          }
        }
        this.checkins = checkins
      },
      onSubmit() {
        Vue.$api.post('/okr/create', {
          name: this.formData.name,
          ownerId: this.currentUser._id,
          companyId: this.formData.companyId,
          teamId: this.formData.teamId,
          parentId: this.formData.parentId ? this.formData.parentId : null,
          personalId: this.formData.personalId,
          status: 'request',
          type: 'personal',
          date_start: this.formData.date_start,
          date_end: this.formData.date_end,
        })
        .then((response) => {
          this.$router.push('/admin/okr/member/'+this.user._id+'/team/'+this.team_id)
        })

        return false
      }
    }
  }
</script>
