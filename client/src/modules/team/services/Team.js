import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'
import Vue from 'vue'

export default function() {
  return {
    fetchTeams(company_id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/company/teams/'+company_id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data)
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchTeamsManagerOf(manager_id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/team/list/manager_of/'+manager_id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data)
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchOneTeam(team_id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/team/get/'+team_id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data)
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }
}
