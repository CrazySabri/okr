<template>
  <div class="layout-okr">
    <layout-topbar></layout-topbar>
    <layout-nav></layout-nav>
    <div class="app-body">
      <slot />
    </div>
    <layout-footer></layout-footer>
    <layout-copyright></layout-copyright>
  </div>
</template>

<script>
  import LayoutTopbar from '@/components/partials/layouts/LayoutTopbar';
  import LayoutHeader from '@/components/partials/layouts/LayoutHeader';
  import LayoutNav from '@/components/partials/layouts/LayoutNav';
  import LayoutFooter from '@/components/partials/layouts/LayoutFooter';
  import LayoutCopyright from '@/components/partials/layouts/LayoutCopyright';

  export default {
    components: {
      'layout-topbar': LayoutTopbar,
      'layout-nav': LayoutNav,
      'layout-header': LayoutHeader,
      'layout-footer': LayoutFooter,
      'layout-copyright': LayoutCopyright
    },
    name: 'LayoutDefault'
  }
</script>
