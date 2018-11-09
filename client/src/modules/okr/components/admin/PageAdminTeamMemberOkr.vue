<template>

  <layout-management>
    <div class="page-content" v-if="user">
      <div class="content-container wrap--content border--curved">
        <div class="float--right">
          <template v-if="team && canUpdateTeam(team)">
            <router-link :to="'/admin/team/'+team._id" class="btn btn-outline-primary">Back</router-link>
            <router-link :to="'/admin/okr/member/'+user._id+'/team/'+team._id+'/newrequest'" class="btn btn-primary">Request a new OKR</router-link>
          </template>
        </div>
        <div class="page-title">
          <h1>OKR : {{ user.profile.lastname }} {{ user.profile.firstname }}</h1>
        </div>
      </div>

      <div class="content-title position--outside">
        <h1>OKR List</h1>
      </div>
      <div class="content-container wrap--content border--curved">
        <template v-if="!okrList || !okrList.length">
          <div class="content-nodata">
            <p>There is no OKR</p>
          </div>
        </template>
        <template v-else>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(okr, index) in okrList">
                <th scope="row">{{ index+1 }}</th>
                <template v-if="okr.status != 'confirmed'">
                  <td><router-link :to="'/admin/okr/build/company/'+okr._id">{{ okr.name }}</router-link></td>
                </template>
                <template v-else>
                  <td>{{ okr.name }}</td>
                </template>
                <td>{{ getDateFormat(okr.date_start) }}　〜　{{ getDateFormat(okr.date_end) }}</td>
                <td>{{ okr.status }}</td>
                <td>
                  <template v-if="okr.status == 'preconfirm'">
                    <router-link :to="'/admin/okr/preconfirm/'+okr.type+'/'+okr._id">Confirm it</router-link>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>



    </div>

  </layout-management>

</template>

<script>
  import Vue from 'vue'
  import LayoutManagement from '@/components/layouts/LayoutManagement';

  export default {
    components: {
      'layout-management': LayoutManagement
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
    mounted() {
      Vue.$service.okr.fetchPersonalOkr(this.user_id)
      .then((data) => {
        this.$store.dispatch('fetchPersonalOkr', data)
      })

      Vue.$service.account.fetchOneAccount(this.user_id)
      .then((data) => {
        this.$store.dispatch('fetchOneAccount', data)
      })

      if(this.team_id) {
        Vue.$service.team.fetchOneTeam(this.team_id)
        .then((data) => {
          this.$store.dispatch('fetchOneTeam', data)
        })
      }
    },
    computed: {
      user() {
        return this.$store.getters.getAccount(this.user_id)
      },
      team() {
        return this.$store.getters.getTeam(this.team_id)
      },
      okrList() {
        if(this.team_id) {
          return this.$store.state.okr.personalList.filter((x) => {
            return x.teamId === this.team_id
            })
        }
        return this.$store.state.okr.personalList
      }
    },

  }
</script>
