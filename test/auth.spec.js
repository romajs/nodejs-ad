var assert = require('assert')
var request = require('supertest')
var util = require('./util.js')

describe('/auth', function() {

	var u = util()
	beforeEach(u.setUp)
	afterEach(u.tearDown)

	describe('/post', function() {

		it('404: not found (no user)', function(done) {
			request(u.app)
				.post('/auth')
				.expect({
					success: false,
					message: 'Authentication failed. User not found',
				})
				.expect(404, done)
		})

		it('404: not found', function(done) {
			request(u.app)
				.post('/auth')
			 	.send({
					username : 'Wr0nG_u$rn4m3',
					password : 'Wr0nG_p4$$w0d',
				})
				.expect({
					success: false,
					message: 'Authentication failed. User not found',
				})
				.expect(404, done)
		})

		it('403: wrong password', function(done) {
			request(u.app)
				.post('/auth')
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

		it('200: success', function(done) {
			request(u.app)
				.post('/auth')
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

 })