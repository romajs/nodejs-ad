var app = require('./app')
var config = rootRequire('config')
var logger = rootRequire('logger')

// blocked
var blocked = require('blocked')
blocked(function(ms) {
	logger.warn('blocked for %sms', ms | 0)
})

// server
var server = null

module.exports.start = function() {
	return new Promise(function(resolve, reject) {
		server = app.listen(config.http.port, config.http.host, function () {
			logger.info('App listening on:', server.address())
			resolve(server)
		})
	})
}

module.exports.close = function() {
	return new Promise(function(resolve, reject) {
		resolve(server.close())
	})
}

// make-runnable
require('make-runnable')