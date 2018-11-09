import Vue from 'vue'
import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'

export default function() {
  return {
    create(params) {
      return Vue.$api.post('/company/create', {
        name: params.name,
        ownerId: params.ownerId,
        code: params.code
      })
    },
    fetchCompanyByCode(code) {
      return new Promise((resolve, reject) => {

        Vue.$api.get('/company/getbycode/'+code)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data)
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        });
      })
    },
    fetchCompanyByAccountId(user_id) {

      return new Promise((resolve, reject) => {

        Vue.$api.get('/company/list/member_of/'+user_id)
        .then((response) => {
          if(!response.data.err) {
            resolve(response.data)
          } else {
            reject(response.data.err)
          }
        })
        .catch((err) => {
          reject(err)
        });

      })
    },
    fetchCompanyOwnerOf(user_id) {
      if(!user_id) return;

      return new Promise((resolve, reject) => {
        Vue.$api.get('/company/list/owner_of/'+user_id)
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
    fetchCompanyMemberOf(user_id) {
      if(!user_id) return;

      return new Promise((resolve, reject) => {
        Vue.$api.get('/company/list/member_of/'+user_id)
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
    fetchCompanyMembers(company_id) {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/company/members/'+company_id)
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
