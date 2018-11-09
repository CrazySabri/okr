<template>

  <layout-management>
    <div class="content-container wrap--content border--curved">
    <div class="float--right">
      <router-link to="/admin/news/create" class="btn btn-primary">Create a news</router-link>
    </div>
      <div class="page-title">
        <h1>News</h1>
      </div>
    </div>
    <div class="content-container wrap--content border--curved">

      <template v-if="!newslist || !newslist.length">
        <div class="content-nodata">
          <p>There is no news</p>
        </div>
      </template>
      <template v-else>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(news, index) in newslist">
              <th scope="row">{{ index+1 }}</th>
              <td>{{ news.title }}</td>
              <td>{{ news.date_created }}</td>
              <td>{{ news.draft ? 'Active' : 'Draft' }}</td>
              <td><router-link class="text-primary" :to="'/admin/news/edit/' + (news._id)">Edit</router-link></td>
              <td class="text-danger" @click="deleteNew(news)">Delete</td>
            </tr>
          </tbody>
        </table>
      </template>
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
    mounted() {
      console.log("data")
      Vue.$service.news.fetchNews(this.$store.getters.currentCompany._id)
      .then((data) => {
        console.log("data")
        this.$store.dispatch('fetchNews', data)
      })
    },
    computed: {
      newslist() {
        return this.$store.state.news.list
      }
    },
    methods: {
      deleteNew(news) {
        if (confirm('Are you sure you wanto to delete this?')) {
          Vue.$service.news.deleteNew(news._id)
          .then((data) => {
            console.log("news.id",news._id)
            this.$store.dispatch('deleteNews', data)
          })
        }
        return false;
      }
    }
  }
</script>
