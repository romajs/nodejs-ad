var express = require('express')
var path = require('path')

var app = express()

// resources
app.use('/ad', require('./api/resource/ad.js'))
app.use('/user', require('./api/resource/user.js'))

// static
app.use(express.static(path.join(__dirname, 'web')))

// server
server = app.listen(8000, function () {
  console.info('App listening on:', server.address())
})

module.exports = app