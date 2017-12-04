var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  username: String,
  password: String,
  admin: Boolean,
  name: String,
  account_plan_type: String,
  // account_plan_id: {
  //   type: Schema.ObjectId,
  //   ref: 'AccountPlan'
  // },
  ads: {
    actives: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
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
