<template>

  <div class="row ui-stepper">

    <div class="ui-stepper_step" :class="['col-xs-'+stepCol, {'complete':index < currentStep}, {'disabled':index > currentStep}, {'active': index == currentStep}]" v-for="(step, index) in steps">

      <div class="text-center ui-stepper_stepnum">{{ step.title }}</div>
      <div class="progress"><div class="progress-bar"></div></div>
      <a href="#" class="ui-stepper_dot"></a>
      <div class="ui-stepper_info text-center">{{ step.description }}</div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      steps: {
        type: Array,
        required: true
      },
      currentStep: {
        type: Number,
        required: false,
        default: 0
      }
    },
    computed: {
      stepCol() {
        return Math.round(12/(this.steps.length))
      }
    }
  }
</script>
