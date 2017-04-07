var winston = require('winston')

process.env.NODE_ENV = 'dev'

function config(env) {

	var baseConfig = {
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

	var configs = {}

	configs.dev = Object.assign(baseConfig)
	configs.dev.mongodb.host = 'localhost'
	configs.dev.mongodb.port = 27017
	configs.dev.mongodb.dbname = 'nodejs-ad'

	return configs[env]

}

module.exports = config(process.env.NODE_ENV)