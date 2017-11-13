var config = rootRequire('main/config')
var winston = require('winston')

var logger = new (winston.Logger)(config.logger)

module.exports = logger
