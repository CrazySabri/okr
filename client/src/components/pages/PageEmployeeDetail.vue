<template>

  <layout-default>
    <div class="page-employee-detail">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-employees></sidebar-employees>
          </div>
          <div class="page-content" v-if="currentEmployee">
            <div class="content-container wrap--content border--curved">
              <div class="employee-header">
                <div class="employee-header_image">
                  <span class="avatar-user size--profile">
                    <img src="/static/img/dummy-avatar.jpg" />
                  </span>
                </div>
                <div class="employee-header_profile">
                  <p class="employee-header_name">
                    <span>{{ currentEmployee.profile.lastname }} {{ currentEmployee.profile.firstname }}</span>
                  </p>
                  <p class="employee-header_position">
                    <span>{{ currentEmployee.position }}</span>
                  </p>
                  <p class="employee-header_team">
                    <template v-if="currentEmployee.team">
                      <span>{{ currentEmployee.team.name }}</span>
                    </template>
                    <template v-else>
                      <span class="text--unassigned">No assigned to a team</span>
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
              <app-timeline></app-timeline>
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
                <okr-grid type="personal" :filter="tab"></okr-grid>
                <app-timeline></app-timeline>
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
  import SidebarEmployees from '@/components/partials/common/SidebarEmployees';
  import OkrGridList from '@/components/partials/okr/GridList';
  import AppTimeline from '@/components/partials/okr/AppTimeline';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-employees': SidebarEmployees,
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
      currentEmployee() {
        return this.$store.state.company.companyMembers.find((x) => {
          return x._id === this.id
        })
      }
    }
  }
</script>
