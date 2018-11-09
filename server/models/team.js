var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var TeamSchema = new Schema({
  name: { type: String, required: true },
  mission: { type: String },
  vision: { type: String },
  members: [{ type: Schema.ObjectId }],
  managers: [{ type: Schema.ObjectId }],
  parentId: { type: Schema.ObjectId },
  companyId: { type: Schema.ObjectId, required: true}
});

var Model = mongoose.model("Team", TeamSchema);

module.exports = {
  list: (company_id) => {
    return new Promise((resolve, reject) => {
      Model.find({
        companyId: new ObjectId(company_id)
      }, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  listManagerOf: (manager_id) => {
    return new Promise((resolve, reject) => {
      Model.find({
        "managers": { "$in": new ObjectId(manager_id) }
      }, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  get: (team_id) => {
    return new Promise((resolve, reject) => {

      Model.aggregate([
        { "$match": {
            _id: new ObjectId(team_id)
          },
        },
        {
          "$lookup": {
            from: "accounts",
            localField: "members",
            foreignField: "_id",
            as: "members"
          }
        },
        {
          "$lookup": {
            from: "accounts",
            localField: "managers",
            foreignField: "_id",
            as: "managers"
          }
        },
        {
          "$lookup": {
            from: "teams",
            localField: "parentId",
            foreignField: "_id",
            as: "parentTeam"
          }
        },
        {
          "$unwind": {
            path: "$parentTeam",
            preserveNullAndEmptyArrays: true
          }
        }
      ], (err, doc) => {
        console.log(doc)
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

    schema = Object.assign({
      name: '',
      mission: '',
      vision: '',
      companyId: '',
      members: [],
      managers: [],
      parentId: ''
    }, schema)

    return new Promise((resolve, reject) => {
      var model = new Model({
        name: schema.name,
        vision: schema.vision,
        mission: schema.mission,
        companyId: new ObjectId(schema.companyId),
        members: schema.members,
        managers: schema.managers,
        parentId: schema.parentId ? new ObjectId(schema.parentId) : null
      })
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
        console.log(doc)
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
  }
}
