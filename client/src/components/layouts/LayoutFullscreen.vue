<template>
  <div class="layout-fullscreen">
    <div class="layout-fullscreen_close" v-if="back">
      <router-link :to="back"><span class="glyphicon glyphicon-remove"></span></router-link>
    </div>
    <div class="layout-fullscreen_slot">
      <slot />
    </div>
  </div>
</template>

<script>
  import LayoutTopbar from '@/components/partials/layouts/LayoutTopbar';

  export default {
    name: 'LayoutFullscreen',
    props: {
      back: {
        type: String,
        required: false
      }
    },
    components :{
      'layout-topbar': LayoutTopbar,
    }
  }
</script>
