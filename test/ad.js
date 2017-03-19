process.env.HTTP_PORT = 8001
process.env.COUCHDB_PORT = 5985

var app = require('../src/app.js')
var assert = require('assert')
var config = require('../src/config.js')
var mockCouch = require('mock-couch')
var request = require('supertest')

describe('/ad', function() {

	var server = null, couchdb = null, token = null

	function authToken(username, password, done) {
		request(app).post('/auth').send({
			username : username,
			password : password,
		}).expect(function(res) {
			token = res.body.token
		}).expect(200, done)
	}

	beforeEach(function(done) {
		couchdb = mockCouch.createServer()
		couchdb.listen(config.couchdb.port, function() {
			require('../script/fixture/00-init.js')(function() {
				require('../script/fixture/01-user.js')(function() {
					server = app.listen(config.http.port, config.http.host, function() {
						authToken('admin', 'MTIzbXVkYXIK', done)
					})
				})
			})
		})
	})
 
	afterEach(function(done) {
		couchdb.close(function() {
			server.close(done)
		})
	})

	it('get', function(done) {
		request(app).get('/ad')
			.set(app.config.auth.header_name, token)
			.expect(function(res) {
				assert(res.body.offset === 0)
				assert(res.body.total_rows === 0)
				assert(res.body.rows.length === 0)
			})
			.expect(200, done)
	})

	it('get', function(done) {
		request(app).get('/ad/12456')
			.set(app.config.auth.header_name, token)
			.expect({
		    status: 500,
		    message: 'Internal error',
		    type: 'internal_error',
		  })
			.expect(500, done)
	})
 
	it('post', function(done) {
		request(app).post('/ad')
			.set(app.config.auth.header_name, token)
			.expect(function(res) {
				assert(res.body.ok === true)
				assert(res.body.id !== null)
				assert(res.body.rev !== null)
			})
			.expect(200, done)
	})
 
	it('put', function(done) {
		// FIXME: should fail 500
		request(app).put('/ad/123456/abcdef')
			.set(app.config.auth.header_name, token)
			.expect(function(res) {
				assert(res.body.ok === true)
				assert(res.body.id !== null)
				assert(res.body.rev !== null)
			})
			.expect(200, done)
	})
 
	it('delete', function(done) {
		request(app).delete('/ad/123456/abcdef')
			.set(app.config.auth.header_name, token)
			.expect({
		    status: 500,
		    message: 'Internal error',
		    type: 'internal_error',
		  })
			.expect(500, done)
	})

 })