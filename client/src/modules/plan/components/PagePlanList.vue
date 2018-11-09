<template>
  <layout-default>
    <div class="page--inner">
      <div class="wrap--content">
        <div class="content-container wrap--content border--curved">
          <div class="page-title">
            <h1>Plan</h1>
          </div>
        </div>
        <div class="plan-container">
          <plan-item v-for="(plan, index) in plans" :plan="plan" :key="index" />
        </div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import Vue from 'vue'
import LayoutDefault from '@/components/layouts/LayoutDefault'
import PlanIntroductionItem from './partials/PlanIntroductionItem'

export default {
  components: {
    'layout-default': LayoutDefault,
    'plan-item': PlanIntroductionItem
  },
  data() {
    return {
      plans: [
        {
          id: '10000001',
          price: 1000,
          discount: 40,
          description: [
            'up to 10 users',
            'ここに説明が入ります。ここに説明が入ります。ここに説明が入ります。',
            'sample text'
          ],
          type: 'Trial'
        },
        {
          id: '10000002',
          price: 2000,
          description: [
            'up to 10 users',
            'ここに説明が入ります。ここに説明が入ります。ここに説明が入ります。',
            'sample text'
          ],
          type: 'Standard'
        },
        {
          id: '10000003',
          price: 3000,
          description: [
            'up to 10 users',
            'ここに説明が入ります。ここに説明が入ります。ここに説明が入ります。',
            'sample text'
          ],
          type: 'Premire'
        }
      ]
    }
  }
}

</script>

<style lang="scss" scoped>
.plan-container {
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
}
</style>
