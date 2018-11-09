const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Promise  = require('promise')
const ObjectId = mongoose.Types.ObjectId

const NewsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String },
  draft: { type: Boolean},
  companyId: { type: Schema.ObjectId },
  date_created: { type: Date, required: true },
  date_updated: { type: Date, required: true }
});

const Model = mongoose.model('News', NewsSchema);

module.exports = {
  model: Model,
  listByCompanyId: (company_id) => {
    console.log(new ObjectId(company_id))
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

  get: (id) => {
    return new Promise((resolve, reject) => {
      Model.findById(new ObjectId(id), (err, doc) => {
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
      title: '',
      content: '',
      status: '',
      draft: '',
      companyId: '',
      date_created: new Date(),
      date_updated: new Date()
    }, schema || {})

    return new Promise((resolve, reject) => {
      var model = new Model(schema)
      model.save((err, doc) => {
        if (err) {
          reject(err)
        } else {
          console.log(doc)
          resolve(doc)
        }
      })
    })
  },

  update: (id, schema) => {
    return new Promise((resolve, reject) => {
      Model.findByIdAndUpdate(new ObjectId(id), { $set: schema }, { new: true }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      Model.findByIdAndRemove(new Object(id), (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}
