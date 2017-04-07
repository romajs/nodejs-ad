var ctx = require(process.env.PWD + '/src/ctx.js')

function util(spec) {

	var self = Object.assign(this, ctx)

	beforeEach(function(done) {
		// require('./fixture/00-init.js')(config, function() {
			// require('./fixture/01-user.js')(config, function() {
				self.server = ctx.app.listen(ctx.config.http.port, ctx.config.http.host, function() {
					// self.authToken('admin', 'MTIzbXVkYXIK', done)
					done()
				})
			// })
		// })
	})

	afterEach(function(done) {
		self.server.close(done)
	})

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