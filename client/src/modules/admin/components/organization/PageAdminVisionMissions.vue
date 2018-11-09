<template>

  <layout-management>
    <div class="content-container wrap--content border--curved">
      <div class="page-title">
        <h1>Vision and Missions</h1>
      </div>
    </div>

    <div class="content-container background--transparent">
      <div class="label-title position--outside">
        <h1>Vision</h1>
      </div>
      <textarea type="text" class="form-control" rows="5" v-model="formData.vision" />
    </div>

    <div class="content-container background--transparent">
      <div class="label-title position--outside">
        <h1>Missions</h1>
      </div>
      <textarea type="text" class="form-control" rows="5" v-model="formData.missions" />
    </div>

    <div class="form-group">
      <div class="text--center wrap--content">
        <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Update</button>
      </div>
    </div>

  </layout-management>

</template>

<script>
  import Vue from 'vue'
  import LayoutManagement from '@/components/layouts/LayoutManagement';

  export default {
    components: {
      'layout-management': LayoutManagement
    },
    computed: {

    },
    data() {
      return {
        formData: {
          vision: this.$store.getters.vision,
          missions: this.$store.getters.missions
        }
      }
    },
    methods: {
      onSubmit() {
        Vue.$api.post('/missionvision/update/', {
          vision: this.formData.vision,
          missions: this.formData.missions
        })
        .then(response => {

        })
        .catch(err => {

        })
      }
    }
  }
</script>
