import Vue from 'vue';
import axios from 'axios';
axios.defaults.timeout = 5000;

var Api = axios.create({
  baseURL: `http://localhost:8085`
})

export default new Vue({
  methods: {
    post(url, params) {
      return new Promise((resolve, reject) => {
        this.$Progress.start()
        Api.post(url, params)
        .then((response) => {
          if(response.data.err) {
            this.$Progress.fail()
            reject(response.data.err)
          } else {
            this.$Progress.finish()
            resolve(response)
          }
        })
        .catch((err) => {
          this.$Progress.fail()
          reject(err)
        })
      })
    },
    get(url, params) {
      return new Promise((resolve, reject) => {
        this.$Progress.start()
        Api.get(url, params)
        .then((response) => {
          if(response.data.err) {
            this.$Progress.fail()
            reject(response.data.err)
          } else {
            this.$Progress.finish()
            resolve(response)
          }
        })
        .catch((err) => {
          this.$Progress.fail()
          reject(err)
        })
      })
    }
  }
})
