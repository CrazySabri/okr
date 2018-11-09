import store from '@/store'
import cookies from '@/cookies'
import Promise from 'promise'
import Vue from 'vue'

export default function() {
  return {
    signup(params) {

      let accountSchema = {
        email: params.email,
        password: params.password,
        firstname: params.firstname,
        lastname: params.lastname,
        position: '',
        company: {
          code: params.company.code,
          role: 'admin'
        }
      }
      let companySchema = {
        code: params.company.code,
        name: params.company.name
      }

      return new Promise((resolve, reject) => {
        Vue.$api.get('/company/hascompany/code/'+companySchema.code)
        .then((hascompany) => {
          if(hascompany.data) {
            reject({
              err: 'has company'
            })
          } else {

            Vue.$api.post('/account/create', accountSchema)
            .then((account) => {
              companySchema.ownerId =  account.data.doc._id
              Vue.$api.post('/company/create', companySchema)
              .then((company) => {

                resolve({
                  created: true,
                  account: account.data,
                  company: company.data
                })

              })
              .catch((err) => {
                reject(err)
              })
            })
            .catch((err) => {
              reject(err)
            })
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    create(params) {

      let accountSchema = {
        email: params.email,
        password: params.password,
        firstname: params.firstname,
        lastname: params.lastname,
        position: params.position,
        company: {
          code: params.company.code,
          id: params.company.id,
          role: params.role
        }
      }

      return new Promise((resolve, reject) => {
        Vue.$api.get('/company/hascompany/code/'+accountSchema.company.code)
        .then((hascompany) => {

          if(!hascompany.data) {
            reject({
              err: 'has not company'
            })
          } else {

            Vue.$api.post('/account/create', accountSchema)
            .then((account) => {
              if(!account.data.err) {
                resolve({
                  created: true,
                  account: account.data
                })
              } else {
                reject({err: true})
              }
            })
            .catch((err) => {
              reject(err)
            })
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    getAccountListByCompanyId() {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/account/list')
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchAccounts() {
      return new Promise((resolve, reject) => {
        Vue.$api.get('/account/list')
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    fetchOneAccount(user_id) {
      return new Promise(resolve => {
        Vue.$api.get('/account/get/'+user_id)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err)
        })
      });
    }
  }
}
