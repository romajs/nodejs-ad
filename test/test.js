process.env.NODE_ENV = 'test'

var ctx = require(process.env.PWD + '/src/ctx.js')
var server = require(process.env.PWD + '/src/server.js')
var request = require('supertest')

var test = {
	app : ctx.app,
	config : ctx.config,
	logger : ctx.logger,
	db : ctx.db,
	setUp,
	auth,
}

function setUp(spec, beforeEachPromises, afterEachPromises) {

	beforeEach(function(done) {
		Promise.all([
			ctx.db.dropDatabase(),
			require('./fixture/00-init.js').load(),
			require('./fixture/01-user.js').load(),
			server.start()
		].concat(beforeEachPromises || [])).then(function() {
			done()
		})
	})

	afterEach(function(done) {
		Promise.all([
			server.close()
		].concat(afterEachPromises || [])).then(function() {
			done()
		})
	})

}

function auth(username, password) {
	return request(test.app).post('/auth').send({
		username : username, password : password,
	}).expect(function(res) {
		return !res.body.success ? res.body : test.token = res.body.token
	})
}

module.exports = test