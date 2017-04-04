var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ad = mongoose.model('Ad', new Schema({
  title:  String,
  details: String,
}))

module.exports = Ad