var blocked = require('blocked')
var ctx = require('./ctx.js')

// server
var server = null

module.exports.start = function() {
	return new Promise(function(resolve, reject) {
		server = ctx.app.listen(ctx.config.http.port, ctx.config.http.host, function () {
			ctx.logger.info('App listening on:', server.address())
			resolve(server)
		})
	})
}

module.exports.close = function() {
	return new Promise(function(resolve, reject) {
		resolve(server.close())
	})
}

// blocked
blocked(function(ms) {
	ctx.logger.warn('blocked for %sms', ms | 0)
})

// make-runnable
require('make-runnable')