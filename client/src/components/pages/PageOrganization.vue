<template>

  <layout-default>
    <div class="page-organization">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-organization></sidebar-organization>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>Organization</h1>
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
                <okr-grid :list="okrList" type="company" :filter="tab"></okr-grid>
              </div>
            </template>
          </div>
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
  import SidebarOrganization from '@/components/partials/common/SidebarOrganization';
  import SidebarEmployees from '@/components/partials/common/SidebarEmployees';
  import OkrGridList from '@/components/partials/okr/GridList';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-organization': SidebarOrganization,
      'sidebar-employees': SidebarEmployees,
      'okr-grid': OkrGridList,
    },
    data() {
      return {
        tab: 'active'
      }
    },
    mounted() {
      Vue.$service.okr.fetchCompanyOkr(this.$store.getters.currentCompanyId)
      .then((data) => {
        this.$store.dispatch('fetchCompanyOkr', data)
      })
    },
    computed: {
      okrList() {
        let data = this.$store.state.okr.companyList
        if(data && data.length) {
          data = data.filter((x) => {
            if(x.status === 'confirmed') {
              return true
            }
            return false
          })
        }
        return data
      }
    }
  }
</script>
