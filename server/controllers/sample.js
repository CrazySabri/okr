const express = require('express');
const Promise = require('promise');

const SampleModel = require('../models/sample');

module.exports = {
  list: (req) => {

    return new Promise((resolve, reject) => {

      SampleModel.list()
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

      SampleModel.get(id)
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
      field1: '',
      field2: ''
    }, req.body)

    return new Promise((resolve, reject) => {
      SampleModel.create(schema)
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
  update: (id, req) => {

    let schema = Object.assign({
      field1: 'updated5',
      field2: 'updated5'
    }, req.body)

    return new Promise((resolve, reject) => {
      SampleModel.update(id, schema)
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
      SampleModel.delete(id)
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
