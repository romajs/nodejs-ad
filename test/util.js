process.env.HTTP_PORT = 8001
process.env.COUCHDB_PORT = 5985

var app = require('../src/app.js')
var assert = require('assert')
var config = require('../src/config.js')
var mockCouch = require('mock-couch')
var request = require('supertest')

var couchdb, server

module.exports.app = app
module.exports.config = config

module.exports.setUp =function(done) {
	couchdb = mockCouch.createServer()
	couchdb.listen(config.couchdb.port, function() {
		require('../script/fixture/00-init.js')(function() {
			require('../script/fixture/01-user.js')(function() {
				server = app.listen(config.http.port, config.http.host, function() {
					module.exports.authToken('admin', 'MTIzbXVkYXIK', done)
				})
			})
		})
	})
}
 
module.exports.tearDown = function(done) {
	couchdb.close(function() {
		server.close(done)
	})
}

module.exports.authToken = function(username, password, done) {
	request(app).post('/auth').send({
		username : username,
		password : password,
	}).expect(function(res) {
		module.exports.token = res.body.token
	}).expect(200, done)
}