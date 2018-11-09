<template>
  <div class="touch--disabled modal" :class="{ 'show' : show }" v-if="tip">
    <div class="content-tips">
      <div class="float--right">
        <span class="glyphicon glyphicon-question-sign"></span>
      </div>
      <div class="label-title">
        <h4>{{ tip.title }}</h4>
      </div>
      <p>
        {{ tip.text }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tip: {
        type: Object,
        required: true
      },
      show: {
        type: Boolean,
        required: false,
        default: true
      }
    }
  }

</script>
