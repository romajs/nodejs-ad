var bodyParser = require('body-parser')
var compression = require('compression')
var express = require('express')
var expressWinston = require('express-winston')
var path = require('path')

// config
var config = require(path.join(__dirname, 'config.js'))

// app
var app = express()

// logger
app.use(expressWinston.logger(config.logger))

// static
app.use(express.static(path.join(__dirname, 'web')))

// middleware
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// TODO: accept multipart/form-data
app.use(expressWinston.logger(config.logger))

// non-authenticated routes
app.use('/auth', require(path.join(__dirname, 'api/route/authRoute.js')))
app.use('/ads', require(path.join(__dirname, 'api/route/adsRoute.js')))

// auth
app.use(require('./api/middleware/authMiddleware.js'))

// authenticated routes
app.use('/ad', require('./api/route/adRoute.js'))

// error logger
app.use(function (err, req, res, next) {
	res.status(500).send({
		status: 500,
		message: 'Internal error',
		type: 'internal_error',
	})
	next(err)
})

module.exports = app