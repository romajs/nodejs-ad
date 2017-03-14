var app = require('../src/app.js')
var assert = require('assert')
var mockCouch = require('mock-couch')
var request = require('supertest')
var fork = require("child_process").fork

describe('/ad', function() {

	beforeEach(function(done) {

    child = fork('./src/server.js', null, {});

    child.on('message', function (msg) {
      if (msg === 'listening') {
      	couchdb = mockCouch.createServer()
		    couchdb.listen(5984, function() {
		    	require('nano')('http://localhost:5984').db.create('ad')
		    	done()
		    })
      }
    });

	})
 
	afterEach(function(done) {
		child.kill();
		couchdb.close(done)
	})

	it('get', function(done) {
		request(app)
			.get('/ad')
			.expect(function(res) {
				assert(res.body.offset == 0)
				assert(res.body.total_rows == 0)
				assert(res.body.rows.length == 0)
			})
			.expect(200, done)
	})
 
	it('post', function(done) {
		request(app)
			.post('/ad')
			.expect(function(res) {
				assert(res.body.ok == true)
				assert(res.body.id != null)
				assert(res.body.rev != null)
			})
			.expect(200, done)
	})

 })