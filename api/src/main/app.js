var blocked = require('blocked')
var bodyParser = require('body-parser')
var compression = require('compression')
var cors = require('cors')
var express = require('express')
var expressValidator = require('express-validator')
var expressWinston = require('express-winston')
var helmet = require('helmet')
var mongoose = require('mongoose')
var path = require('path')

// globals
global.APP_DIR = process.cwd()

global.rootRequire = function (name) {
  return require(path.dirname(__filename) + '/' + name)
}

global.rootPath = function (name) {
  return path.resolve(global.APP_DIR + '/' + name)
}

// config
var config = rootRequire('config')

// logger
var logger = rootRequire('logger')

// blocked
blocked(function (ms) {
  logger.warn('blocked for %sms', ms | 0)
})

// app
var app = express()

// cors
app.use(cors())

// helmet
app.use(helmet())

// static
app.use(express.static(path.join(__dirname, 'web')))

// middleware
app.use(compression())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(expressValidator({
  customValidators: {
    isObjectId: function (id) {
      try {
        return mongoose.Types.ObjectId(id)
      } catch (err) {
        return false
      }
    }
  }
}))

var expressWinstonLogger = config.logger
expressWinstonLogger.level = 'info'
app.use(expressWinston.logger(expressWinstonLogger))

// unauthenticated routes
app.use('/ad', rootRequire('ad-view/route'))
app.use('/ads', rootRequire('ad-search/route'))
app.use('/attachment', rootRequire('attachment-view/route'))
app.use('/auth', rootRequire('auth/route'))
app.use('/user-view', rootRequire('user-view/route'))

// auth
app.use(rootRequire('auth/middleware'))

// authenticated routes
app.use('/ad', rootRequire('ad/route'))
app.use('/attachment', rootRequire('attachment/route'))
app.use('/domain', rootRequire('domain/route'))
app.use('/user', rootRequire('user/route'))

// error handling
app.use(function (err, req, res, next) {
  logger.error(err.stack)
  return res.status(500).send({
    status: 500,
    message: 'Internal error',
    type: 'internal_error'
  }) || next()
})

// mongo/db
mongoose.connect(config.mongodb.url())
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', logger.error)

db.once('open', function () {
  logger.info('MongoDB/mongoose connected successfully at: %s', config.mongodb.url())
})

// server http/https?
var server = null

function start () {
  return new Promise(function (resolve, reject) {
    try {
      server = app.listen(config.http.port, config.http.host, function () {
        logger.info('App listening on:', server.address())
        logger.info('APP_DIR="%s", env="%s"', global.APP_DIR, config.name)
        resolve(server)
      })
    } catch (err) {
      reject(err)
    }
  })
}

function close () {
  return new Promise(function (resolve, reject) {
    try {
      // db close ??
      resolve(server.close())
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  app,
  close,
  config,
  db,
  logger,
  server,
  start
}

require('make-runnable')