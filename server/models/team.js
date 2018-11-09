var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.ObjectId }],
  managers: [{ type: Schema.ObjectId }],
  parentGroupId: { type: Schema.ObjectId },
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
  get: (user_id, team_id) => {
    return new Promise((resolve, reject) => {
      Model.find({
        "$and": [
          { _id: new ObjectId(team_id) },
        /*  { "$or": [{
            "members": {
              "$in": new ObjectId(user_id)
            },
            "managers": {
              "$in": new ObjectId(user_id)
            }
          }] }*/
        ]
      }, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  create: (schema) => {

    schema = Object.assign({
      name: '',
      companyId: '',
      members: [],
      managers: []
    }, schema)

    return new Promise((resolve, reject) => {
      var model = new Model({
        name: schema.name,
        companyId: new ObjectId(schema.companyId),
        members: schema.members,
        managers: schema.managers
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
