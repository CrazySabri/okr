<template>

  <layout-default>
    <div class="page-okr_detail">
      <div class="page--inner">
        <div class="wrap--page">

          <div class="page-content size--fluid">
            <template v-if="currentOkr">
              <div class="content-container wrap--content border--curved">
                <div class="okr-header">
                  <div class="okr-header_profile">
                    <p class="okr-header_name">
                      <span>{{ currentOkr.title }}</span>
                    </p>
                    <p class="okr-header_position">
                      <span>{{ currentOkr.position }}</span>
                    </p>
                    <p class="okr-header_team">
                      <template v-if="currentOkr.team">
                        <span>{{ currentOkr.team.name }}</span>
                      </template>
                      <template v-else>
                        <span class="text--unassigned">No assigned to a team</span>
                      </template>
                    </p>
                  </div>
                  <div class="clear--both"></div>
                </div>
              </div>
              <tree-okr :nodes="treeOkrs"></tree-okr>
            </template>
            <template v-else>

              <div class="content-container wrap--content border--curved">
                <div class="okr-header text--center">
                  <div class="okr-header_profile">
                      <p><strong>{{ vision }}</strong></p>
                      <hr />
                      <p v-for="mission in missions">
                        {{ mission }}
                      </p>
                  </div>
                  <div class="clear--both"></div>
                </div>
              </div>
              <tree-okr :nodes="parentOkrs" :displayChildren="false"></tree-okr>
            </template>

          </div>
          <div class="clear--both"></div>
        </div>
      </div>
    </div>
  </layout-default>

</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  import LayoutDefault from '@/components/layouts/LayoutDefault';
  import OkrTreeList from '@/components/partials/okr/TreeList';
  import OkrGridList from '@/components/partials/okr/GridList';

  export default {
    components: {
      'tree-okr': OkrTreeList,
      'layout-default': LayoutDefault,
      'okr-grid': OkrGridList,
    },
    props: {
      id: {
        type: String,
        required: false
      }
    },
    computed: {
      okrs() {
        let data = [
          { id:1, children: [2,3], title: 'OKR1', keyresults: 2, employees:10, todos: 1, rapports: 0, progression: 100, date_start: 1530475635, date_end: 1531375635 },
          { id:2, parentId: 1, children: [4,5],  title: 'OKR1a', keyresults: 0, employees:0, todos: 2, rapports: 1, progression: 30, date_start: 1529475635, date_end: 1533475635 },
          { id:3, parentId: 1, children: [6], title: 'OKR1b', keyresults: 1, groups:0, todos: 0, rapports: 1, progression: 50, date_start: 1528475635, date_end: 1535475635 },
          { id:4, parentId: 2, children: [9], title: 'OKR1a1', keyresults: 2, employees:4, todos: 1, rapports: 0, progression: 54, date_start: 1527475635, date_end: 1567475635 },
          { id:5, parentId: 2, children: [8,10], title: 'OKR1a2', keyresults: 5, groups:2, todos: 2, rapports: 1, progression: 20, date_start: 1526475635, date_end: 1526775635 },
          { id:6, parentId: 3, children: [7], title: 'OKR1b1', keyresults: 3, groups:3, todos: 1, rapports: 1, progression: 30, date_start: 1525475635, date_end: 1527475635 },
          { id:7, parentId: 6, children: [], title: 'OKR1b1a', keyresults: 0, employees:5, todos: 0, rapports: 1, progression: 0, date_start: 1524475635, date_end: 1527475635 },
          { id:8, parentId: 5, children: [], title: 'OKR1b1a1', keyresults: 0, employees:5, todos: 0, rapports: 1, progression: 0, date_start: 1524475635, date_end: 1527475635 },
          { id:9, parentId: 4, children: [], title: 'OKR1a1a', keyresults: 0, employees:5, todos: 0, rapports: 1, progression: 0, date_start: 1524475635, date_end: 1527475635 },
          { id:10, parentId: 5, children: [], title: 'OKR1ba2a', keyresults: 0, employees:5, todos: 0, rapports: 1, progression: 0, date_start: 1524475635, date_end: 1527475635 }
        ]
        return data
      },
      treeOkrs() {
        if(this.currentOkr) {
          return this.getTreeOkrList(this.currentOkr.id, this.okrs.slice(0), false)
        }
      },
      currentOkr() {
        if(this.id) {
          return this.okrs.find((x) => { return x.id == this.id })
        }
        return null;
      },
      parentOkrs() {
        return this.getParentOkrList(this.okrs.slice(0), false)
      },
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
    }
  }
</script>
