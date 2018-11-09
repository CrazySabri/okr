<template>
  <div class="okr-tree">
    <div class="row" :data-step="step">
      <template v-for="node in nodes">
        <div :class="'col-md-'+(12/nodes.length)">
          <div class="wrap--tree">

            <div class="content-container wrap--treeCell border--curved okr-tree_cell">
              <router-link :to="'/okr/tree/'+node.id">
                <template v-if="showEllipsis(nodes.length, step)">
                  <span class="glyphicon glyphicon-option-horizontal"></span>
                </template>
                <template v-else>
                  {{ node.title }}
                </template>
              </router-link>
            </div>

            <template v-if="displayChildren && node.children">
              <tree-okr
                 :nodes="node.children"
                 :step="step+1"
               >
               </tree-okr>
             </template>
           </div>
         </div>
      </template>
    </div>
  </div>

</template>


<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        maxStep: 2
      }
    },
    props: {
      nodes: {
        type: Array,
        required: true
      },
      step: {
        type: Number,
        required: false,
        default: 1
      },
      displayChildren: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    methods: {
      showEllipsis(len, step) {
        if(step == 1) {
          return false
        }
        if((step / 4 * len) > 1) {
          return true
        }
        return false
      }
    },
    name: 'tree-okr'
  }
</script>
