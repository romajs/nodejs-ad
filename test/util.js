var app = require('../src/app.js')
var config = require('../src/config.js')
var Emulator = require('google-datastore-emulator')

function util() {

	var self = this

	self.app = app
	self.config = config

	this.setUp = function(done) {
		// require('./fixture/00-init.js')(config, function() {
			require('./fixture/01-user.js')(config, function() {
				self.server = app.listen(config.http.port, config.http.host, function() {
					// self.authToken('admin', 'MTIzbXVkYXIK', done)
					done()
				})
			})
		// })
	}
	 
	self.tearDown = function(done) {
		self.server.close(done)
	}

	// self.authToken = function(username, password, done) {
	// 	request(app).post('/auth').send({
	// 		username : username,
	// 		password : password,
	// 	}).expect(function(res) {
	// 		self.token = res.body.token
	// 	}).expect(200, done)
	// }

	return self
}

module.exports = util