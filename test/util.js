process.env.HTTP_PORT = 8001
process.env.COUCHDB_PORT = 5985

var app = require('../src/app.js')
var config = require('../src/config.js')
var mockCouch = require('mock-couch')
var request = require('supertest')

function util() {

	var self = this

	self.app = app
	self.config = config

	this.setUp = function(done) {
		self.couchdb = mockCouch.createServer()
		self.couchdb.listen(config.couchdb.port, function() {
			require('../script/fixture/00-init.js')(function() {
				require('../script/fixture/01-user.js')(function() {
					self.server = app.listen(config.http.port, config.http.host, function() {
						self.authToken('admin', 'MTIzbXVkYXIK', done)
					})
				})
			})
		})
	}
	 
	self.tearDown = function(done) {
		self.couchdb.close(function() {
			self.server.close(done)
		})
	}

	self.authToken = function(username, password, done) {
		request(app).post('/auth').send({
			username : username,
			password : password,
		}).expect(function(res) {
			self.token = res.body.token
		}).expect(200, done)
	}

	return self
}

module.exports = util