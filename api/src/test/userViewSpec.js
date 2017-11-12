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
    it('400: invalid id', function () {
      return request(test.app)
        .get('/api/user-view/' + '1nv4l1d_1d')
        .set(test.config.auth.header_name, token)
        .expect([{
          param: 'id',
          msg: 'Invalid value',
          value: '1nv4l1d_1d'
        } ])
        .expect(400)
    })

    it('404: not found', function () {
      return request(test.app)
        .get('/api/user-view/' + ObjectId('n0t_f0und_1d'))
        .set(test.config.auth.header_name, token)
        .expect(404)
    })

    it('200: success', function () {
      return request(test.app)
        .get('/api/user-view/' + admin._id)
        .set(test.config.auth.header_name, token)
        .expect(function (res) {
          assert.equal(admin._id, res.body.id)
          assert.equal('admin', res.body.name)
        })
        .expect(200)
    })
  })
})
