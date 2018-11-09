<template>
  <div class="app-navbar navbar">
    <div class="page--inner">
      <div class="navbar-header">
          <a class="navbar-brand" href="#">Project OKR : {{ companyName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LayoutTopbar',
    computed: {
      companyName() {
        return this.$store.getters.currentCompanyName
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
