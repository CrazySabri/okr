const express = require('express');
const Promise = require('promise');

const CommentModel = require('../models/comment');

module.exports = {
  list: (type, parentId) => {

    return new Promise((resolve, reject) => {

      CommentModel.list(type, parentId)
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

      CommentModel.get(id)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
  create: (req) => {

    let schema = {
      type: req.body.type,
      parentId: req.body.parentId,
      comment: req.body.comment,
      ownerId: req.body.ownerId,
      date_created: req.body.date_created
    }

    return new Promise((resolve, reject) => {
      CommentModel.create(schema)
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
      CommentModel.delete(id)
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
