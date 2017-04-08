var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  String,
  password: String,
  admin: Boolean,
})

var User = mongoose.model('User', UserSchema)

module.exports = {
	User,
	UserSchema,
}