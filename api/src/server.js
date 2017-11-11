var path = require('path')

// globals
global.APP_DIR = process.cwd()

global.rootRequire = function (name) {
  return require(path.dirname(__filename) + '/main/' + name)
}

global.rootPath = function (name) {
  return path.resolve(global.APP_DIR + '/main/' + name)
}

// config
var config = rootRequire('config')

// logger
var logger = rootRequire('logger')

// config
var app = rootRequire('app')

// db
var db = rootRequire('db')

var httpServer = null

function startHttpServer() {
  return new Promise(function (resolve, reject) {
    try {
      httpServer = app.listen(config.http.port, config.http.host, function () {
        logger.info('App listening on:', httpServer.address())
        logger.info('APP_DIR="%s", env="%s"', global.APP_DIR, config.name)
        // resolve(httpServer) // FIXME make-runnable printOutput: false
      })
    } catch (err) {
      reject(err)
    }
  })
}

function start () {
  return Promise.all([
    startHttpServer(),
    db.start()
  ])
}

function close () {
  return new Promise(function (resolve, reject) {
    try {
      resolve(httpServer.close())
    } catch (err) {
      reject(err)
    }
  })
}

// workers
// var adWorker = rootRequire('ad/worker')

module.exports = {
  app,
  close,
  httpServer,
  start
}

require('make-runnable/custom')({
  printOutputFrame: false
})
