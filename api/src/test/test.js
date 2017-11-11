process.env.NODE_ENV = 'test'

var server = require('../server')
var config = rootRequire('config')
var logger = rootRequire('logger')
var app = rootRequire('app')
var db = rootRequire('db')

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
    return Promise.all([
      server.start(),
      db.connection.dropDatabase(),
      require('./fixture/00-init.js').load(),
      require('./fixture/01-user.js').load(),
    ])
  })

  afterEach('test.setUp.afterEach', function () {
    return Promise.all([
      server.close()
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
