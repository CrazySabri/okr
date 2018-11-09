const express = require('express');
const Promise = require('promise');

const OkrModel = require('../models/okr');

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

module.exports = {

  listOwnerOf: (user_id) => {
    return new Promise((resolve, reject) => {
      OkrModel.model.find({
        ownerId: new ObjectId(user_id)
      }, function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      }).sort({_id:-1})
    })
  },
  list: (params) => {

    params = Object.assign({
      main: false,
      company_id: null
    }, params || {})

    let schema = {
      companyId: params.company_id
    }
    if(params.main) {
      schema.parentId = null
    }

    return new Promise((resolve, reject) => {
      OkrModel.model.find(schema, function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      }).sort({_id:-1})
    })
  },
  get: (type, id) => {
    return new Promise((resolve, reject) => {
      OkrModel.model.aggregate([
        { "$match": {
          "_id": new ObjectId(id),
          "type": type
        } },
        {
          $project: {
            _id: 1,
            name: 1,
            objective:1,
            keyresults: 1,
            children: 1,
            parentId: 1,
            members: 1,
            managers: 1,
            ownerId: 1,
            type: 1
          }
        },
        {
          $lookup: {
            from: "accounts",
            localField: "members",
            foreignField: "_id",
            as: "members"
          }
        },
        {
          $lookup: {
            from: "accounts",
            localField: "managers",
            foreignField: "_id",
            as: "managers"
          }
        },
      ], function (err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc[0])
        }
      }).sort({_id:-1}).limit(1)
    })
  },
  create: (req) => {

    let schema = {
      name: req.body.name,
      objective: req.body.objective,
      keyresults: req.body.keyresults,
      parentId: req.body.parentId,
      ownerId: req.body.ownerId,
      companyId: req.body.companyId,
      managerIds: req.body.managerIds,
      memberIds: req.body.memberIds
    }


    const updateParentOkr = (data) => {
      return OkrModel.model.findOneAndUpdate({
        _id: schema.parentId
      }, {
        $push: {
          children: new ObjectId(data._id)
        }
      })
    }

    return new Promise((resolve, reject) => {
      var Okr = new OkrModel.model(schema)
      Okr.save((err, doc) => {
        if (err) {
          reject(err)
        } else {

          if(schema.parentId) {
            updateParentOkr(doc)
            .then((parentData) => {
              resolve(doc)
            })
          } else {
            resolve(doc)
          }
        }
      })
    })
  }
}
