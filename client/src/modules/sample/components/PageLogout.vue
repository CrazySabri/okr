<template>
  <div>
    <p>Logging out</p>
  </div>
</div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'PageLogout',
    mounted() {
      Vue.$service.auth.logout()
      .then(() => {
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      })
    }
  }
</script>
