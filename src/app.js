var bodyParser = require('body-parser')
var express = require('express')
var expressWinston = require('express-winston')
var path = require('path')
var winston = require('winston')

var config = {
  logger : {
    transports: [
      new winston.transports.Console({
        colorize: true,
        timestamp: true,
      })
    ],
    level : 'info',
    exitOnError: false,
    expressFormat: true,
    colorize: true,
  },
	server : {
		port : 8000,
	}
}

var app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// TODO: accept multipart/form-data

// logger
app.use(expressWinston.logger(config.logger));

// resources
app.use('/ad', require('./api/resource/ad.js'))
app.use('/user', require('./api/resource/user.js'))

// static
app.use(express.static(path.join(__dirname, 'web')))

// error logger
app.use(function (err, req, res, next) {
  res.status(500).send({
    status: 500,
    message: 'internal error',
    type: 'internal',
  })
  next(err)
})

// server
server = app.listen(config.server.port, function () {
  new (winston.Logger)(config.logger).info('App listening on:', server.address())
})

module.exports = app