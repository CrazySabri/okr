const express = require('express');
const Promise = require('promise');

const NewsModel = require('../models/news');

module.exports = {
  list: (req) => {

    return new Promise((resolve, reject) => {
      NewsModel.listByCompanyId(req.params.company_id)
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

      NewsModel.get(id)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },

  create: (req) => {
    let schema = Object.assign({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      draft: req.body.draft,
      companyId: req.body.companyId
    })

    return new Promise((resolve, reject) => {
      NewsModel.create(schema)
      .then((doc) => {
        console.log(!!doc)
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

  update: (id,req) => {
    console.log("req", req)
    let schema = Object.assign({
      id: id,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      draft: req.body.draft,
      date_updated: new Date()
    })

    return new Promise((resolve, reject) => {
      console.log('controller')
      NewsModel.update(id, schema)
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
      NewsModel.delete(id)
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
