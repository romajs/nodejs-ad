// var mongoose = require('mongoose')
// var Schema = mongoose.Schema

// var AccountPlanSchema = new Schema({
//   name: String,
//   quota: Number,
//   created_at: {
//     type: Date,
//     default: Date.now
//   },
//   updated_at: {
//     type: Date
//   }
// })

// var AccountPlan = mongoose.model('AccountPlan', AccountPlanSchema)

// module.exports = {
//   AccountPlan,
//   AccountPlanSchema
// }

var Enum = rootRequire('main/misc/util').Enum

var AccountPlanType = new Enum('FREE')

var QUOTAS = {
  'FREE': 10
}

var AccountPlan = {
  findByType: function (type) {
    var quota = QUOTAS[type]
    return quota
    // return new Promise(function (resolve, reject) {
    //   if (quota) {
    //     resolve(quota)
    //   } else {
    //     reject(type)
    //   }
    // })
  }
}

module.exports = {
  AccountPlan,
  AccountPlanType
}
