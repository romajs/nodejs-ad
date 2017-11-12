var assert = require('assert')
var jwtDecode = require('jwt-decode')
var ObjectId = require('mongoose').Types.ObjectId
var request = require('supertest')
var test = require('./test')

describe('/api/attachment', function () {
  test.setUp()

  var token = null
  var admin = null

  beforeEach(function () {
    return test.auth('admin', 'MTIzbXVkYXIK', 200).then(function (res) {
      token = res.body.token
      admin = jwtDecode(token)
    })
  })

  describe('get', function () {
    var __v = null
    var _id = null

    beforeEach(function () {
      return request(test.app)
        .post('/api/attachment')
        .set(test.config.auth.header_name, token)
        .attach('file', './test/resources/attachment/TEST.jpg')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert.equal(__v = res.body.__v, 0)
          assert.notEqual(_id = res.body._id, null)
        })
    })

    it('200: success', function () {
      return request(test.app)
        .get('/api/attachment/' + _id)
        .set(test.config.auth.header_name, token)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert.equal(res.body.__v, __v)
          assert.equal(res.body._id, _id)
          assert.equal(res.body.name, 'TEST.jpg')
          assert.equal(res.body.type, 'image/jpg')
          assert.equal(res.body.size, 4837)
          assert.equal(res.body.hash_md5, 'b47ce93b893803edeba95296c87fdee3')
          assert.equal(res.body.status, 'TEMPORARY')
          assert.notEqual(res.body.created_at, null)
          assert.notEqual(res.body.updated_at, null)
          assert.equal(res.body.user_id, admin._id)
          assert.notEqual(res.body.cloudinary_id, null)
          assert.notEqual(res.body.url, null)
          assert.notEqual(res.body.secure_url, null)
        })
    })

    it('400: invalid id', function () {
      return request(test.app)
        .get('/api/attachment/' + '1nv4l1d_1d')
        .set(test.config.auth.header_name, token)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect([{
          param: 'id',
          msg: 'Invalid value',
          value: '1nv4l1d_1d'
        } ])
    })

    it('404: not found', function () {
      return request(test.app)
        .get('/api/attachment/' + ObjectId('n0t_f0und_1d'))
        .set(test.config.auth.header_name, token)
        .expect(404)
    })
  })

  describe('download', function () {
    var _id = null
    var url = null

    beforeEach(function () {
      return request(test.app)
        .post('/api/attachment')
        .set(test.config.auth.header_name, token)
        .attach('file', './test/resources/attachment/TEST.jpg')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert.notEqual(_id = res.body._id, null)
          assert.notEqual(url = res.body.url, null)
        })
    })

    it('200: success', function () {
      return request(test.app)
        .get('/api/attachment/' + _id + '/download')
        .set(test.config.auth.header_name, token)
        .expect(302)
        .expect('Content-Type', /text\/plain/)
        .expect(function (res) {
          assert.equal(res.header.location, url)
        })
    })

    it('400: invalid id', function () {
      return request(test.app)
        .get('/api/attachment/' + '1nv4l1d_1d' + '/download')
        .set(test.config.auth.header_name, token)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect([{
          param: 'id',
          msg: 'Invalid value',
          value: '1nv4l1d_1d'
        } ])
    })

    it('404: not found', function () {
      return request(test.app)
        .get('/api/attachment/' + ObjectId('n0t_f0und_1d') + '/download')
        .set(test.config.auth.header_name, token)
        .expect(404)
    })
  })

  describe('/api/post', function () {
    it('200: success', function () {
      return request(test.app)
        .post('/api/attachment')
        .set(test.config.auth.header_name, token)
        .attach('file', './test/resources/attachment/TEST.jpg')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert.equal(res.body.__v, 0)
          assert.notEqual(res.body._id, null)
          assert.equal(res.body.name, 'TEST.jpg')
          assert.equal(res.body.type, 'image/jpg')
          assert.equal(res.body.size, 4837)
          assert.equal(res.body.hash_md5, 'b47ce93b893803edeba95296c87fdee3')
          assert.equal(res.body.status, 'TEMPORARY')
          assert.notEqual(res.body.created_at, null)
          assert.notEqual(res.body.updated_at, null)
          assert.equal(res.body.user_id, admin._id)
          assert.notEqual(res.body.cloudinary_id, null)
          assert.notEqual(res.body.url, null)
          assert.notEqual(res.body.secure_url, null)
        })
    })

    it('400: no file attached', function () {
      return request(test.app)
        .post('/api/attachment')
        .set(test.config.auth.header_name, token)
        .expect(400)
    })
  })

  describe('/api/delete', function () {
    var _id = null

    beforeEach(function () {
      return request(test.app)
        .post('/api/attachment')
        .set(test.config.auth.header_name, token)
        .attach('file', './test/resources/attachment/TEST.jpg')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert.notEqual(_id = res.body._id, null)
        })
    })

    it('200: success', function () {
      return request(test.app)
        .delete('/api/attachment/' + _id)
        .set(test.config.auth.header_name, token)
        .expect(200)
    })

    it('400: invalid params', function () {
      return request(test.app)
        .delete('/api/attachment/' + '1nv4l1d_1d')
        .set(test.config.auth.header_name, token)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect([{
          param: 'id',
          msg: 'Invalid value',
          value: '1nv4l1d_1d'
        }])
    })

    it('404: not found', function () {
      return request(test.app)
        .delete('/api/attachment/' + ObjectId('n0t_f0und_1d'))
        .set(test.config.auth.header_name, token)
        .expect(404)
    })

    it('409: conflict')
  })
})
