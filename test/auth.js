process.env.HTTP_PORT = 8001
process.env.COUCHDB_PORT = 5985

var app = require('../src/app.js')
var assert = require('assert')
var config = require('../src/config.js')
var mockCouch = require('mock-couch')
var request = require('supertest')

describe('/auth', function() {

	var server = null, couchdb = null

	beforeEach(function(done) {
		couchdb = mockCouch.createServer()
		couchdb.listen(config.couchdb.port, function() {
			require('../script/fixture/00-init.js')(function() {
				require('../script/fixture/01-user.js')(function() {
					server = app.listen(config.http.port, config.http.host, done)
				})
			})
		})
	})
 
	afterEach(function(done) {
		couchdb.close(function() {
			server.close(done)
		})
	})

	it('/auth 404 not found', function(done) {
		request(app).post('/auth')
			.expect({
				success: false,
				message: 'Authentication failed. User not found',
			})
			.expect(404, done)
	})

	it('/auth 403 wrong password', function(done) {

			request(app).post('/auth')
			 	.send({
					username : 'admin',
					password : 'Wr0nG_p4$$w0d',
				})
				.expect({
					success: false,
					message: 'Authentication failed. Wrong password',
				})
				.expect(401, done)

	})

	it('/auth 200 ok', function(done) {

			request(app).post('/auth')
			 	.send({
					username : 'admin',
					password : 'MTIzbXVkYXIK',
				})
				.expect(function(res) {
					assert(res.body.token)
					assert(res.body.success)
					assert.equal('Authentication granted successfully', res.body.message)
			})
				.expect(200, done)

	})

 })