var jwt = require('jsonwebtoken')
var logger = rootRequire('main/logger')

var express = require('express')
var router = express.Router()

var AccountPlanType = rootRequire('main/account-plan/model').AccountPlanType
var User = rootRequire('main/user/model').User

router.post('/', function (req, res, next) {
  var token = req.token // provided by "express-bearer-token" middleware
  var decoded = jwt.decode(token)
  var openId = decoded.sub

  User.findOne({ open_id: openId }).then(function (user) {
    if (user) {
      return user
    } else {
      logger.debug('No user found with openId:', openId)
      user = new User({
        open_id: openId,
        account_plan_type: AccountPlanType.FREE,
        admin: false,
        name: decoded.given_name
      })
      return user.save().then(function (user) {
        logger.debug('Created new user with openId:', openId)
        return user
      })
    }
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    return next(err)
  })
})

module.exports = router
