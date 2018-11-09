<template>
  <div class="content-container wrap--content border--curved">
    <div class="row">
      <div class="col-md-2">
        <div class="label-title">
          <h4>Team / Group</h4>
        </div>
        <p class="text--default">
          <span>Team name</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Request by</h4>
        </div>
        <p class="text--default">
          <span>Lastname Firstname</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Key results</h4>
        </div>
        <p class="text--count">
          <span>3</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Date Range</h4>
        </div>
        <p class="text--date">
          <span>2018/05 - 2018/07</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Build Date limit</h4>
        </div>
        <p class="text--date">
          <span>2018/8/2<br />(5日 left)</span>
        </p>
      </div>
      <div class="col-md-2">
        <div class="label-title">
          <h4>Status</h4>
        </div>
        <p class="text--status">
          <span>new request</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      okr: {
        type: Object,
        required: false,
        default: () => { return {} }
      }
    }
  }
</script>
