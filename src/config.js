var winston = require('winston')

var config = {
	auth : {
		header_name : 'x-access-token',
		secret : 'JHVwM3JfJDNjcjM3Cg==',
		expiresIn : 86400 // expires in 24 hours
	},
	logger : {
		transports: [
			new winston.transports.Console({
				colorize: true,
				timestamp: true
			})
		],
		level : 'info',
		exitOnError: false,
		expressFormat: true,
		colorize: true
	},
	mongodb : {
		protocol : 'mongodb',
		host : process.env.MONGODB_HOST || 'localhost',
		port : process.env.MONGODB_PORT || 27017,
		dbname : 'nodejs-ad',
		url : function() {
			return [this.protocol, '://', this.host, ':', this.port, '/', this.dbname].join('')
		}
	},
	http : {
		host : process.env.HTTP_HOST || '127.0.0.1',
		port : process.env.HTTP_PORT || 8000
	}
}

module.exports = config