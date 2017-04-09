var bodyParser = require('body-parser')
var compression = require('compression')
var express = require('express')
var expressValidator = require('express-validator')
var expressWinston = require('express-winston')
var mongoose = require('mongoose')
var path = require('path')
var winston = require('winston')

// config
var config = require(path.join(__dirname, 'config.js'))

// app
var app = express()

// logger
var logger = new (winston.Logger)(config.logger)
app.use(expressWinston.logger(config.logger))
app.set('logger', logger)

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

// non-authenticated routes
app.use('/ads', require(path.join(__dirname, 'api/route/adsRoute.js')))
app.use('/auth', require(path.join(__dirname, 'api/route/authRoute.js')))
app.use('/download', require(path.join(__dirname, 'api/route/downloadRoute.js')))

// auth
app.use(require(path.join(__dirname, 'api/middleware/authMiddleware.js')))

// authenticated routes
app.use('/ad', require(path.join(__dirname, '/api/route/adRoute.js')))
app.use('/domain', require(path.join(__dirname, 'api/route/domainRoute.js')))
app.use('/upload', require(path.join(__dirname, 'api/route/uploadRoute.js')))

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