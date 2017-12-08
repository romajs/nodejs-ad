var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  open_id: {
    type: String,
    index: {
      unique: true
    }
  },
  admin: Boolean,
  name: String,
  account_plan_type: String,
  quota: {
    total: {
      type: Number,
      default: 10
    },
    used: {
      type: Number,
      default: 0
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
})

var User = mongoose.model('User', UserSchema)

module.exports = {
  User,
  UserSchema
}
