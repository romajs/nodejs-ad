var assert = require('assert')
var request = require('supertest')
var test = require('./test.js')

describe('/auth', function() {

	test.setUp(this)

	describe('/post', function() {

		it('404: not found (no user)', function() {
			return request(test.app)
				.post('/auth')
				.expect({
					success: false,
					message: 'Authentication failed. User not found',
				})
				.expect(404)
		})

		it('404: not found', function() {
			return request(test.app)
				.post('/auth')
			 	.send({
					username : 'Wr0nG_u$rn4m3',
					password : 'Wr0nG_p4$$w0d',
				})
				.expect({
					success: false,
					message: 'Authentication failed. User not found',
				})
				.expect(404)
		})

		it('403: wrong password', function() {
			return request(test.app)
				.post('/auth')
			 	.send({
					username : 'admin',
					password : 'Wr0nG_p4$$w0d',
				})
				.expect({
					success: false,
					message: 'Authentication failed. Wrong password',
				})
				.expect(401)
		})

		it('200: success', function() {
			return request(test.app)
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
				.expect(200)
		})

	})

 })