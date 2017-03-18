process.env.HTTP_PORT = 8001
process.env.COUCHDB_PORT = 5985

var app = require('../src/app.js')
var assert = require('assert')
var config = require('../src/config.js')
var mockCouch = require('mock-couch')
var request = require('supertest')

describe('/ad', function() {

	var server = null, couchdb = null

	beforeEach(function(done) {
		couchdb = mockCouch.createServer()
		couchdb.listen(config.couchdb.port, function() {
			require('nano')(config.couchdb.url()).db.create('ad')
			server = app.listen(config.http.port, config.http.host, done)
		})
	})
 
	afterEach(function(done) {
		couchdb.close(function() {
			server.close(done)
		})
	})

	it('get', function(done) {
		request(app).get('/ad')
			.expect(function(res) {
				assert(res.body.offset === 0)
				assert(res.body.total_rows === 0)
				assert(res.body.rows.length === 0)
			})
			.expect(200, done)
	})

	it('get', function(done) {
		request(app).get('/ad/12456')
			.expect({
		    status: 500,
		    message: 'Internal error',
		    type: 'internal_error',
		  })
			.expect(500, done)
	})
 
	it('post', function(done) {
		request(app).post('/ad')
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
			.expect(function(res) {
				assert(res.body.ok === true)
				assert(res.body.id !== null)
				assert(res.body.rev !== null)
			})
			.expect(200, done)
	})
 
	it('delete', function(done) {
		request(app).delete('/ad/123456/abcdef')
			.expect({
		    status: 500,
		    message: 'Internal error',
		    type: 'internal_error',
		  })
			.expect(500, done)
	})

 })