var config = rootRequire('config')
var mongoose = require('mongoose')
var logger = rootRequire('logger')

mongoose.connect(config.mongodb.url())
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', logger.error)

db.once('open', function () {
  logger.info('MongoDB/mongoose connected successfully at: %s', config.mongodb.url())
})

module.exports = {
  db,
  isObjectId: function (id) {
    try {
      return mongoose.Types.ObjectId(id)
    } catch (err) {
      return false
    }
  }
}