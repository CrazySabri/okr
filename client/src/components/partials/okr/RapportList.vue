<template v-if="rapports && rapports.length">
  <div class="content-container margin--none background--transparent" id="rl">
    <div class="content-title position--outside">
      <h2>Rapports</h2>
    </div>
    <div class="content-container wrap--content border--curved">
      <div class="okr-rapportsList">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="rapport in rapports">
            <router-link :to="getRapportLink(rapport)">{{ rapport.text }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      type: {
        type: String,
        required: false,
        default: 'individual'
      }
    },
    computed: {
      rapports() {
        let sample = function(id) {
          return {
            text: 'Rapport text '+id,
            id: id
          }
        }
        let data = [sample(1),sample(2),sample(3),sample(4),sample(5),sample(6),sample(7)]

        return this.sort(data, 'text', false)
      }
    },
    methods: {
      sort(arr, key, desc)  {
        if(!desc) {
          return arr.sort(function(a,b) {return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);} );
        }
        return arr.sort(function(a,b) {return (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);} );
      },
      getRapportLink(rapport) {
        return '/okr/rapport/'+rapport.id
      }
    }
  }
</script>
