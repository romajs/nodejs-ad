// env
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.src = process.env.src || __dirname

// config
var config = require(process.env.src + '/config.js')

// express
var app = require(process.env.src + '/app.js')
var logger = require(process.env.src + '/logger.js')

// mongodb
var mongoose = require('mongoose')
mongoose.connect(config.mongodb.url())
mongoose.Promise = global.Promise

// db
var db = mongoose.connection
db.on('error', logger.error)
db.once('open', function() {
  logger.info('MongoDB/mongoose connected successfully at: %s', config.mongodb.url())
})

// logger
logger.info('process.env.src: %s', process.env.src)
logger.info('process.env.NODE_ENV: %s', process.env.NODE_ENV)

module.exports = {
	app,
	config,
	logger,
	db
}
