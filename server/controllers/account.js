const express = require('express');
const Promise = require('promise');

const AccountModel = require('../models/account');
const CompanyModel = require('../models/company');

module.exports = {

  login: (req) => {
    var schema = {
      email: req.body.email,
      password: req.body.password,
      "company.code": req.body.company
    }

    return new Promise((resolve, reject) => {
      AccountModel.model.findOne(schema, { password: 0 }, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve({
            loggedin: !!doc,
            account: doc
          })
        }
      })
    })
  },
  list: (req) => {
    return new Promise((resolve, reject) => {

      AccountModel.list()
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  listMemberOfCompany: (req) => {
    return new Promise((resolve, reject) => {

      AccountModel.listMemberOfCompany(req.params.company_id)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  get: (id, withDojoMember, withDojoOwner) => {

    return new Promise((resolve, reject) => {

      let action = 'get'
      if(withDojoMember || withDojoOwner) {
        action = 'getAggregate'
      }

      AccountModel[action](id, {
        withDojoMember,
        withDojoOwner
      })
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  create: (req) => {

    req.body.profile = req.body.profile || {}
    let schema = {
      email: req.body.email,
      password: req.body.password,
      date_created: new Date(),
      profile: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        position: req.body.position
      },
      company: {
        code: req.body.company.code,
        role: req.body.company.role
      }
    }

    return new Promise((resolve, reject) => {
      AccountModel.create(schema)
      .then((doc) => {

        if(req.body.company.id) {
          CompanyModel.insetOneMember(req.body.company.id, doc._id, req.body.role)
          .then(() => {
            resolve({
              created: !!doc,
              doc
            })
          })
          .catch((err) => {
            AccountModel.findByIdAndRemove(doc._id)
            reject(err)
          })
        } else {
          resolve({
            created: !!doc,
            doc
          })
        }
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  update: (id, req) => {

    return new Promise((resolve, reject) => {
      AccountModel.update(id, req.body)
      .then((doc) => {
        resolve({
          updated: true,
          doc
        })
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      AccountModel.delete(id)
      .then((doc) => {
        resolve({
          deleted: true,
          doc
        })
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  updatePassword: (user_id, old_password, new_password) => {

    return new Promise((resolve, reject) => {
      AccountModel.get(user_id, {})
      .then((currentUser) => {
        if(currentUser.password === old_password) {
          AccountModel.updatePassword(user_id, new_password)
          .then((doc) => {
            resolve({
              updated: true,
              doc
            })
          })
          .catch((err) => {
            reject(err)
          })

        } else {
          reject('wrong password')
        }

      })
      .catch((err) => {
        reject(err)
      })

    })
  },
}
