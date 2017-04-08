var bodyParser = require('body-parser')
var compression = require('compression')
var express = require('express')
var expressValidator = require('express-validator')
var expressWinston = require('express-winston')
var mongoose = require('mongoose')
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
// app.use(expressWinston.logger(config.logger))
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

// auth
app.use(require(path.join(__dirname, 'api/middleware/authMiddleware.js')))

// authenticated routes
app.use('/ad', require(path.join(__dirname, '/api/route/adRoute.js')))
app.use('/domain', require(path.join(__dirname, 'api/route/domainRoute.js')))

// error logger
app.use(function (err, req, res, next) {
	return res.status(500).send({
		status: 500,
		message: 'Internal error',
		type: 'internal_error',
	}) && next(err)
})

module.exports = app