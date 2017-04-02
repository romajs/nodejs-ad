#!/usr/bin/env node

process.env.HTTP_PORT = 8001

// var app = require('../src/app.js')
// var config = require('../src/config.js')

var Emulator = require('google-datastore-emulator')

var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path')

var mocha = new Mocha()

fs.readdirSync('./test').filter(function(file) {
  return file.substr(-8) === '.spec.js'
}).forEach(function(file){
  mocha.addFile(
      path.join('./test', file)
  )
})

var emulator = new Emulator({ debug: true })

emulator.start().then(function() {

	mocha.run(function(failures){
		emulator.stop()
	  process.exit(failures);  // exit with non-zero status if there were failures
	})

})