#! /usr/bin/env node

var path = require('path')

// globals
global.INDEX_DIR = process.cwd()

global.rootRequire = function (name) {
  return require(path.dirname(__filename) + '/' + name)
}

function startServer () {
  var server = rootRequire('main/server')
  return server.start().then(function (servers) {
    return 'Server started successfully @ ' + servers[0]._connectionKey
  })
}

function stopServer () {
  var server = rootRequire('main/server')
  return server.stop().then(function (servers) {
    return 'Server stoped successfully @ ' + servers[0]._connectionKey
  })
}

function loadFixture (fixtureName) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'fixture'
  console.log('process.env.NODE_ENV: %s', process.env.NODE_ENV)

  var db = rootRequire('main/db')

  try {
    console.log('Loading fixture: %s', fixtureName)
    var fixture = rootRequire('fixture/' + fixtureName)
  } catch (err) {
    return Promise.reject(err)
  }

  return db.start().then(fixture.load).then(function (res) {
    db.connection.close()
    return res
  }, function (err) {
    db.connection.close()
    return err
  })
}

module.exports = {
  'load-fixture': loadFixture,
  'start-server': startServer,
  'stop-server': stopServer
}

require('make-runnable/custom')({
  printOutputFrame: false
})
