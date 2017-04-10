#!/usr/env node

var App = require('../../src/app')

var fixture = process.argv[2]

if(!fixture) {
	console.info('fixture is required for loading.')
	console.info('usage: node test/fixture/loader test/fixture/xx-script.js')
	process.exit(1)
}

console.info('loading fixture: "%s"', fixture)

fixture = require(process.cwd() + '/' + fixture)
fixture.load()

App.db.close()