var blocked = require('blocked')
var bodyParser = require('body-parser')
var compression = require('compression')
var cors = require('cors')
var express = require('express')
var expressValidator = require('express-validator')
var expressWinston = require('express-winston')
var helmet = require('helmet')
var path = require('path')

// config
var config = rootRequire('main/config')

// logger
var logger = rootRequire('main/logger')

// db
var db = rootRequire('main/db')

// // rsmq
// var rsmq = rootRequire('main/rsmq')

// blocked
blocked(function (ms) {
  logger.warn('blocked for %sms', ms | 0)
})

// app
var app = express()

// static
app.use(express.static(function () {
  var staticDirPath = path.join('/app/web/src/main')
  logger.debug('staticDirPath:', staticDirPath)
  return staticDirPath
}()))

// cors
app.use(cors())

// helmet
app.use(helmet())

// compression
app.use(compression())

// body parser / x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// body parse / json
app.use(bodyParser.json())

// custom express validatos
app.use(expressValidator({
  customValidators: {
    isObjectId: db.isObjectId
  }
}))

// express winston logger
app.use(expressWinston.logger(function () {
  // always info, otherwise it wont work
  var configLogger = config.logger
  configLogger.level = 'info'
  return configLogger
}()))

// unauthenticated routes
app.use('/api/ad', rootRequire('main/ad-view/route'))
app.use('/api/ads', rootRequire('main/ad-search/route'))
app.use('/api/attachment', rootRequire('main/attachment-view/route'))
app.use('/api/auth', rootRequire('main/auth/route'))
app.use('/api/user-view', rootRequire('main/user-view/route'))

// auth
app.use(rootRequire('main/auth/middleware'))

// authenticated routes
app.use('/api/ad', rootRequire('main/ad/route'))
app.use('/api/ads/user', rootRequire('main/ads-user/route'))
app.use('/api/attachment', rootRequire('main/attachment/route'))
app.use('/api/domain', rootRequire('main/domain/route'))
app.use('/api/user', rootRequire('main/user/route'))

// error handling
app.use(function (err, req, res, next) {
  logger.error(err.stack)
  return res.status(500).send({
    status: 500,
    message: 'Internal error',
    type: 'internal_error'
  }) || next()
})

module.exports = app
