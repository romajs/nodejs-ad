#!/usr/env node

var App = require('../../src/app')

var fixture = process.argv[2]

if (!fixture) {
  console.log('fixture is required for loading.')
  console.log('usage: node test/fixture/loader test/fixture/xx-script.js')
  process.exit(1)
}

console.log('loading fixture: "%s"', fixture)

fixture = require(process.cwd() + '/' + fixture)

fixture.load().then(function() {
    App.db.close()
}, function(err) {
    console.error(err)
})
