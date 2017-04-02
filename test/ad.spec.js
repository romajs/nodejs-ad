// var assert = require('assert')
// var request = require('supertest')
// var util = require('./util.js')

// describe('/ad', function() {

// 	var u = util()
// 	beforeEach(u.setUp)
// 	afterEach(u.tearDown)

// 	it('get', function(done) {
// 		request(u.app).get('/ad')
// 			.set(u.config.auth.header_name, u.token)
// 			.expect(function(res) {
// 				assert(res.body.offset === 0)
// 				assert(res.body.total_rows === 0)
// 				assert(res.body.rows.length === 0)
// 			})
// 			.expect(200, done)
// 	})

// 	it('get', function(done) {
// 		request(u.app)
// 			.get('/ad/12456')
// 			.set(u.config.auth.header_name, u.token)
// 			.expect({
// 		    status: 500,
// 		    message: 'Internal error',
// 		    type: 'internal_error',
// 		  })
// 			.expect(500, done)
// 	})
 
// 	it('post', function(done) {
// 		request(u.app)
// 			.post('/ad')
// 			.set(u.config.auth.header_name, u.token)
// 			.expect(function(res) {
// 				assert(res.body.ok === true)
// 				assert(res.body.id !== null)
// 				assert(res.body.rev !== null)
// 			})
// 			.expect(200, done)
// 	})
 
// 	it('put', function(done) {
// 		// FIXME: should fail 500
// 		request(u.app)
// 			.put('/ad/123456/abcdef')
// 			.set(u.config.auth.header_name, u.token)
// 			.expect(function(res) {
// 				assert(res.body.ok === true)
// 				assert(res.body.id !== null)
// 				assert(res.body.rev !== null)
// 			})
// 			.expect(200, done)
// 	})
 
// 	it('delete', function(done) {
// 		request(u.app)
// 			.delete('/ad/123456/abcdef')
// 			.set(u.config.auth.header_name, u.token)
// 			.expect({
// 		    status: 500,
// 		    message: 'Internal error',
// 		    type: 'internal_error',
// 		  })
// 			.expect(500, done)
// 	})

//  })