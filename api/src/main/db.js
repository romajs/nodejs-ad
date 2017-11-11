var config = rootRequire('config')
var mongoose = require('mongoose')
var logger = rootRequire('logger')

var connection

mongoose.Promise = global.Promise

function start() {
  mongoose.connect(config.mongodb.url())

  connection = mongoose.connection

  connection.on('error', logger.error)

  connection.once('open', function () {
    logger.info('MongoDB/mongoose connected successfully at: %s', config.mongodb.url())
  })
}

function isObjectId (id) {
  try {
    return mongoose.Types.ObjectId(id)
  } catch (err) {
    return false
  }
}

module.exports = {
  connection,
  isObjectId,
  start
}