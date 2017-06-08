var assert = require('assert')
var request = require('supertest')
var test = require('./test')

describe('/ads', function() {

	test.setUp()

	var token = null

	beforeEach(function() {
		return test.auth('admin', 'MTIzbXVkYXIK', 200).then(function(res) {
			token = res.body.token
		})
	})

	describe('get no result', function() {

		it('200: success', function() {
			return request(test.app)
				.get('/ads')
				.set(test.config.auth.header_name, token)
				.expect(function(res) {
					assert.equal(0, res.body.length)
				})
				.expect(200)
		})

	})

	describe('get w/ one result', function() {

		beforeEach(function() {
			return request(test.app)
				.post('/ad')
				.set(test.config.auth.header_name, token)
				.send({
					title: 'Test ad 1',
					details: 'Details ad 1',
					value: 1000.00,
				})
				.expect(function(res) {
					assert.equal(0, res.body.__v)
					assert.notEqual(null, res.body._id)
				})
				.expect(200)
		})

		it('200: success', function() {
			return request(test.app)
				.get('/ads')
				.set(test.config.auth.header_name, token)
				.expect(function(res) {
					assert.equal(1, res.body.length)
				})
				.expect(200)
		})

	})

})