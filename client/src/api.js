import Vue from 'vue';
import axios from 'axios';
axios.defaults.timeout = 5000;

var Api = axios.create({
  baseURL: `http://apps.jeromedupuis.net:8082/`
})

export default new Vue({
  methods: {
    post(url, params) {
      return new Promise((resolve, reject) => {
        Api.post(url, params)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    get(url, params) {
      return new Promise((resolve, reject) => {
        Api.get(url, params)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }
})
