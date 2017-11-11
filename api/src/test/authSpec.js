var assert = require('assert')
var request = require('supertest')
var test = require('./test')

describe('/api/auth', function () {
  test.setUp()

  describe('/api/post', function () {
    it('200: success', function () {
      return request(test.app)
        .post('/api/auth')
        .send({
          username: 'admin',
          password: 'MTIzbXVkYXIK'
        })
        .expect(function (res) {
          assert.equal(true, res.body.success)
          assert.equal('Authentication granted successfully', res.body.message)
          assert.notEqual(null, res.body.token)
        })
        .expect(200)
    })

    it('400: invalid params', function () {
      return request(test.app)
        .post('/api/auth')
        .expect([{
          param: 'username',
          msg: 'required'
        }, {
          param: 'password',
          msg: 'required'
        } ])
        .expect(400)
    })

    it('403: wrong password', function () {
      return request(test.app)
        .post('/api/auth')
        .send({
          username: 'admin',
          password: 'Wr0nG_p4$$w0d'
        })
        .expect({
          success: false,
          message: 'Authentication failed. Wrong password'
        })
        .expect(401)
    })

    it('404: not found', function () {
      return request(test.app)
        .post('/api/auth')
        .send({
          username: 'Wr0nG_u$rn4m3',
          password: 'Wr0nG_p4$$w0d'
        })
        .expect({
          success: false,
          message: 'Authentication failed. User not found'
        })
        .expect(404)
    })

    describe('authMiddleware', function () {
      var token = null

      beforeEach(function () {
        return test.auth('admin', 'MTIzbXVkYXIK', 200).then(function (res) {
          token = res.body.token
        })
      })

      it('200: body token', function () {
        return request(test.app)
          .get('/api/domain')
          .send({
            token: token
          })
          .expect(200)
      })

      it('200: param token', function () {
        return request(test.app)
          .get('/api/domain')
          .query({
            token: token
          })
          .expect(200)
      })

      it('200: header token', function () {
        return request(test.app)
          .get('/api/domain')
          .set(test.config.auth.header_name, token)
          .expect(200)
      })

      it('400: no token', function () {
        return request(test.app)
          .get('/api/domain')
          .expect(400)
      })

      it('403: invalid token', function () {
        return request(test.app)
          .get('/api/domain')
          .send({
            token: '1nv4l1d_t0k3n'
          })
          .expect(403)
      })
    })
  })
})
