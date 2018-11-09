var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var CompanySchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, index: { unique: true }},
  ownerId: { type: Schema.ObjectId },
  members: [{
    _id: { type: Schema.ObjectId },
    role: { type: String }
  }],
  missions: { type: Array },
  vision: { type: String }
});

var Model = mongoose.model("Company", CompanySchema);

module.exports = {
  list: () => {
    return new Promise((resolve, reject) => {
      Model.find({}, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  listMemberOf: (user_id) => {
    return new Promise((resolve, reject) => {
      Model.find({
        "members._id": { "$in": new ObjectId(user_id) }
      }, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  listMembers: (company_id) => {
    return new Promise((resolve, reject) => {
      Model.aggregate([
        { "$match": { "_id": new ObjectId(company_id) } },
        {
          "$lookup": {
            from: "accounts",
            localField: "members._id",
            foreignField: "_id",
            as: "membersList"
          }
        },
        { "$unwind": "$membersList" },
        {
          "$project": {
            "members.role": 1,
            "membersList._id": 1,
            "membersList.profile": 1,
            "membersList.email": 1,
            "membersList.date_created": 1,
            "membersList.company": 1
          }
        },
      ], (err, doc) => {
        if(err) {
          reject(err)
        } else {
          if(doc && doc.length) {
            let members = []
            doc.map((x) => {
              members.push(x.membersList)
            })
            resolve(members)
          } else {
            resolve([])
          }
        }
      })
    })
  },
  get: (id) => {
    return new Promise((resolve, reject) => {
      Model.findById(new ObjectId(id), function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getbycode: (code) => {
    return new Promise((resolve, reject) => {
      Model.find({
        code: code
      }, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          if(doc && doc.length) {
            resolve(doc[0])
          } else {
            resolve(null)
          }
        }
      })
    })
  },
  create: (schema) => {

    schema.ownerId = new ObjectId(schema.ownerId)
    schema.members = [{
      _id: schema.ownerId,
      role: 'owner'
    }]

    return new Promise((resolve, reject) => {
      var model = new Model(schema)
      model.save(function (err, doc) {
        if(err) {
          reject(err)
        }
        else {
          resolve(doc)
        }
      })
    })
  },
  update: (id, schema) => {

    schema = Object.assign({
      field1: '',
      field2: ''
    }, schema)

    return new Promise((resolve, reject) => {
      Model.findByIdAndUpdate(new ObjectId(id), { $set: schema }, { new: true }, function (err, doc) {
        if(err) {
          reject(err)
        }
        else {
          resolve(doc)
        }
      })
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      Model.findByIdAndRemove(new ObjectId(id), function (err, doc) {
        if(err) {
          reject(err)
        }
        else {
          resolve(doc)
        }
      })
    })
  },
  insetOneMember: (company_id, user_id, role) => {
    return new Promise((resolve, reject) => {
      Model.update(
        {
          _id: new ObjectId(company_id)
        },
        {
          $push: {
            members: {
              _id: new ObjectId(user_id),
              role: role
            }
          }
        },
        function (err, doc) {
          if(err) {
            reject(err)
          }
          else {
            resolve(doc)
          }
        }
      )
    })
  }
}
