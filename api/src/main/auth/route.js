var User = rootRequire('main/user/model').User

var config = rootRequire('main/config')
var jwt = require('jsonwebtoken')

var express = require('express')
var router = express.Router()

router.post('/', function (req, res, next) {
  req.checkBody('username', 'required').notEmpty()
  req.checkBody('password', 'required').notEmpty()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    User.findOne({
      username: req.body.username
    }).then(function (user) {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Authentication failed. User not found'
        })
      }

      if (user.password !== req.body.password) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed. Wrong password'
        })
      } else {
        var json = {
          __v: user.__v,
          _id: user._id,
          username: user.username
        }

        var token = jwt.sign(json, config.auth.secret, {
          expiresIn: config.auth.expiresIn
        })

        return res.status(200).json({
          success: true,
          message: 'Authentication granted successfully',
          token: token
        })
      }
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
