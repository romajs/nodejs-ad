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
  couchdb : {
    protocol : 'http',
    host : process.env.couchdb_host || 'localhost',
    port : process.env.couchdb_port || 5984,
    url : function() {
      return [this.protocol, '://', this.host, ':', this.port].join('')
    }
  },
	http : {
    host : process.env.http_host || '127.0.0.1',
		port : process.env.http_port || 8000,
	}
}

module.exports = config