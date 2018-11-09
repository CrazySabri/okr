<template>

  <router-link :to="link" class="module-comment_button btn btn-default btn-comment">
    <span class="glyphicon glyphicon-comment"></span> {{ count }}
  </router-link>

</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      link: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: false,
        default: 0
      }
    }
  }
</script>
