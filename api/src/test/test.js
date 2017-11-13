process.env.NODE_ENV = 'test'

require('../index')

var server = rootRequire('main/server')
var config = rootRequire('main/config')
var logger = rootRequire('main/logger')
var app = rootRequire('main/app')
var db = rootRequire('main/db')

var request = require('supertest')

var test = {
  app,
  config,
  logger,
  db,
  setUp,
  auth
}

function setUp () {
  beforeEach('test.setUp.beforeEach', function () {
    return server.start().then(function () {
      return db.connection.dropDatabase().then(function () {
        return Promise.all([
          rootRequire('fixture/00-init.js').load(),
          rootRequire('fixture/01-user.js').load()
        ])
      })
    })
  })

  afterEach('test.setUp.afterEach', function () {
    return Promise.all([
      server.stop()
    ])
  })
}

function auth (username, password, status) {
  return request(app).post('/api/auth').send({
    username: username,
    password: password
  }).expect(status)
}

module.exports = test
