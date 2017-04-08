var assert = require('assert')
var request = require('supertest')
var test = require('./test.js')

describe('/ad', function() {

	test.setUp(this, [test.auth('admin', 'MTIzbXVkYXIK')])

	it('get', function(done) {
		request(test.app).get('/ad')
			.set(test.config.auth.header_name, test.token)
			.expect(404, done)
	})

	it('get', function(done) {
		request(test.app)
			.get('/ad/12456')
			.set(test.config.auth.header_name, test.token)
			.expect(404, done)
	})
 
	it('post', function(done) {
		request(test.app)
			.post('/ad')
			.set(test.config.auth.header_name, test.token)
			.expect(200, done)
	})
 
	it('put', function(done) {
		request(test.app)
			.put('/ad/123456/abcdef')
			.set(test.config.auth.header_name, test.token)
			.expect(404, done)
	})
 
	it('delete', function(done) {
		request(test.app)
			.delete('/ad/123456/abcdef')
			.set(test.config.auth.header_name, test.token)
			.expect(404, done)
	})

 })