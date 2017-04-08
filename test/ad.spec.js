var assert = require('assert')
var request = require('supertest')
var test = require('./test.js')
var ObjectId = require('mongoose').Types.ObjectId

describe('/ad', function() {

	test.setUp()

	var token = null

	beforeEach(function() {
		return test.auth('admin', 'MTIzbXVkYXIK', 200).then(function(res) {
			token = res.body.token
		})
	})

	describe('get', function() {

		var __v = null, _id = null

		beforeEach(function() {
			return request(test.app)
				.post('/ad')
				.set(test.config.auth.header_name, token)
				.send({
					title: 'Test ad 1',
					details : 'Details ad 1',
				})
				.expect(function(res) {
					assert.equal(0, __v = res.body.__v)
					assert.notEqual(null, _id = res.body._id)
				})
				.expect(200)
		})

		it('404: no param', function() {
			return request(test.app) 
				.get('/ad/')
				.set(test.config.auth.header_name, token)
				.expect(404)
		})

		it('404: not found', function() {
			return request(test.app) 
				.get('/ad/' + ObjectId('Wr0ng_Obj_Id'))
				.set(test.config.auth.header_name, token)
				.expect(404)
		})

		it('200: success', function() {
			return request(test.app)
				.get('/ad/' + _id)
				.set(test.config.auth.header_name, token)
				.expect(function(res) {
					assert.equal(__v, res.body.__v)
					assert.equal(_id, res.body._id)
					assert.equal('Test ad 1', res.body.title)
					assert.equal('Details ad 1', res.body.details)
					assert.equal('APPROVED', res.body.status)
				})
				.expect(200)
		})

	})
	
	describe('/post', function() {
 
		it('200: success', function() {
			return request(test.app)
				.post('/ad')
				.set(test.config.auth.header_name, token)
				.send({
					title: 'Test ad 1',
					details : 'Details ad 1',
				})
				.expect(function(res) {
					assert.equal(0, res.body.__v)
					assert.notEqual(null, res.body._id)
				})
				.expect(200)
		})

	})
 
	it('put')
 
	it('delete')

 })