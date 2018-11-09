var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var AccountSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  date_created: { type: Date, required: true },
  date_update: { type: Date },
  last_login: { type: Date },
  profile: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    position: { type: String, required: false }
  },
  company: {
    code: { type: String, required: true },
    role: { type: String, required: true }, //admin, manager, staff
  }
});

AccountSchema.index({ email: 1, "company.code": 1 }, { unique: true });

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
  get: (id, dataFilter) => {
    if(dataFilter === undefined) {
      dataFilter = {
        password: 0
      }
    }
    return new Promise((resolve, reject) => {
      Model.findById(new ObjectId(id), dataFilter, function(err, doc) {
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
      company: {
        code: '',
        role: 'staff'
      }
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
  },
  updatePassword: (user_id, new_password) => {
    schema = {
      password: new_password
    }
    return new Promise((resolve, reject) => {
      Model.findByIdAndUpdate(new ObjectId(user_id), schema, function (err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
}
