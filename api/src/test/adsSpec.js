var assert = require('assert')
var request = require('supertest')
var test = require('./test')

describe('/api/ads', function () {
  test.setUp()

  var token = null

  beforeEach(function () {
    return test.auth('admin', 'MTIzbXVkYXIK', 200).then(function (res) {
      token = res.body.token
    })
  })

  describe('get no result', function () {
    it('200: success', function () {
      return request(test.app)
        .get('/api/ads')
        .set(test.config.auth.header_name, token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body.length, 0)
        })
    })
  })

  describe('get w/ one result', function () {
    beforeEach(function () {
      return request(test.app)
        .post('/api/ad')
        .set(test.config.auth.header_name, token)
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

    it('200: success', function () {
      return request(test.app)
        .get('/api/ads')
        .set(test.config.auth.header_name, token)
        .expect(200)
        .expect(function (res) {
          assert.equal(res.body.length, 1)
        })
    })
  })
})
