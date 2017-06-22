var config = rootRequire('config')
var jwt = require('jsonwebtoken')

var User = rootRequire('api/user/model').User

function AuthMiddleware (req, res, next) {
  // TODO: validade w/ express validator?

  var token = req.body.token || req.param('token') || req.headers[config.auth.header_name]

  if (token) {
    jwt.verify(token, config.auth.secret, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Failed to authenticate token'
        })
      } else {
        User.findById(decoded._id).then(function (user) {
          req.auth = {
            token,
            decoded,
            user
          }
          return next()
        }).catch(function (err) {
          return next(err)
        })
      }
    })
  } else {
    return res.status(400).send({
      success: false,
      message: 'No token provided'
    })
  }
}

module.exports = AuthMiddleware
