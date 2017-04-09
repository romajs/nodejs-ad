var assert = require('assert')
var request = require('supertest')
var test = require('./test')
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
					assert.equal(__v = res.body.__v, 0)
					assert.notEqual(_id = res.body._id, null)
				})
				.expect(200)
		})

		it('400: invalid id', function() {
			return request(test.app) 
				.get('/ad/' + '1nv4l1d_1d')
				.set(test.config.auth.header_name, token)
				.expect([
					{ param: 'id', msg: 'Invalid value', value: '1nv4l1d_1d' },
				])
				.expect(400)
		})

		it('404: not found', function() {
			return request(test.app) 
				.get('/ad/' + ObjectId('n0t_f0und_1d'))
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
					assert.equal(res.body.__v, 0)
					assert.notEqual(res.body._id, null)
				})
				.expect(200)
		})
 
		it('400: invalid params', function() {
			return request(test.app)
				.post('/ad')
				.set(test.config.auth.header_name, token)
				.expect([
					{ param: 'title', msg: 'required' },
  				{ param: 'details', msg: 'required' },
				])
				.expect(400)
		})

	})

	describe('/put', function() {

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
					assert.equal(__v = res.body.__v, 0)
					assert.notEqual(_id = res.body._id, null)
				})
				.expect(200)
		})

		it('400: invalid params', function() {
			return request(test.app) 
				.put('/ad/' + '1nv4l1d_1d')
				.set(test.config.auth.header_name, token)
				.expect([
					{ param: 'id', msg: 'invalid', value: '1nv4l1d_1d' },
					{ param: 'title', msg: 'required' },
  				{ param: 'details', msg: 'required' },
				])
				.expect(400)
		})

		it('404: not found', function() {
			return request(test.app) 
				.put('/ad/' + ObjectId('n0t_f0und_1d'))
				.set(test.config.auth.header_name, token)
				.send({
					title: 'Test ad 1 update',
					details : 'Details ad 1 update',
				})
				.expect(404)
		})

		it('200: success', function() {
			return request(test.app)
				.put('/ad/' + _id)
				.set(test.config.auth.header_name, token)
				.send({
					title: 'Test ad 1 update',
					details : 'Details ad 1 update',
				})
				.expect(function(res) {
					assert.equal(res.body.__v, __v)
					assert.equal(res.body._id, _id)
					assert.equal(res.body.title, 'Test ad 1 update')
					assert.equal(res.body.details, 'Details ad 1 update')
					assert.equal(res.body.status, 'APPROVED')
				})
				.expect(200)
		})

	})
 
	it('delete')

 })