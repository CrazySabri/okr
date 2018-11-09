var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var AccountSchema = new Schema({
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true },
  date_created: { type: Date, required: true },
  date_update: { type: Date },
  last_login: { type: Date },
  profile: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    position: { type: String, required: false }
  },
  role: { type: String, required: true } //admin, manager, staff
});

var Model = mongoose.model("Account", AccountSchema);

module.exports = {
  model: Model,
  list: () => {
    return new Promise((resolve, reject) => {
      Model.find({}, {password:0}, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  get: (id, params) => {
    return new Promise((resolve, reject) => {
      Model.findById(new ObjectId(id), {password:0}, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  getAggregate: (id, params) => {

    let withDojoMember = params.withDojoMember || false
    let withDojoOwner = params.withDojoOwner || false

    let aggregation = []
    aggregation.push({
      $match: { _id: new ObjectId(id) }
    })

    return new Promise((resolve, reject) => {
      Model.aggregate(aggregation, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          if(doc.length) {
            resolve(doc[0])
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  create: (schema) => {

    schema = Object.assign({
      email: '',
      password: '',
      date_created: new Date(),
      profile: {
        firstname: '',
        lastname: '',
        position: ''
      },
      role: 'staff'
    }, schema || {})

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
  }
}
