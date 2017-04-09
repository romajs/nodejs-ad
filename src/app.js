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
logger.info('APP_DIR: %s', APP_DIR)

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

// error handling
app.use(function (err, req, res, next) {
	logger.error(err)
	return res.status(500).send({
		status: 500,
		message: 'Internal error',
		type: 'internal_error',
	})
})

module.exports = app