// config
var config = rootRequire('main/config')

// logger
var logger = rootRequire('main/logger')

// config
var app = rootRequire('main/app')

// db
var db = rootRequire('main/db')

var httpServer = null

function startHttpServer () {
  return new Promise(function (resolve, reject) {
    try {
      httpServer = app.listen(config.http.port, config.http.host, function () {
        logger.info('App listening on:', httpServer.address())
        logger.info('INDEX_DIR="%s", env="%s"', global.INDEX_DIR, config.name)
        resolve(httpServer)
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
// var adWorker = rootRequire('main/ad/worker')

module.exports = {
  app,
  close,
  httpServer,
  start
}
