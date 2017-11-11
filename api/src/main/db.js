var config = rootRequire('config')
var mongoose = require('mongoose')
var logger = rootRequire('logger')

mongoose.Promise = global.Promise

function start () {
  mongoose.connect(config.mongodb.url())
  mongoose.connection.on('error', logger.error)
  mongoose.connection.once('open', function () {
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
  connection: mongoose.connection,
  isObjectId,
  start
}
