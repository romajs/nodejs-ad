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
var config = rootRequire('config')

// logger
var logger = rootRequire('logger')

// db
var db = rootRequire('db')

// // rsmq
// var rsmq = rootRequire('rsmq')

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
app.use('/api/ad', rootRequire('ad-view/route'))
app.use('/api/ads', rootRequire('ad-search/route'))
app.use('/api/attachment', rootRequire('attachment-view/route'))
app.use('/api/auth', rootRequire('auth/route'))
app.use('/api/user-view', rootRequire('user-view/route'))

// auth
app.use(rootRequire('auth/middleware'))

// authenticated routes
app.use('/api/ad', rootRequire('ad/route'))
app.use('/api/attachment', rootRequire('attachment/route'))
app.use('/api/domain', rootRequire('domain/route'))
app.use('/api/user', rootRequire('user/route'))

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
