<template>
  <layout-error>
    <div class="error-404">
      <h1>404</h1>
    </div>
  </layout-error>
</template>

<script>
  import LayoutError from '../layouts/LayoutError.vue'
  export default {
    name: 'Error404',
    components: {
      'layout-error': LayoutError
    }
  }
</script>
