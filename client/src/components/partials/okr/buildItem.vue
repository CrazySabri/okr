<template>
  <div class="content-container wrap--content border--curved" v-if="currentOkr">
    <div class="row">
      <div class="col-md-2" v-if="currentTeam">
        <div class="label-title">
          <h4>Team / Group</h4>
        </div>
        <p class="text--default">
          <span>{{ currentTeam.name }}</span>
        </p>
      </div>
      <div class="col-md-2" v-if="ownerUser">
        <div class="label-title">
          <h4>Request by</h4>
        </div>
        <p class="text--default">
          <span>{{ ownerUser.profile.lastname }} {{ ownerUser.profile.firstname }}</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Key results</h4>
        </div>
        <p class="text--count">
          <span>{{ currentOkr.keyresults.length }}</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Date Range</h4>
        </div>
        <p class="text--date">
          <span>{{ currentOkr.date_start }} - {{ currentOkr.date_end }}</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Build Date limit</h4>
        </div>
        <p class="text--date">
          <span>2018/8/2<br />(5日 left)</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Status</h4>
        </div>
        <p class="text--status">
          <span>{{ currentOkr.status }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'

  export default {
    props: {
      okr: {
        type: Object,
        required: false,
        default: () => { return {} }
      }
    },
    mounted() {
      Vue.$service.team.fetchOneTeam(this.okr.teamId)
      .then((data) => {
        this.$store.dispatch('fetchOneTeam', data)
      })

      Vue.$service.account.fetchOneAccount(this.okr.ownerId)
      .then((data) => {
        this.$store.dispatch('fetchOneAccount', data)
      })
    },
    computed: {
      currentOkr() {
        if(this.okr) {
          return {
            ...this.okr,
            date_start: moment(this.okr.date_start).format('YYYY/MM/DD'),
            date_end: moment(this.okr.date_end).format('YYYY/MM/DD'),
          }
        }
        return false
      },
      currentTeam() {
        return this.$store.getters.getTeam(this.okr.teamId)
      },
      ownerUser() {
        return this.$store.getters.getAccount(this.okr.ownerId)
      }
    }
  }
</script>
