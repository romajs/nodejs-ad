var app = require('./app.js')

// server
var server = app.listen(app.config.http.port, app.config.http.host, function () {
	app.logger.info('App listening on:', server.address())
})

module.exports = server