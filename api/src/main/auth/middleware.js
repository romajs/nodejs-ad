var config = rootRequire('main/config')
var jwkToPem = require('jwk-to-pem')
var jwt = require('jsonwebtoken')
var logger = rootRequire('main/logger')
var jwksClient = rootRequire('main/auth/jwks-client')

var User = rootRequire('main/user/model').User

var jwks = {
  signingKeys: [],
  pem: null
}

jwksClient.getJwks(config.auth.jwksUri).then(jwksClient.getSigningKeys).then(function (signingKeys) {
  jwks.signingKeys = signingKeys
  logger.silly('jwks.signingKeys:', jwks.signingKeys)

  jwks.pem = jwkToPem(signingKeys[0])
  logger.silly('jwks.pem:', jwks.pem)
})

function AuthMiddleware (req, res, next) {
  var token = req.token // provided by "express-bearer-token" middleware

  if (token) {
    jwt.verify(token, jwks.pem, function (err, decoded) {
      if (err) {
        logger.error(err)
        return res.status(403).json({
          success: false,
          message: 'Failed to authenticate token'
        })
      } else {
        var openId = decoded.sub
        User.findOne({ open_id: openId }).then(function (user) {
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
