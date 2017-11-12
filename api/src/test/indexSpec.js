process.env.NODE_ENV = 'test'

var assert = require('assert')
var index = require('../index')

describe('index', function () {
  describe('server', function () {
    it('startServer & stopServer', function () {
      return index['start-server']().then(function (res) {
        assert.equal(/Server started successfully @/.test(res), true)
      }).then(index['stop-server']).then(function (res) {
        assert.equal(/Server stoped successfully @/.test(res), true)
      })
    })
  })

  describe('loadFixture', function () {
    it('module found', function () {
      return index['load-fixture']('00-init.js').catch(function (res) {
        console.log(res)
        assert.equal(/ok/.test(res), true)
      })
    })

    it('module not found', function () {
      return index['load-fixture']('99-none.js').catch(function (err) {
        assert.equal(/Error: Cannot find module/.test(err), true)
      })
    })
  })
})
