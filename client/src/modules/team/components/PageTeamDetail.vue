<template>

  <layout-default>
    <div class="page-team-detail">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-teams></sidebar-teams>
          </div>
          <div class="page-content" v-if="currentTeam">
            <div class="content-container wrap--content border--curved">
              <div class="team-header">
                <div class="team-header_image">
                  <span class="avatar-user size--profile">
                    <img src="/static/img/dummy-team-avatar.png" />
                  </span>
                </div>
                <div class="team-header_profile">
                  <p class="team-header_name">
                    <span>{{ currentTeam.name }}</span>
                  </p>
                  <p class="team-header_position" v-if="currentTeam.members">
                    <span>Employees : {{ currentTeam.members.length }}</span>
                  </p>
                  <p class="team-header_team">
                    <template v-if="currentTeam.parentTeam">
                      <span>Parent team : <router-link :to="'/team/'+currentTeam.parentTeam._id">{{ currentTeam.parentTeam.name }}</router-link></span>
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
                    <template v-if="currentTeam.vision">
                      <p>{{ currentTeam.vision }}</p>
                    </template>
                    <template v-else>
                      <p class="text--unassigned">There is not vision</p>
                    </template>
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="content-container wrap--content border--curved">
                    <div class="label-title">
                      <h4>Mission</h4>
                    </div>
                    <template v-if="currentTeam.mission">
                      <p>{{ currentTeam.mission }}</p>
                    </template>
                    <template v-else>
                      <p class="text--unassigned">There is not vision</p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="currentTeam.members && currentTeam.members.length">
              <div class="content-container background--transparent">
                <div class="content-title position--outside">
                  <h2>Members</h2>
                </div>
                <team-user-list :members="currentTeam.members" />
              </div>
            </template>


            <template v-if="!okrList || !okrList.length">
              <div class="content-nodata">
                <p>There is no OKR</p>
              </div>
            </template>
            <template v-else>
              <div class="content-container wrap--content border--curved">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link" :class="{'active': tab == 'active'}" @click.stop="tab = 'active'">Active OKR</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link"  :class="{'active': tab == 'past'}" @click.stop="tab = 'past'">Past OKR</a>
                  </li>
                </ul>
              </div>
              <div>
                <okr-grid :list="okrList" type="team" :filter="tab"></okr-grid>
                <app-timeline type="team"></app-timeline>
              </div>
            </template>
          </div>
          <div class="clear--both"></div>
        </div>
      </div>
    </div>
  </layout-default>

</template>

<script>
  import Vue from 'vue'
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import SidebarTeams from '@/components/partials/common/SidebarTeams';
  import OkrGridList from '@/components/partials/okr/GridList';
  import AppTimeline from '@/modules/timeline/components/AppTimeline';
  import TeamUserList from '@/components/partials/common/TeamUserList';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-teams': SidebarTeams,
      'okr-grid': OkrGridList,
      'app-timeline': AppTimeline,
      'team-user-list': TeamUserList
    },
    data() {
      return {
        tab: 'active'
      }
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    watch: {
      "$route" (to, from) {
        this.onMounted()
      }
    },
    mounted() {
      this.onMounted()
    },
    computed: {
      okrList() {
        let data = this.$store.state.okr.teamList
        if(data && data.length) {
          data = data.filter((x) => {
            if(x.status === 'confirmed') {
              return true
            }
            return false
          })
        }
        return data
      },
      team() {
        return this.$store.getters.getTeam(this.id)
      },
      currentTeam() {
        let teamList = this.$store.state.team.list.find((x) => {
          return x._id === this.id
        })

        if(this.team) {
          return {
            ...teamList,
            members: this.team.members,
            managers: this.team.managers,
            parentTeam: this.team.parentTeam
          }
        }
        return teamList
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
