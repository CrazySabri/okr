<template>
  <div>
    <template v-if="okrlist && okrlist.length">
      <div class="row okr-grid">
        <div class="col-md-4" v-for="item in okrlist">
          <div class="okr-grid_item">
            <router-link :to="'/okr/'+item.type+'/'+item._id" class="link--absolute"></router-link>
            <div class="content-container wrap--gridokr border--curved">
              <div class="okr-grid_title">
                <h3>{{ item.name }}</h3>
              </div>
              <div class="okr-grid_info">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Keys results</h4>
                    <span class="text--count">{{ item.keyresults && item.keyresults.length ? item.keyresults.length : '-' }}</span>
                  </div>
                  <div class="col-md-6">
                    <h4>Todos</h4>
                    <span class="text--count">{{ item.todos && item.todos.length ? item.todos.length : '-' }}</span>
                  </div>
                  <template v-if="item.type == 'personal'">
                    <div class="col-md-6">
                      <h4>Rapports</h4>
                      <span class="text--count">{{ item.rapports && item.rapports.length ? item.rapports.length : '-' }}</span>
                    </div>
                  </template>
                  <template v-else-if="item.type == 'team'">
                    <div class="col-md-6">
                      <h4>Employees</h4>
                      <span class="text--count">{{ item.members && item.members.length ? item.members.length : '-' }}</span>
                    </div>
                  </template>
                  <template v-else-if="item.type == 'group'">
                    <div class="col-md-6">
                      <h4>Groups</h4>
                      <span class="text--count">{{ item.groups ? item.groups : '-' }}</span>
                    </div>
                  </template>
                  <div class="col-md-6">
                    <h4>Progression</h4>
                    <span class="text--count">{{ item.progression ? item.progression+'%' : '-' }}</span>
                  </div>
                </div>
              </div>
              <div class="okr-grid_footer">
                <p class="text--date">{{ item.date_start }} - {{ item.date_end }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content-nodata">
        <p>There is no OKR</p>
      </div>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'

  export default {
    props: {
      type: {
        type: String,
        required: false,
        default: 'personal'
      },
      filter: {
        type: String,
        required: false,
        default: 'all'
      },
      list: {
        type: Array,
        required: true
      }
    },
    computed: {
      okrlist() {

        let data = this.list
        let now = Date.now()/1000

        data.map((x) => {
          x.date_end = 1567475635
          x.date_start = 1527475635
        })
        data = data.filter((x) => {
          if(this.filter == 'active' && x.date_end < now) {
            return false
          }
          else if(this.filter == 'past' && x.date_end >= now) {
            return false
          }
          return true
        })
        data.map((x) => {
          x.date_end = moment.unix(x.date_end).format('YYYY/MM/DD')
          x.date_start = moment.unix(x.date_start).format('YYYY/MM/DD')
        })

        return this.sort(data, 'date_start', false)
      }
    },
    methods: {
      sort(arr, key, desc)  {
        if(!desc) {
          return arr.sort(function(a,b) {return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);} );
        }
        return arr.sort(function(a,b) {return (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);} );
      }
    }
  }
</script>
