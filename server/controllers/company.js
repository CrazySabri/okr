const express = require('express');
const Promise = require('promise');

const companyModel = require('../models/company');
const teamModel = require('../models/team');

module.exports = {
  list: (req) => {

    return new Promise((resolve, reject) => {
      companyModel.list()
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  listMemberOf: (req) => {
    return new Promise((resolve, reject) => {
      companyModel.listMemberOf(req.params.user_id)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  listMembers: (req) => {
    return  new Promise((resolve, reject) => {
      companyModel.listMembers(req.params.company_id)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  listTeams: (req) => {
    return  new Promise((resolve, reject) => {
      teamModel.list(req.params.company_id)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  get: (id) => {
    return new Promise((resolve, reject) => {

      companyModel.get(id)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  getbycode: (code) => {
    return new Promise((resolve, reject) => {

      companyModel.getbycode(code)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  create: (params) => {
    let schema = {
      name: params.name,
      ownerId: params.ownerId,
      code: params.code
    }

    return new Promise((resolve, reject) => {
      companyModel.create(schema)
      .then((doc) => {
        resolve({
          created: !!doc,
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
      companyModel.delete(id)
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
  }
}
