<template>
  <div class="sidebar-personal">
    <div>
      <span class="avatar-user size--sidebarprofile">
        <img src="/static/img/dummy-avatar.jpg" />
      </span>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <div class="label-title">
          <h4>Fullname</h4>
        </div>
        <p>{{ fullname }}</p>
      </li>
      <li class="list-group-item" v-if="position">
        <div class="label-title">
          <h4>Position</h4>
        </div>
        <p>{{ position }}</p>
      </li>
      <li class="list-group-item">
        <div class="label-title">
          <h4>Doing is best since</h4>
        </div>
        <p><strong>{{ date_hire_diff }} months</strong></p>
      </li>
      <li class="list-group-item" v-if="teams && teams.length">
        <div class="label-title">
          <h4>Teams</h4>
        </div>
        <template v-for="team in teams">
          <router-link :to="'/team/'+team.id">{{ team.name }}</router-link>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      user_id: {
        type: String,
        required: true
      }
    },
    computed: {
      account() {
        return this.$store.state.account.oneFetched
      },
      fullname() {
        if(!this.account) return null;
        return this.account.profile.lastname+' '+this.account.profile.firstname
      },
      position() {
        if(!this.account) return null;
        return this.account.profile.position
      },
      teams() {
        return []
      },
      date_hire_diff() {
        if(!this.account) return null;
        let date_hire = this.account.date_created
        let months = moment().diff(date_hire, 'month')
        return months
      }
    },
    mounted() {
      this.$store.dispatch('fetchOneAccount', this.user_id)
    }
  }
</script>
