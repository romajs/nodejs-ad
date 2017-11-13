var config = rootRequire('main/config')
var mongoose = require('mongoose')
var logger = rootRequire('main/logger')

var client = null

function start () {
  return new Promise(function (resolve, reject) {
    client = mongoose.connect(config.mongodb.url())
    mongoose.connection.on('error', function (err) {
      logger.error(err)
      reject(err)
    })
    mongoose.connection.once('open', function () {
      logger.info('MongoDB/mongoose connected successfully at: %s', config.mongodb.url())
      resolve(mongoose.connection)
    })
  })
}

function isObjectId (id) {
  try {
    return mongoose.Types.ObjectId(id)
  } catch (err) {
    return false
  }
}

function disconnect () {
  return client.disconnect()
}

mongoose.Promise = global.Promise

module.exports = {
  connection: mongoose.connection,
  disconnect,
  isObjectId,
  start
}
