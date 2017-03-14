var app = require('../src/app.js')
var assert = require('assert')
var mockCouch = require('mock-couch')
var request = require('supertest')

describe('/ad', function() {

	var server = null, couchdb = null

	beforeEach(function(done) {

		couchdb = mockCouch.createServer()

		couchdb.listen(5984, function() {
			require('nano')('http://localhost:5984').db.create('ad')
			server = app.listen(8000, done)
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
				assert(res.body.offset == 0)
				assert(res.body.total_rows == 0)
				assert(res.body.rows.length == 0)
			})
			.expect(200, done)
	})
 
	it('post', function(done) {
		request(app).post('/ad')
			.expect(function(res) {
				assert(res.body.ok == true)
				assert(res.body.id != null)
				assert(res.body.rev != null)
			})
			.expect(200, done)
	})

 })