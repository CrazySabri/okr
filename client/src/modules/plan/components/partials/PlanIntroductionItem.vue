<template>
  <div class="plan-item wrap--content border--curved">
    <div class="plan-item_top">
      <h2 class="plan-item_top_price">{{ plan.price }}円/月</h2>
      <div v-if="plan.discount" class="plan-item_top_discount">
        <span>{{ plan.discount }}%OFF</span>
      </div>
    </div>
    <div class="plan-item_description" v-for="(item, index) in plan.description" :key="index">{{ item }}</div>
    <div @click="onClickPlan(plan)" class="plan-item_btn">
      <router-link class="plan-item_btn_inner" :to="'plan/' + plan.id">{{ plan.type }}</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClickPlan(plan) {
      this.$store.dispatch('addPlan', plan)
    }
  }
}
  
</script>

<style lang="scss" scoped>
.plan-item {
  background: #fff;
  width: 30%;
  min-height: 400px;
  border-radius: 12px;
  text-align: center;
  &_top {
    width: 80%;
    height: 200px;
    background: #ececec;
    margin: 0 auto;
    border-radius: 12px;
    position: relative;
    &_price {
      line-height: 200px;;
      font-size: 32px;
      font-weight: 800;
      color: #333;
      font-style: italic;
    }
    &_discount {
    position: absolute;
    top: 0;
    right: 0;
    width: 85px;
    height: 85px;
    overflow: hidden;
    span {
      display: inline-block;
      position: absolute;
      padding: 5px 0;
      left: -24px;
      top: 20px;
      width: 160px;
      text-align: center;
      font-size: 16px;
      line-height: 16px;
      background: #309ff2;
      color: #fff;
      letter-spacing: 0.05em;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  }
  &_description {
    width: 80%;
    margin: 10px auto 0;
    font-size: 14px;
  }
  &_btn {
    display: block;
    font-size: 16px;
    border-radius: 12px;
    width: 80%;
    height: 40px;
    line-height: 40px;
    margin: 24px auto 0;
    background: #309ff2;
    cursor: pointer;
    &_inner {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
