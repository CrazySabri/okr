<template>
  <div class="sidebar-okrs">

    <div class="content-container wrap--content border--curved" v-if="currentTeam">
      <div>
        <div class="label-title">
          <h4>Current Team</h4>
        </div>
        <p><router-link :to="'/team/'+currentTeam._id">{{ currentTeam.name }}</router-link></p>
      </div>

      <template v-if="parentTeam">
        <hr />
        <div class="label-title">
          <h4>Parent Team</h4>
        </div>
        <p><router-link :to="'/team/'+parentTeam._id">{{ parentTeam.name }}</router-link></p>

      </template>

      <template v-if="(!currentTeam.parentId && parentTeamOkr) || (currentTeam.parentId && parentTeam && parentTeamOkr)">
        <hr />
        <div class="label-title">
          <h4>Parent {{ parentTeamOkr.type | capitalize }} OKR</h4>
        </div>
        <p><router-link :to="'/okr/'+parentTeamOkr.type+'/'+parentTeamOkr._id">{{ parentTeamOkr.name }}</router-link></p>
      </template>
    </div>

    <div class="content-container background--transparent">
      <template v-if="type == 'team'">
        <div class="label-title">
          <h4>Members</h4>
        </div>
        <sidebar-employees></sidebar-employees>
      </template>
      <template v-else-if="type == 'company'">
        <div class="label-title">
          <h4>Teams</h4>
        </div>
        <sidebar-teams></sidebar-teams>
      </template>
      <template v-else-if="type == 'personal'">
        <sidebar-personal :user_id="okr.ownerId"></sidebar-personal>
      </template>
    </div>
  </div>
</template>

<script>
  import SidebarTeams from '@/components/partials/common/SidebarTeams';
  import SidebarEmployees from '@/components/partials/common/SidebarEmployees';
  import SidebarPersonal from '@/components/partials/common/SidebarPersonal';
  import Vue from 'vue'

  export default {
    components: {
      'sidebar-teams': SidebarTeams,
      'sidebar-employees': SidebarEmployees,
      'sidebar-personal': SidebarPersonal
    },
    props: {
      okr: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        parentTeamOkr: null
      }
    },
    watch: {
      okr() {
        this.parentTeamOkr = null
        this.onMounted()
      }
    },
    mounted() {
      this.onMounted()
    },
    methods: {
      onMounted() {
        if(this.okr.teamId) {
          Vue.$service.team.fetchOneTeam(this.okr.teamId)
          .then((data) => {
            this.$store.dispatch('fetchOneTeam', data)
          })
        }

        if(this.okr.parentId) {
          Vue.$service.okr.fetchOneOkrNoType(this.okr.parentId)
          .then((data2) => {
            if(data2.status == 'confirmed') {
              this.parentTeamOkr = data2
            }
          })
        }
      }
    },
    computed: {
      type() {
        return this.okr.type
      },
      currentTeam() {
        return this.$store.getters.getTeam(this.okr.teamId)
      },
      parentTeam() {
        if(this.okr.parentId && this.currentTeam && this.currentTeam.parentTeam) {
          return this.currentTeam.parentTeam
        }
        return null
      }
    }
  }
</script>
