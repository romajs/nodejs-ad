var AccountPlan = rootRequire('main/account-plan/model').AccountPlan
var User = rootRequire('main/user/model').User

var express = require('express')
var router = express.Router()

router.get('/account', function (req, res, next) {
  return User.findById(req.auth.user._id).then(function (user) {
    return res.status(200).json({
      username: user.username,
      admin: user.admin,
      name: user.name,
      account_plan_type: user.account_plan_type,
      quota: AccountPlan.findByType(user.account_plan_type),
      ads: user.ads,
      created_at: user.created_at,
      updated_at: user.updated_at
    })
  }).catch(function (err) {
    return next(err)
  })
})

router.get('/account-plan/quota', function (req, res, next) {
  return User.findById(req.auth.user._id).then(function (user) {
    return AccountPlan.findByType(user.account_plan_type).then(function (quota) {
      return res.status(200).json({
        // left: quota - user.ads.actives,
        quota: quota
        // type: user.account_plan_type
      })
    })
  }).catch(function (err) {
    return next(err)
  })
})

router.get('/:id', function (req, res, next) {
  req.checkParams('id').isObjectId()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    return User.findById(req.params.id).then(function (user) {
      return res.status(user ? 200 : 404).json(user)
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
