var assert = require('assert')
var request = require('supertest')
var test = require('./test')

describe('/api/ads/user', function () {
  test.setUp()

  var adminToken = null
  var userToken = null

  beforeEach(function () {
    return test.auth('admin', 'MTIzbXVkYXIK', 200).then(function (res) {
      adminToken = res.body.token
    })
  })

  describe('get no result (admin)', function () {
    it('200: success', function () {
      return request(test.app)
        .get('/api/ads/user')
        .set(test.config.auth.header_name, adminToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body.length, 0)
        })
    })
  })

  describe('get w/ one result (admin)', function () {
    beforeEach(function () {
      return request(test.app)
        .post('/api/ad')
        .set(test.config.auth.header_name, adminToken)
        .send({
          title: 'Test ad 1',
          details: 'Details ad 1',
          value: 1000.00
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body.__v, 0)
          assert.notEqual(res.body._id, null)
        })
    })

    it('200: success (admin)', function () {
      return request(test.app)
        .get('/api/ads/user')
        .set(test.config.auth.header_name, adminToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body.length, 1)
        })
    })

    describe('with ads by multiple users', function () {
      beforeEach(function () {
        return test.auth('user', 'MTIzbXVkYXIK', 200).then(function (res) {
          userToken = res.body.token
          return request(test.app)
            .post('/api/ad')
            .set(test.config.auth.header_name, userToken)
            .send({
              title: 'Test ad 2',
              details: 'Details ad 2',
              value: 2000.00
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(function (res) {
              assert.equal(res.body.__v, 0)
              assert.notEqual(res.body._id, null)
            })
        })
      })

      it('200: success (admin)', function () {
        return request(test.app)
        .get('/api/ads/user')
        .set(test.config.auth.header_name, adminToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body.length, 1)
        })
      })

      it('200: success (user)', function () {
        return request(test.app)
        .get('/api/ads/user')
        .set(test.config.auth.header_name, userToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body.length, 1)
        })
      })
    })
  })
})
