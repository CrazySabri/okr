<template>
  <layout-default>
    <div class="page--inner">
      <div class="wrap--page">

        <div class="page-sidebar">
          <sidebar-terms></sidebar-terms>
        </div>

        <div class="page-help page-content">
          <div class="content-container wrap--content border--curved">
            <template v-for="help in helps">
              <div class="page-help_item">
                <h3 @click="toggleHelp(help)">{{ help.title }}</h3>
                <span class="glyphicon" :class="help.show ? 'glyphicon-menu-down' : 'glyphicon-menu-up'"></span>
                <div class="page-help_itemDesc" v-show="help.show">
                  <p>{{ help.content }}</p>
                  <button @click.prevent="toggleHelp(help)" type="button" class="ui-btn--main thick--big size--small">閉じる</button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="clear--both"></div>
      </div>
    </div>
  </layout-default>
</template>


<script>
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import SidebarTerms from '@/components/partials/common/SidebarTerms';

  export default {
  components: {
    'layout-default': LayoutDefault,
    'sidebar-terms': SidebarTerms
  },
  methods :{
    toggleHelp(help) {
      help.show = !help.show
      this.$forceUpdate()
    }
  },
    data() {
      return {
        helps: [
          {
            title: 'Title',
            show: true,
            content: 'ContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content Content'
          },
          {
            title: 'Title',
            content: 'ContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content Content',
          },
          {
            title: 'Title',
            content: 'ContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content Content'
          },
          {
            title: 'Title',
            content: 'ContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content Content'
          },
          {
            title: 'Title',
            content: 'ContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content Content'
          },
          {
            title: 'Title',
            content: 'ContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content ContentContentContent Content Content'
          }
        ]
      }
    }
  }
</script>
