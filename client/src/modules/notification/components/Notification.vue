<template>
  <div class="notification-container" v-if="notices.length && hasModuleAccess('notification')">
    <div class="notification-list-item" :class="'notification-list-item--'+notice.type" v-for="(notice, index) in notices" @click="onNoticeClick(index)" :key="index">
      {{ notice.text }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

  export default {
    mounted() {
      this.hideNotification()
    },
    computed: {
      notices() {
        return this.$store.getters.getNotices
      }
    },
    watch: {
      notices() {
        this.hideNotification()
      }
    },
    methods: {
      onNoticeClick(index) {
        this.$store.dispatch('deleteNotification', index)
      },
      hideNotification() {
        setTimeout(() => {
         this.$store.dispatch('deleteNotification', this.notices.length-1)
        }, 3000)
      }
    }
  }
</script>
