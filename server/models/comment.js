var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var CommentSchema = new Schema({
  type: String,
  parentId: Schema.ObjectId,
  comment: String,
  ownerId: Schema.ObjectId,
  date_created: Date
});

var Model = mongoose.model("Comment", CommentSchema);

module.exports = {
  list: (type, parentId) => {
    return new Promise((resolve, reject) => {
      Model.find({
        type: type,
        parentId: new ObjectId(parentId)
      }, function(err, doc) {
        if(err) {
          reject(err)
        } else {
          resolve(doc)
        }
      }).sort({_id:-1})
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
  create: (schema) => {

    schema = {
      type: schema.type,
      parentId: new ObjectId(schema.parentId),
      comment: schema.comment,
      ownerId: new ObjectId(schema.ownerId),
      date_created: schema.date_created
    }

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
