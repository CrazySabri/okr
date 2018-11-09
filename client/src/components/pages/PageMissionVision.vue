<template>

  <layout-default>
    <div class="page-missionvision">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-organization></sidebar-organization>
          </div>
          <div class="page-content">
            <div class="page-title position--outside">
              <h1>Mission & Vision</h1>
            </div>
            <div class="content-container wrap--content border--curved">
              <div class="label-title">
                <h4>Vision</h4>
              </div>
              <div><p>{{ vision }}</p></div>
            </div>
            <div class="content-container wrap--content border--curved">
              <div class="label-title">
                <h4>Missions</h4>
              </div>
              <div>
                <p v-for="mission in missions">{{ mission }}</p>
              </div>
            </div>
          </div>
          <div class="clear--both"></div>
        </div>
      </div>
    </div>
  </layout-default>

</template>

<script>
  import Vue from 'vue'
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import SidebarOrganization from '@/components/partials/common/SidebarOrganization';

  export default {
    computed: {
      missions() {
        return [
          'ビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキスト',
          'ビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキスト',
          'ビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキスト'
        ]
      },
      vision() {
        return 'ビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキストビジョンサンプルテキスト'
      }
    },
    components: {
      'layout-default': LayoutDefault,
      'sidebar-organization': SidebarOrganization,
    }
  }
</script>
