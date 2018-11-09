<template>

  <layout-default>
    <div class="page-okr_detail" v-if="currentOkr">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-okrs :okr="currentOkr"></sidebar-okrs>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="okr-header">
                <div class="okr-header_profile">
                  <p class="okr-header_name">
                    <span>{{ currentOkr.name }}</span>
                  </p>
                  <p class="okr-header_position">
                    <span>{{ currentOkr.position }}</span>
                  </p>
                  <p class="okr-header_team">
                    <template v-if="currentOkr.team">
                      <span>{{ currentOkr.team.name }}</span>
                    </template>
                    <template v-else>
                      <span class="text--unassigned">No assigned to a team</span>
                    </template>
                  </p>
                </div>
                <div class="clear--both"></div>
              </div>
            </div>
            <div class="okr-detail_header content-container wrap--content border--curved">
              <div class="row">
                <!--<div class="col-md-2">
                  <h4>Objectives</h4>
                  <span class="text--count">{{ currentOkr.objectives && currentOkr.objectives.length ? currentOkr.objectives.length : '-' }}</span>
                </div>-->
                <div class="col-md-2">
                  <h4>Key results</h4>
                  <span class="text--count">{{ currentOkr.keyresults && currentOkr.keyresults.length ? currentOkr.keyresults.length : '-' }}</span>
                </div>
                <div class="col-md-2">
                  <h4>Todos</h4>
                  <span class="text--count">{{ currentOkr.todos && currentOkr.todos.length ? currentOkr.todos.length : '-' }}</span>
                </div>
                <template v-if="currentOkr.type == 'group'">
                  <div class="col-md-2">
                    <h4>Groups</h4>
                    <span class="text--count">{{ currentOkr.groups && currentOkr.groups.length ? currentOkr.groups.length : '-' }}</span>
                  </div>
                </template>
                <template v-else-if="currentOkr.type == 'team'">
                  <div class="col-md-2">
                    <h4>Employees</h4>
                    <span class="text--count">{{ currentOkr.members && currentOkr.members.length ? currentOkr.members.length : '-' }}</span>
                  </div>
                </template>
                <template v-else-if="currentOkr.type == 'personal'">
                  <div class="col-md-2">
                    <h4>Rapports</h4>
                    <span class="text--count">{{ currentOkr.rapports && currentOkr.rapports.length ? currentOkr.rapports.length : '-' }}</span>
                  </div>
                </template>
                <div class="col-md-3">
                  <h4>Progression</h4>
                  <span class="text--count">{{ currentOkr.progression ? currentOkr.progression+'%' : '-' }}</span>
                </div>
                <div class="col-md-2">
                  <h4>Days left</h4>
                  <span class="text--count">{{ daysLeft !== null ? daysLeft+'日' : '-' }}</span>
                </div>
              </div>
            </div>

            <div class="content-title position--outside">
              <h2>Objective</h2>
            </div>
            <div class="content-container wrap--content border--curved">
              <template v-if="currentOkr.objective">
                <p>{{ currentOkr.objective }}</p>
              </template>
              <template v-else>
                <p>Objective is not set up</p>
              </template>
            </div>

            <div class="content-title position--outside">
              <h2>Key results</h2>
            </div>
            <div class="okr-detail_keyresults content-container background--transparent">
              <template v-if="currentOkr.keyresults.length">
                <div class="row">
                  <div :class="'col-md-'+colSize" v-for="(keyresult, index) in currentOkr.keyresults">
                    <div class="content-container wrap--content border--curved">
                      <h4>KR-{{ index+1 }}</h4>
                      <p>{{ keyresult }}</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <p>Keys results is not set up</p>
              </template>
            </div>
            <todos-list></todos-list>
            <rapport-list></rapport-list>

            <div class="content-title position--outside" id="tl">
              <h2>Timeline</h2>
            </div>
            <app-timeline></app-timeline>
          </div>
          <div class="clear--both"></div>
        </div>
      </div>
    </div>
  </layout-default>

</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import SidebarOkr from '@/components/partials/common/SidebarOkr';
  import AppTimeline from '@/components/partials/okr/AppTimeline';
  import TodosList from '@/components/partials/okr/TodosList';
  import RapportList from '@/components/partials/okr/RapportList';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-okrs': SidebarOkr,
      'app-timeline': AppTimeline,
      'todos-list': TodosList,
      'rapport-list': RapportList
    },
    data() {
      return {
        tab: 'active'
      }
    },
    props: {
      type: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      colSize() {
        if(!this.currentOkr || !this.currentOkr.keyresults || !this.currentOkr.keyresults.length)
          return 12;

        return Math.round(12 / this.currentOkr.keyresults.length)
      },
      daysLeft() {
        if(!this.currentOkr) return null;

        let date_end = this.currentOkr.date_end
        let date_start = this.currentOkr.date_start

        let days = moment().diff(date_end, 'days')
        return days;
      },
      currentOkr() {
        let okr = this.$store.state.okr.oneFetched
        if(!okr) return null;

        return Object.assign({
          id: 0,
          date_start: moment.unix(1330475635).format('YYYY/MM/DD'),
          date_end: moment.unix(1530479635).format('YYYY/MM/DD'),
          todos: [1,2,3,4,5,6],
          rapports: [],
          members: [], //if team
          groups: [], //if group
          progression: 100,
          team: {
            name: 'Team name'
          }
        }, okr)
      }
    },
    mounted() {
      this.$store.dispatch('fetchOneOkr', {
        id: this.id,
        type: this.type
      })
    }
  }
</script>
