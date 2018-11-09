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
                <div class="col-md-2">
                  <h4>Rapports</h4>
                  <span class="text--count">{{ rapports && rapports.length ? rapports.length : '-' }}</span>
                </div>
                <div class="col-md-2">
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
                      <p>{{ keyresult.key }}、{{ keyresult.result }}</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="content-container wrap--content border--curved">
                  <p>Keys results is not set up</p>
                </div>
              </template>
            </div>
            <todos-list></todos-list>
            <rapport-list :okr="currentOkr"></rapport-list>

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
  import AppTimeline from '@/modules/timeline/components/AppTimeline';
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
        tab: 'active',
        one: null
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

        let days = moment(date_end).diff(moment(), 'days')
        days = days < 0 ? 0 : days
        return days;
      },
      currentOkr() {
        let okr = this.one
        if(!okr) return null;

        okr.keyresults = okr.keyresults.filter((kr) => {
          return kr.key && kr.result
        })

        okr.date_start = moment(okr.date_start).format('YYYY/MM/DD')
        okr.date_end = moment(okr.date_end).format('YYYY/MM/DD')

        return Object.assign({
          todos: [1,2,3,4,5,6],
          rapports: [],
          members: [], //if team
          groups: [], //if group
          progression: 100,
        }, okr)
      },
      rapports() {
        return this.$store.state.okr.okrRapports
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
    methods: {
      onMounted() {
        Vue.$api.get('/okr/get/'+this.type+'/'+this.id)
        .then((response) => {
          if(response.data) {
            this.one = response.data

            if(response.data.status !== 'confirmed') {
              this.$router.push('/mypage')
            }
          }
        })
      }
    }
  }
</script>
