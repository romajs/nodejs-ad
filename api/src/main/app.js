var blocked = require('blocked')
var bodyParser = require('body-parser')
var compression = require('compression')
var cors = require('cors')
var express = require('express')
var expressValidator = require('express-validator')
var expressWinston = require('express-winston')
var helmet = require('helmet')
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
var staticDirPath = path.join('/app/web/src/main');
logger.debug('staticDirPath:', staticDirPath)
app.use(express.static(staticDirPath))

// cors
app.use(cors())

// helmet
app.use(helmet())

// middleware
app.use(compression())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(expressValidator({
  customValidators: {
    isObjectId: db.isObjectId
  }
}))

var expressWinstonLogger = config.logger
expressWinstonLogger.level = 'info'
app.use(expressWinston.logger(expressWinstonLogger))

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

// TODO: http & https
var server = null

function start () {
  return new Promise(function (resolve, reject) {
    try {
      server = app.listen(config.http.port, config.http.host, function () {
        logger.info('App listening on:', server.address())
        logger.info('APP_DIR="%s", env="%s"', global.APP_DIR, config.name)
        // resolve(server) // FIXME make-runnable printOutput: false
      })
    } catch (err) {
      reject(err)
    }
  })
}

function close () {
  return new Promise(function (resolve, reject) {
    try {
      resolve(server.close())
    } catch (err) {
      reject(err)
    }
  })
}

// workers
var adWorker = rootRequire('ad/worker')

module.exports = {
  app,
  close,
  server,
  start
}

require('make-runnable/custom')({
  printOutputFrame: false
})
