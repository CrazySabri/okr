<template>

  <layout-default>
    <div class="page-team-detail">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
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
                    <template v-if="currentTeam.group">
                      <span>{{ currentTeam.group.name }}</span>
                    </template>
                    <template v-else>
                      <span class="text--unassigned">No assigned to a group</span>
                    </template>
                  </p>
                </div>
                <div class="clear--both"></div>
              </div>
            </div>
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
  //import Sidebarteams from '@/components/partials/common/Sidebarteams';
  import OkrGridList from '@/components/partials/okr/GridList';
  import AppTimeline from '@/components/partials/okr/AppTimeline';

  export default {
    components: {
      'layout-default': LayoutDefault,
      //'sidebar-teams': Sidebarteams,
      'okr-grid': OkrGridList,
      'app-timeline': AppTimeline
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
    computed: {
      okrList() {
        return []
      },
      currentTeam() {
        return this.$store.state.company.companyTeams.find((x) => {
          return x._id === this.id
        })
      }
    }
  }
</script>
