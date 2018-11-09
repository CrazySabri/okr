<template v-if="rapports && rapports.length">
  <div class="content-container margin--none background--transparent" id="rl">
    <div class="content-title position--outside">
      <div class="float--right">
        <router-link :to="'/okr/'+okr.type+'/'+okr._id+'/rapport/create'" class="btn btn-primary">Create a new Rapport</router-link>
      </div>
      <h2>Rapports</h2>
    </div>
    <div class="content-container wrap--content border--curved">
      <div class="okr-rapportsList" v-if="rapports && rapports.length">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="rapport in rapports">
            <router-link :to="getRapportLink(rapport)">{{ rapport.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="content-nodata" v-else>
        <p>There is no rapports</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  export default {
    props: {
      okr: {
        type: Object,
        required: true
      }
    },
    mounted() {
      Vue.$service.okr.getOkrRapports(this.okr._id)
      .then((data) => {
        this.$store.dispatch('fetchOkrRapports', data)
      })
    },
    computed: {
      rapports() {
        return this.$store.state.okr.okrRapports
      }
    },
    methods: {
      getRapportLink(rapport) {
        return '/okr/rapport/'+rapport._id
      }
    }
  }
</script>
