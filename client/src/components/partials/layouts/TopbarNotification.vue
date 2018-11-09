<template>
  <div class="header-notification--container">
    <div class="content-container border--curved">
      <ul class="notification-item--wrapper">
        <li class="notification-item" v-for="notification in notificationlist">{{ notification.content }}</li>
      </ul>
      <div @click="handleClick" class="notification-close">close</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    computed: {
      notificationlist() {
        return [
            { content: "texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"},
            { content: "text"},
            { content: "text"},
            { content: "text"}
        ]
      }
    },
    methods: {
      handleClick: function() {
        this.$emit('childs-event');
      }
    }

  }
</script>
