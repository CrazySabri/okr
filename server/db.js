
module.exports = function(app) {
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/okr');
  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", function(callback){
    console.log("Connection Succeeded");
  });
}
