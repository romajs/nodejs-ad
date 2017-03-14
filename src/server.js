var app = require('./app.js')
var config = require('./config.js')
var winston = require('winston')

// server
server = app.listen(config.server.port, function () {
  new (winston.Logger)(config.logger).info('App listening on:', server.address())
  process.send && process.send('listening');
})

module.exports = server