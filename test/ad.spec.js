var assert = require('assert')
var request = require('supertest')
var test = require('./test.js')

describe('/ad', function() {

	test.setUp()

	var token = null

	beforeEach(function() {
		return test.auth('admin', 'MTIzbXVkYXIK', 200).then(function(res) {
			token = res.body.token
		})
	})

	it('get', function() {
		return request(test.app).get('/ad')
			.set(test.config.auth.header_name, token)
			.expect(404)
	})

	it('get', function() {
		return request(test.app)
			.get('/ad/12456')
			.set(test.config.auth.header_name, token)
			.expect(404)
	})
 
	it('post', function() {
		return request(test.app)
			.post('/ad')
			.set(test.config.auth.header_name, token)
			.expect(200)
	})
 
	it('put', function() {
		return request(test.app)
			.put('/ad/123456/abcdef')
			.set(test.config.auth.header_name, token)
			.expect(404)
	})
 
	it('delete', function() {
		return request(test.app)
			.delete('/ad/123456/abcdef')
			.set(test.config.auth.header_name, token)
			.expect(404)
	})

 })