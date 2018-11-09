<template>
  <div class="app-navbar navbar" v-if="currentUser">
    <div class="page--inner position--relative">
      <div class="navbar-header">
          <a class="navbar-brand" href="#">Project OKR : {{ companyName }}</a>
      </div>
      <div class="float--right">
        <div @click="showTopbarNotificationPanel = !showTopbarNotificationPanel" class="float--left topbar-alert">
          <span class="glyphicon glyphicon-bell navbar-icon"></span>
          <span class="glyphicon glyphicon-info-sign navbar-icon--notification"></span>
        </div>
        <div @click="showTopbarUserPanel = !showTopbarUserPanel" class="float--left topbar-name">
          {{ currentUser.profile.lastname }} {{ currentUser.profile.firstname }}
          <span class="glyphicon glyphicon-chevron-down"></span>
        </div>
        <div class="float--left topbar-question">
          <router-link to="/help">
            <span class="glyphicon glyphicon-question-sign navbar-icon"></span>
          </router-link>
        </div>
        <div>
          <topbar-user v-show="showTopbarUserPanel"></topbar-user>
          <topbar-notification @childs-event="closeNotificationPanel" v-show="showTopbarNotificationPanel"></topbar-notification>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopbarUser from './TopbarUser'
  import TopbarNotification from './TopbarNotification'
  export default {
    name: 'LayoutTopbar',
    data() {
      return {
        showTopbarUserPanel: false,
        showTopbarNotificationPanel: false
      }
    },
    components: {
      'topbar-user': TopbarUser,
      'topbar-notification': TopbarNotification
    },
    computed: {
      companyName() {
        return this.$store.getters.currentCompanyName
      }
    },
    methods: {
      closeNotificationPanel: function() {
        this.showTopbarNotificationPanel = false;
      }
    }
  }
</script>
