<template v-if="todos && todos.length">
  <div class="content-container margin--none background--transparent">
    <div class="content-title position--outside">
      <h2>To do's</h2>
    </div>
    <div class="content-container wrap--content border--curved">
      <div class="okr-todosList">
        <div v-for="(todoOkr, index) in todosOkr">
          <div class="label-title">
            <h4>KR-{{ parseInt(index) }}</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="todo in todoOkr">{{ todo.text }}</li>
          </ul>
        </div>
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
      todos() {
        let sample = () => {
          return {
            text: 'Todo text',
            keyresult: this.getRandomInt(1, 3)
          }
        }
        let data = [sample(),sample(),sample(),sample(),sample(),sample(),sample(),sample(),sample(),sample(),sample(),sample()]

        return this.sort(data, 'text', false)
      },
      todosOkr() {
        if(!this.todos || !this.todos.length) return []
        return this.groupBy(this.todos, 'keyresult')
      }
    },
    methods: {
      getRandomInt(min, max) {
        return Math.floor(Math.random() * Math.floor(max)) + parseInt(min);
      },
      sort(arr, key, desc)  {
        if(!desc) {
          return arr.sort(function(a,b) {return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);} );
        }
        return arr.sort(function(a,b) {return (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);} );
      },
      groupBy(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      }
    }
  }
</script>
