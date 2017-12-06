var User = rootRequire('main/user/model').User

var express = require('express')
var router = express.Router()

router.get('/account', function (req, res, next) {
  return User.findById(req.auth.user._id).then(function (user) {
    return res.status(200).json({
      _id: user._id,
      __v: user.__v,
      username: user.username,
      admin: user.admin,
      name: user.name,
      account_plan_type: user.account_plan_type,
      quota: user.quota,
      created_at: user.created_at,
      updated_at: user.updated_at
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
      if (user) {
        res.status(200).json({
          _id: user._id,
          __v: user.__v,
          username: user.username,
          admin: user.admin,
          name: user.name,
          account_plan_type: user.account_plan_type,
          quota: user.quota,
          created_at: user.created_at,
          updated_at: user.updated_at
        })
      } else {
        return res.status(404).end()
      }
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
