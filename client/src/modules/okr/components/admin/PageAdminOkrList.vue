<template>
  <layout-management>
    <div class="content-container wrap--content border--curved">
      <div class="float--right">
        <router-link to="/admin/okr/build/company" class="btn btn-primary">Create a new OKR</router-link>
      </div>
      <div class="page-title">
        <h1>Company OKR</h1>
      </div>
    </div>

    <div class="content-title position--outside">
      <h1>OKR List</h1>
    </div>
    <div class="content-container wrap--content border--curved">
      <template v-if="!companyOkrList || !companyOkrList.length">
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
            <tr v-for="(okr, index) in companyOkrList">
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
  </layout-management>

</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  import LayoutManagement from '@/components/layouts/LayoutManagement';

  export default {
    components: {
      'layout-management': LayoutManagement
    },
    mounted() {
      Vue.$service.okr.fetchCompanyOkr(this.$store.getters.currentCompanyId)
      .then((data) => {
        this.$store.dispatch('fetchCompanyOkr', data)
      })
    },
    computed: {
      companyOkrList() {
        return this.$store.state.okr.companyList
      }
    }
  }
</script>
