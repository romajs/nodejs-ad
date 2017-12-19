var logger = rootRequire('main/logger')
var request = require('request')

function getJwks (jwksUri) {
  return new Promise(function (resolve, reject) {
    logger.silly('requesting jwksUri:', jwksUri)
    request({
      uri: jwksUri,
      json: true
    }, function (err, res) {
      if (err || res.statusCode < 200 || res.statusCode >= 300) {
        if (res) {
          var errorMessage = res.body ? (res.body.message || res.body) : res.statusMessage || `Http Error ${res.statusCode}`
          return reject(new Error(errorMessage))
        }
        return reject(err)
      }
      var keys = res.body.keys
      return resolve(keys)
    })
  })
}

function getSigningKeys (keys) {
  if (!keys || !keys.length) {
    return Promise.reject(new Error('The JWKS endpoint did not contain any keys'))
  }
  const signingKeys = keys.filter(function (key) {
    return key.use === 'sig' && key.kty === 'RSA' && key.kid && key.x5c && key.x5c.length
  })
  if (!signingKeys.length) {
    return Promise.reject(new Error('The JWKS endpoint did not contain any signing keys'))
  }
  return Promise.resolve(signingKeys)
}

module.exports = {
  getJwks,
  getSigningKeys
}
