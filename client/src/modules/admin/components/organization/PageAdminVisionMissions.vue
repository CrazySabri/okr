<template>

  <layout-default>
    <div class="page-admin">
      <div class="page--inner">
        <div class="wrap--page">
          <div class="page-sidebar">
            <sidebar-admin></sidebar-admin>
          </div>
          <div class="page-content">
            <div class="content-container wrap--content border--curved">
              <div class="page-title">
                <h1>Vision and Missions</h1>
              </div>
            </div>

            <div class="content-container background--transparent">
              <div class="label-title position--outside">
                <h1>Vision</h1>
              </div>
              <div class="content-container wrap--content border--curved">

              </div>
            </div>
            <div class="content-container background--transparent">
              <div class="label-title position--outside">
                <h1>Missions</h1>
              </div>
              <div class="content-container wrap--content border--curved">

              </div>
            </div>

            <div class="form-group">
              <div class="text--center wrap--content">
                <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Update</button>
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
  import SidebarAdmin from '@/modules/admin/components/partials/SidebarAdmin';

  export default {
    components: {
      'layout-default': LayoutDefault,
      'sidebar-admin': SidebarAdmin
    },

    computed: {

    },
    methods: {
      onSubmit() {

      }
    }
  }
</script>
