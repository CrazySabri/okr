const express = require('express');
const Promise = require('promise');

const OkrModel = require('../models/okr');
const OkrRapportModel = require('../models/okr_rapport');

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
      id: null,
      type: null
    }, params || {})

    let schema = {}

    switch(params.type) {
      case 'company':
        schema = {
          companyId: new ObjectId(params.id),
          type: 'company'
        }
        break;
      case 'owner':
        schema = {
          ownerId: new ObjectId(params.id),
          type: 'personal'
        }
        break;
        case 'personal':
          schema = {
            personalId: new ObjectId(params.id),
            type: 'personal'
          }
          break;
      case 'team':
        schema = {
          teamId: new ObjectId(params.id),
          type: 'team'
        }
        break;

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

    let match = {
      "_id": new ObjectId(id)
    }
    if(type != "id") {
      match.type = type
    }

    return new Promise((resolve, reject) => {
      OkrModel.model.aggregate([
        { "$match": match },
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
            type: 1,
            date_start: 1,
            date_end: 1,
            status: 1,
            teamId: 1
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
      personalId: req.body.personalId,
      teamId: req.body.teamId,
      managerIds: req.body.managerIds,
      memberIds: req.body.memberIds,
      type: req.body.type,
      status: req.body.status,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
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
  },
  update: (req) => {
    let id = req.params.id
    let schema = {
      name: req.body.name,
      objective: req.body.objective,
      keyresults: req.body.keyresults,
      parentId: req.body.parentId,
      ownerId: req.body.ownerId,
      companyId: req.body.companyId,
      teamId: req.body.teamId,
      managerIds: req.body.managerIds,
      memberIds: req.body.memberIds,
      type: req.body.type,
      status: req.body.status,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
    }
    return new Promise((resolve, reject) => {
      OkrModel.model.findByIdAndUpdate(id, schema, (err, doc) => {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  updateStatus: (req) => {
    let id = req.params.id
    let status = req.body.status

    let schema = {
      status: status
    }
    return new Promise((resolve, reject) => {
      OkrModel.model.findByIdAndUpdate(id, schema, (err, doc) => {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getOneRapport(id) {
    return new Promise((resolve, reject) => {
      OkrRapportModel.model.findById(id, function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getOkrRapports(okr_id) {
    return new Promise((resolve, reject) => {
      OkrRapportModel.model.find({
        okrId: new ObjectId(okr_id)
      }, function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      }).sort({_id:-1})
    })
  },
  getOkrRapport(id) {
    return new Promise((resolve, reject) => {
      OkrRapportModel.model.findById(id, function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  createRapport(req) {
    let schema = {
      title: req.body.title,
      rapport: req.body.rapport,
      okrId: req.body.okrId,
      ownerId: req.body.ownerId
    }
    return new Promise((resolve, reject) => {
      let OkrRapport = new OkrRapportModel.model(schema)
      OkrRapport.save((err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            created: !!doc,
            doc
          })
        }
      })
    })
  },
  updateRapport(req) {
    let id = req.params.id
    let schema = {
      title: req.body.title,
      rapport: req.body.rapport,
      okrId: req.body.okrId,
      ownerId: req.body.ownerId
    }
    return new Promise((resolve, reject) => {
      OkrRapportModel.model.findOneAndUpdate(id, schema, function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}
