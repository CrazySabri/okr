var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OkrSchema = new Schema({
  name: { type: String },
  objective: { type: String },
  keyresults: [{
    key: {
      type: String
    },
    result: {
      type: String
    }
  }],
  children: [{
    type: Schema.ObjectId
  }],
  parentId: { type: Schema.ObjectId },
  ownerId: { type: Schema.ObjectId },
  companyId: { type: Schema.ObjectId, require: true },
  teamId: { type: Schema.ObjectId },
  personalId: { type: Schema.ObjectId },
  status: { type: String, required: true },
  type: { type: String, required: true },
  date_start: { type: Date },
  date_end: { type: Date }
});

var Model = mongoose.model("Okr", OkrSchema);


module.exports = {
  model: Model
}
