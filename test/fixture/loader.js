#!/usr/env node

var App = require('../../src/app')

var fixture = process.argv[2]

if (!fixture) {
	process.stdout.write('fixture is required for loading.')
	process.stdout.write('usage: node test/fixture/loader test/fixture/xx-script.js')
	process.exit(1)
}

process.stdout.write('loading fixture: "%s"', fixture)

fixture = require(process.cwd() + '/' + fixture)
fixture.load()

App.db.close()