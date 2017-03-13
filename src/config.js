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

module.exports = config