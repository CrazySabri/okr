var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OkrSchema = new Schema({
  name: { type: String, required: true },
  objective: { type: String, required: true },
  keyresults: [{ type: String, required: true }],
  children: [{
      type: Schema.ObjectId
  }],
  parentId: { type: Schema.ObjectId },
  ownerId: { type: Schema.ObjectId },
  companyId: { type: Schema.ObjectId, require: true },
  members: [{
      type: Schema.ObjectId
  }],
  managers: [{
    type: Schema.ObjectId
  }]
});

var Model = mongoose.model("Okr", OkrSchema);


module.exports = {
  model: Model
}
