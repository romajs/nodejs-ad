var blocked = require('blocked')
var bodyParser = require('body-parser')
var compression = require('compression')
var express = require('express')
var expressValidator = require('express-validator')
var expressWinston = require('express-winston')
var mongoose = require('mongoose')
var path = require('path')

// globals
global.APP_DIR = process.cwd()

global.rootRequire = function(name) {
	return require(__dirname + '/' + name)
}

global.rootPath = function(name) {
	return path.resolve(APP_DIR + '/' + name)
}

global.Enum = function (arr) {
	var obj = {}
	arr.forEach(function(e) { obj[e] = e })
	return obj
}

// config
var config = rootRequire('config')

// logger
var logger = rootRequire('logger')

// blocked
blocked(function(ms) {
	logger.warn('blocked for %sms', ms | 0)
})

// app
var app = express()

// static
app.use(express.static(path.join(__dirname, 'web')))

// middleware
app.use(compression())
app.use(bodyParser.urlencoded({	extended: false }))
app.use(bodyParser.json())
app.use(expressValidator({
 customValidators: {
    isObjectId: function(id) {
    		try {
    			return mongoose.Types.ObjectId(id)
    		} catch(err) {
    			return false
    		}
    },
 }
}))
app.use(expressWinston.logger(config.logger))

// non-authenticated routes
app.use('/ads', rootRequire('api/route/adsRoute'))
app.use('/auth', rootRequire('api/route/authRoute'))
app.use('/attachment', rootRequire('api/route/attachmentViewRoute'))

// auth
app.use(rootRequire('api/middleware/authMiddleware'))

// authenticated routes
app.use('/ad', rootRequire('/api/route/adRoute'))
app.use('/attachment', rootRequire('api/route/attachmentRoute'))
app.use('/domain', rootRequire('api/route/domainRoute'))
app.use('/user', rootRequire('/api/route/userRoute'))

// error handling
app.use(function (err, req, res, next) {
	logger.error(err)
	return res.status(500).send({
		status: 500,
		message: 'Internal error',
		type: 'internal_error',
	})
})

// mongo/db
mongoose.connect(config.mongodb.url())
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', logger.error)

db.once('open', function() {
  logger.info('MongoDB/mongoose connected successfully at: %s', config.mongodb.url())
})

// server http/https?
var server = null

function start() {
	return new Promise(function(resolve, reject) {
		server = app.listen(config.http.port, config.http.host, function () {
			logger.info('App listening on:', server.address())
			logger.info('APP_DIR="%s", process.env.NODE_ENV="%s"', APP_DIR, process.env.NODE_ENV)
			resolve(server)
		})
	})
}

function close() {
	return new Promise(function(resolve, reject) {
		resolve(server.close())
	})
}

module.exports = {
	app,
	close,
	config,
	db,
	logger,
	server,
	start,
}