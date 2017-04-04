var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  username:  String,
  password: String,
  admin: Boolean,
}))

module.exports = User