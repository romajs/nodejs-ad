var app = require('../src/app.js')
var assert = require('assert')
var request = require('supertest')
// var mockCouch = require('mock-couch')

describe('/ad', function() {

	var server = null, couchdb = null

	beforeEach(function(done) {
    // couchdb = mockCouch.createServer({ keepAlive: true })
    // require('nano')('http://localhost:5984').db.create('ad')
    // couchdb.listen(5984, done)
    server = app.listen(8000, done)
	})
 
	afterEach(function(done) {
		// couchdb.close(done)
		server.close(done)
	})
 
	it('get', function(done) {
		request(app)
			.get('/ad')
			.expect(function(res) {
				assert(res.statusCode == 200)
				assert(res.body.total_rows != null)
				assert(res.body.offset != null)
				assert(res.body.rows != null)
			})
			.expect(200, done)
	})
 
	it('post', function(done) {
		request(app)
			.post('/ad')
			.expect(function(res) {
				assert(res.body.ok == true)
				assert(res.body.id != null)
				assert(res.body.rev != null)
			})
			.expect(200, done)
	})

 })