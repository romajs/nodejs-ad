var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  username: String,
  password: String,
  admin: Boolean,
  name: String,
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

var User = mongoose.model('User', UserSchema)

module.exports = {
  User,
  UserSchema
}
