// src
process.env.src = process.env.src || __dirname

// config
var config = require(process.env.src + '/config.js')

// logger
var winston = require('winston')
var logger = new (winston.Logger)(config.logger)

// mongodb
var mongoose = require('mongoose')
mongoose.connect(config.mongodb.url())
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', logger.error)

db.once('open', function() {
  logger.info('MongoDB/mongoose connected successfully at: %s', config.mongodb.url())
})

// express
var app = require(process.env.src + '/app.js')

logger.info('process.env.src: %s', process.env.src)

module.exports.app = app
module.exports.config = config
module.exports.logger = logger
module.exports.db = db