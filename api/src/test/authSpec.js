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
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(function (res) {
          assert.equal(res.body.success, true)
          assert.equal(res.body.message, 'Authentication granted successfully')
          assert.notEqual(res.body.token, null)
        })
    })

    it('400: invalid params', function () {
      return request(test.app)
        .post('/api/auth')
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect([{
          param: 'username',
          msg: 'required'
        }, {
          param: 'password',
          msg: 'required'
        } ])
    })

    it('403: wrong password', function () {
      return request(test.app)
        .post('/api/auth')
        .send({
          username: 'admin',
          password: 'Wr0nG_p4$$w0d'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)
        .expect({
          success: false,
          message: 'Authentication failed. Wrong password'
        })
    })

    it('404: not found', function () {
      return request(test.app)
        .post('/api/auth')
        .send({
          username: 'Wr0nG_u$rn4m3',
          password: 'Wr0nG_p4$$w0d'
        })
        .expect(404)
        .expect('Content-Type', /application\/json/)
        .expect({
          success: false,
          message: 'Authentication failed. User not found'
        })
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
