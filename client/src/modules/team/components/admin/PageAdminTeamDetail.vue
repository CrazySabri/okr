<template>

  <layout-management>
    <div v-if="team">

      <div class="content-container wrap--content border--curved">
        <div class="float--right">
          <router-link to="/admin/team" class="btn btn-outline-primary">Back</router-link>

          <template v-if="canUpdateTeam(team)">
            <router-link :to="'/admin/team/update/'+team._id" class="btn btn-primary">Update</router-link>
          </template>
        </div>
        <div class="team-header">
          <div class="team-header_image">
            <span class="avatar-user size--adminheader">
              <img src="/static/img/dummy-team-avatar.png" />
            </span>
          </div>
          <div class="team-header_profile">
            <p class="team-header_name">
              <span>{{ team.name }}</span>
            </p>
            <p class="team-header_team">
              <template v-if="team.parentTeam">
                <span>Parent team : <router-link :to="'/admin/team/'+team.parentTeam._id">{{ team.parentTeam.name }}</router-link></span>
              </template>
            </p>
          </div>
          <div class="clear--both"></div>
        </div>
      </div>


      <div class="content-container background--transparent">
        <div class="row">
          <div class="col-xs-6">
            <div class="content-container wrap--content border--curved">
              <div class="label-title">
                <h4>Vision</h4>
              </div>
              <template v-if="team.vision">
                <p>{{ team.vision }}</p>
              </template>
              <template v-else>
                <p class="text--unassigned">There is no vision</p>
              </template>
            </div>
          </div>
          <div class="col-xs-6">
            <div class="content-container wrap--content border--curved">
              <div class="label-title">
                <h4>Mission</h4>
              </div>
              <template v-if="team.mission">
                <p>{{ team.mission }}</p>
              </template>
              <template v-else>
                <p class="text--unassigned">There is no mission</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="content-container background--transparent">

        <div class="content-title position--outside">
          <div class="float--right">
            <router-link :to="'/admin/okr/build/team/id/'+team._id" class="btn btn-primary">Create a new OKR</router-link>
          </div>
          <h1>OKR List</h1>
        </div>

        <div class="content-container wrap--content border--curved">
          <template v-if="!teamOkrList || !teamOkrList.length">
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
                <tr v-for="(okr, index) in teamOkrList">
                  <th scope="row">{{ index+1 }}</th>
                  <template v-if="okr.status != 'confirmed'">
                    <td><router-link :to="'/admin/okr/build/team/id/'+okr.teamId+'/'+okr._id">{{ okr.name }}</router-link></td>
                  </template>
                  <template v-else>
                    <td>{{ okr.name }}</td>
                  </template>
                  <td>{{ getDateFormat(okr.date_start) }}　〜　{{ getDateFormat(okr.date_end) }}</td>
                  <td>{{ okr.status }}</td>
                  <td>
                    <template v-if="canUpdateTeam(team) && okr.status == 'preconfirm'">
                      <router-link :to="'/admin/okr/preconfirm/'+okr.type+'/'+okr._id">Confirm it</router-link>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div>

      <template v-if="team.members && team.members.length">
        <div class="content-title position--outside">
          <h1>Members</h1>
        </div>
        <div class="content-container wrap--content border--curved">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in team.members">
                <th scope="row">{{ index+1 }}</th>
                <td><router-link :to="'/admin/account/'+member._id">{{ member.profile.lastname }} {{ member.profile.firstname }}</router-link></td>
                <td>{{ member.email }}</td>
                <td class="text--right">
                  <router-link :to="'/admin/okr/member/'+member._id+'/team/'+team._id" class="btn btn-outline-primary">OKR list</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template v-if="team.managers && team.managers.length">
        <div class="content-title position--outside">
          <h1>Managers</h1>
        </div>
        <div class="content-container wrap--content border--curved">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(manager, index) in team.managers">
                <th scope="row">{{ index+1 }}</th>
                <td><router-link :to="'/admin/account/'+manager._id">{{ manager.profile.lastname }} {{ manager.profile.firstname }}</router-link></td>
                <td>{{ manager.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
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
      id: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.onMounted()
    },
    computed: {
      team() {
        return this.$store.getters.getTeam(this.id)
      },
      teamOkrList() {
        return this.$store.state.okr.teamList
      }
    },
    watch: {
      "$route" (to, from) {
        this.onMounted()
      }
    },
    methods: {
      onMounted() {
        Vue.$service.team.fetchOneTeam(this.id)
        .then((data) => {
          this.$store.dispatch('fetchOneTeam', data)
        })
        Vue.$service.okr.fetchTeamOkr(this.id)
        .then((data) => {
          this.$store.dispatch('fetchTeamOkr', data)
        })
      }
    }
  }
</script>
