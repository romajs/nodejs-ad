var assert = require('assert')
var jwtDecode = require('jwt-decode')
var ObjectId = require('mongoose').Types.ObjectId
var request = require('supertest')
var test = require('./test')

describe('/api/user-view', function () {
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
    it('200: success', function () {
      return request(test.app)
        .get('/api/user-view/' + admin._id)
        .set(test.config.auth.header_name, token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body._id, admin._id)
          assert.equal(res.body.name, 'admin')
          assert.notEqual(res.body.created_at, null)
          assert.equal(res.body.updated_at, null)
        })
    })

    it('400: invalid id', function () {
      return request(test.app)
        .get('/api/user-view/' + '1nv4l1d_1d')
        .set(test.config.auth.header_name, token)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect([{
          param: 'id',
          msg: 'Invalid value',
          value: '1nv4l1d_1d'
        } ])
    })

    it('404: not found', function () {
      return request(test.app)
        .get('/api/user-view/' + ObjectId('n0t_f0und_1d'))
        .set(test.config.auth.header_name, token)
        .expect(404)
    })
  })
})
