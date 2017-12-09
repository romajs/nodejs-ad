var User = rootRequire('main/user/model').User

var config = rootRequire('main/config')
var jwt = require('jsonwebtoken')

var express = require('express')
var router = express.Router()

router.post('/', function (req, res, next) {
  var token = req.body.token || req.param('token') || req.headers[config.auth.header_name]

  var decodedToken = jwt.decode(token)
  // logger.debug('decodedToken:', decodedToken)

  var openId = decodedToken.sub

  User.findOne({ open_id: openId }).then(function (user) {
    if (user) {
      return user
    } else {
      return new User({
        open_id: openId,
        account_plan_type: AccountPlanType.FREE,
        admin: false,
        name: decoded.given_name
      }).save()
    }
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    return next(err)
  })
})

module.exports = router
