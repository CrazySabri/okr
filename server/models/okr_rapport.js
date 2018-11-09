var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OkrRapportSchema = new Schema({
  title: { type: String },
  rapport: { type: String },
  okrId: { type: Schema.ObjectId },
  ownerId: { type: Schema.ObjectId },
  date_created: { type: Date },
  date_updated: { type: Date }
});

var Model = mongoose.model("okr_rapport", OkrRapportSchema);


module.exports = {
  model: Model
}
