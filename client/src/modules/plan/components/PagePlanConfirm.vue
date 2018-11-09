<template>
  <layout-default>
    <div class="page--inner">
      <div class="wrap--page">
        <div class="page-sidebar">
          <div class="plan-overview">
            <div class="plan-overview_top">
              <p class="plan-overview_top_price">{{ plan.price }}円/月</p>
              <div v-if="plan.discount" class="plan-overview_top_discount">
                <span>{{ plan.discount }}%OFF</span>
              </div>
            </div>
            <div class="plan-overview_description" v-for="(item, index) in plan.description" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="page-content">
          <div class="content-container wrap--content border--curved">
            <div class="page-title">
              <h1>Apply Confirm {{ plan.type }}</h1>
            </div>
          </div>
          <div class="content-container wrap--content border--curved">
            <div>お申込みが完了しました。</div>
          </div>
        </div>
        <div class="clear--both"></div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import Vue from 'vue'
import LayoutDefault from '@/components/layouts/LayoutDefault'
  
export default {
  components: {
    'layout-default': LayoutDefault,
  },
  props: {
    id: {
      required: true
    }
  },
  computed: {
    plan() {
      return this.$store.state.plan.showingPlan
    }
  }
}
</script>

<style lang="scss" scoped>
.plan-overview {
  text-align: center;
  &_top {
    width: 100%;
    height: 100px;
    background: #ececec;
    border-radius: 12px;
    position: relative;
    &_price {
      line-height: 100px;
      font-size: 28px;
      color: #333;
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
    width: 100%;
    text-align: left;
    margin-top: 20px;
  }
}

</style>
