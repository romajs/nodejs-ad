var config = rootRequire('main/config')
var jwkToPem = require('jwk-to-pem')
var jwt = require('jsonwebtoken')
var logger = rootRequire('main/logger')

// var jwk = expressJwtSecret({
//   jwksUri: `https://${process.env.AUTH0_TENANT}.auth0.com/.well-known/jwks.json`
// })

var jwk = {
  'alg': 'RS256',
  'kty': 'RSA',
  'use': 'sig',
  'x5c': ['MIIDBTCCAe2gAwIBAgIJZWozd7JGp1QUMA0GCSqGSIb3DQEBCwUAMCAxHjAcBgNVBAMTFWFwcDc5NDkzMTIwLmF1dGgwLmNvbTAeFw0xNzEyMDYxOTQzMjJaFw0zMTA4MTUxOTQzMjJaMCAxHjAcBgNVBAMTFWFwcDc5NDkzMTIwLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL5aEJx5BdyIZD/Wwb0uu8iNT0OVI0J5/6F3KJPpet4F/vy8CAmm7BKgUD0WN+HV+fSIJ2ebd882z1Kkjp9u5gAhdqTcGrhP5lgjahfIOu45EyGh7Uo5I/ytNWQgGjqDKr4HnryHU4m8dWGAxEDDMopWW94G05rfmQFfP1swA02aiASi38Cs89bymxBqFEFRGG1dKLuxYCn/ByuJ68UWTY658vhNsuyuUkywznOiXNLTAFrV1TZs8UMLAZl/7k5J8oDsSOmLV21b+knR5M/E6hpDl67jjwiuecYCCKdp+Pgm2TORQIkPlInM9sCqnZw4hyuqll8txWUCf2PVvG5Xi+ECAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUTAdlMjBWgLWuYbFgurahTtvJkbwwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQAMzdsP5pne6YxfxFc4rZhgMT7K2pssiCuNZnKkAJsRW3HanCfj2ecM+xCis8WyaUCwKU88KYuWyAnG1L//eRpLsgFMZYY61tOfSuF9IR/AyQUYx5gWYE5BVSueLyjqWY8t4tuNjkhZ9wVdtq2Fy+pT2GbhyLVMDv/40834aIOD/yh8U5j9vZvSBaAb52uaF+MT4ulv93HV/wUg7cv20GVG3K0RH5IfzLcvqmznnx2FrjpRTWBrBSgweqmDFJuNLreFIq7GsOlotynnpvnAuP4izlwWDtHpPfBOrXENZBfHq06ZEftAmtJlAE+4VHMcF9GX48r+LsBzXn9PJSZqKsM8'],
  'n': 'vloQnHkF3IhkP9bBvS67yI1PQ5UjQnn_oXcok-l63gX-_LwICabsEqBQPRY34dX59IgnZ5t3zzbPUqSOn27mACF2pNwauE_mWCNqF8g67jkTIaHtSjkj_K01ZCAaOoMqvgeevIdTibx1YYDEQMMyilZb3gbTmt-ZAV8_WzADTZqIBKLfwKzz1vKbEGoUQVEYbV0ou7FgKf8HK4nrxRZNjrny-E2y7K5STLDOc6Jc0tMAWtXVNmzxQwsBmX_uTknygOxI6YtXbVv6SdHkz8TqGkOXruOPCK55xgIIp2n4-CbZM5FAiQ-Uicz2wKqdnDiHK6qWXy3FZQJ_Y9W8bleL4Q',
  'e': 'AQAB',
  'kid': 'ODAyQzBCQTgwNzY5QkRFRjdEOTY3Qjg0MTg5MEQ4NkNCM0I0OEUwMg',
  'x5t': 'ODAyQzBCQTgwNzY5QkRFRjdEOTY3Qjg0MTg5MEQ4NkNCM0I0OEUwMg'
}

var pem = jwkToPem(jwk)
// logger.debug('pem:', pem)

var AccountPlanType = rootRequire('main/account-plan/model').AccountPlanType
var User = rootRequire('main/user/model').User

function AuthMiddleware (req, res, next) {
  // TODO: validade w/ express validator?

  // TODO: get header from Authorization + Bearer

  var token = req.body.token || req.param('token') || req.headers[config.auth.header_name]
  // logger.debug('token:', token)

  if (token) {
    jwt.verify(token, pem, function (err, decoded) {
      if (err) {
        logger.error(err)
        return res.status(403).json({
          success: false,
          message: 'Failed to authenticate token'
        })
      } else {
        logger.debug('decoded:', decoded)
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
