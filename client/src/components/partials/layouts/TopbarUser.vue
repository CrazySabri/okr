<template>

  <div class="header-menu--container">
    <div class="content-container wrap--content border--curved">
      <div class="text-center topbar-img">
        <router-link to="#">
          <span class="avatar-user size--profile">
            <img src="/static/img/dummy-avatar.jpg" />
          </span>
          <h4>{{ currentUser.profile.lastname }} {{ currentUser.profile.firstname }}</h4>
        </router-link>
      </div>
      <hr />
      <div class="row text--center">
        <div class="topbar-menu">
          <router-link to="#">
            <div class="topbar-menu--title">
              <h4>OKR</h4>
            </div>
            <div class="text--count">{{ OKRcount ? OKRcount : '-' }}</div>
          </router-link>
        </div>
        <div class="topbar-menu">
          <router-link to="#">
            <div class="topbar-menu--title">
              <h4>To dos</h4>
            </div>
            <div class="text--count">{{ todoscount ? todoscount : '-' }}</div>
          </router-link>
        </div>
        <div class="topbar-menu">
          <router-link to="#">
            <div class="topbar-menu--title">
              <h4>Day left</h4>
            </div>
            <div class="text--count">{{ dayleftcount ? dayleftcount : '-' }}</div>
          </router-link>
        </div>
        <div class="topbar-menu">
          <router-link to="#">
            <div class="topbar-menu--title">
              <h4>Progress</h4>
            </div>
            <div class="text--count">{{ progresscount ? progresscount : '-' }}</div>
          </router-link>
        </div>
        <div class="topbar-menu">
          <router-link to="#">
            <div class="topbar-menu--title">
              <h4>Question</h4>
            </div>
            <div class="text--count">{{ questioncount ? questioncount : '-' }}</div>
          </router-link>
        </div>
        <div class="topbar-menu">
          <router-link to="#">
            <div class="topbar-menu--title">
              <h4>Answer</h4>
            </div>
            <div class="text--count">{{ answercount ? answercount : '-' }}</div>
          </router-link>
        </div>
      </div>
      <hr />
      <div>
        <div class="float--left">
          <router-link to="/mypage/settings/">
            Settings
          </router-link>
        </div>
        <div class="float--right">
          <router-link to="/logout">
            <span class="glyphicon glyphicon-log-out"></span>
          </router-link>
        </div>
        <div class="clear--both"></div>
      </div>
    </div>
  </div>


</template>

<script>
  import Vue from 'vue'

  export default {
    computed: {
      OKRcount() {
        return 10
      },
      todoscount() {
        return 10
      },
      dayleftcount() {
        return 10
      },
      progresscount() {
        return 10
      },
      questioncount() {
        return 10
      },
      answercount() {
        return 10
      }
    }

  }
</script>
