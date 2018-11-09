import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'
import Vue from 'vue'

export default function() {
  return {
    fetchCompanyOkr(company_id) {
      return new Promise(resolve => {
        Vue.$api.get('/okr/list/type/company/'+company_id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchTeamOkr(team_id) {
      return new Promise(resolve => {
        Vue.$api.get('/okr/list/type/team/'+team_id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchPersonalOkr(user_id) {
      return new Promise(resolve => {
        Vue.$api.get('/okr/list/type/personal/'+user_id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchOkrOwnerOf(user_id) {
      return new Promise(resolve => {
        Vue.$api.get('/okr/list/ownerof/'+user_id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      });
    },
    fetchOneOkr(params) {
      let id = params.id
      let type = params.type

      return new Promise(resolve => {
        Vue.$api.get('/okr/get/'+type+'/'+id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data);
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      });
    },
    fetchOneOkrNoType(id) {
      return new Promise(resolve => {
        Vue.$api.get('/okr/get/id/'+id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data);
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      });
    },
    changeOkrStatus(okr_id, status) {
      return new Promise((resolve, reject) => {
        Vue.$api.post('/okr/update/status/'+okr_id, {
          status: status
        })
        .then((response) => {
          if(response.data.updated) {
            resolve(response.data);
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      });
    },
    getOkrRapports(okr_id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/okr/rapport/list/'+okr_id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data);
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    getOkrRapport(id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/okr/rapport/one/'+id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data);
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        })
      });
    }
  }
}
