var blocked = require('blocked')
var ctx = require('./ctx.js')

// blocked
blocked(function(ms) {
	ctx.logger.warn('blocked for %sms', ms | 0)
})

// server
var server = ctx.app.listen(ctx.config.http.port, ctx.config.http.host, function () {
	ctx.logger.info('App listening on:', server.address())
})

module.exports = server