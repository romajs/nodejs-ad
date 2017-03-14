var bodyParser = require('body-parser')
var config = require('./config.js')
var express = require('express')
var expressWinston = require('express-winston')
var path = require('path')
var winston = require('winston')

// app
var app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// TODO: accept multipart/form-data

// logger
app.use(expressWinston.logger(config.logger));

// resources
app.use('/ad', require('./api/resource/ad.js'))
// app.use('/user', require('./api/resource/user.js'))

// static
app.use(express.static(path.join(__dirname, 'web')))

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