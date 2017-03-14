var app = require('./app.js')
var config = require('./config.js')
var winston = require('winston')

// server
server = app.listen(config.http.port, config.http.host, function () {
  new (winston.Logger)(config.logger).info('App listening on:', server.address())
})

module.exports = server