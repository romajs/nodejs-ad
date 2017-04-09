var app = require('./app')
var config = rootRequire('config')
var logger = rootRequire('logger')

var ctx = rootRequire('ctx') // FIXME

var blocked = require('blocked')
blocked(function(ms) {
	logger.warn('blocked for %sms', ms | 0)
})

var server = null

function start() {
	return new Promise(function(resolve, reject) {
		server = app.listen(config.http.port, config.http.host, function () {
			logger.info('App listening on:', server.address())
			resolve(server)
		})
	})
}

function close() {
	return new Promise(function(resolve, reject) {
		resolve(server.close())
	})
}

module.exports = {
	server,
	start,
	close,
}

require('make-runnable') // FIXME ??
