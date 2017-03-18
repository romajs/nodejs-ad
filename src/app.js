var auth = require('./api/middleware/auth.js')
var blocked = require('blocked')
var bodyParser = require('body-parser')
var compression = require('compression')
var config = require('./config.js')
var express = require('express')
var expressWinston = require('express-winston')
var path = require('path')
var winston = require('winston')

// logger
var logger = new (winston.Logger)(config.logger)

// blocked
blocked(function(ms) {
  logger.warn('blocked for %sms', ms | 0)
})

// app
var app = express()

// logger
app.use(expressWinston.logger(config.logger));

// static
app.use(express.static(path.join(__dirname, 'web')))

// middleware
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// TODO: accept multipart/form-data
app.use(expressWinston.logger(config.logger));

// non-authenticated resources
app.use('/auth', require('./api/resource/auth.js'))

// auth
// app.use(auth) // FIXME: test auto user load

// authenticated resources
app.use('/ad', require('./api/resource/ad.js'))
// app.use('/user', require('./api/resource/user.js'))

// error logger
app.use(function (err, req, res, next) {
  res.status(500).send({
    status: 500,
    message: 'Internal error',
    type: 'internal_error',
  })
  next(err)
})

module.exports = app
module.exports.config = config
module.exports.logger = logger
