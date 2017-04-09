process.env.NODE_ENV = 'test'

var App = require(process.cwd() + '/src/app')
var request = require('supertest')

var test = {
	app : App.app,
	config : App.config,
	logger : App.logger,
	db : App.db,
	setUp,
	auth,
}

function setUp() {

	beforeEach('test.setUp.beforeEach', function() {
		return Promise.all([
			App.db.dropDatabase(),
			require('./fixture/00-init.js').load(),
			require('./fixture/01-user.js').load(),
			App.start()
		])
	})

	afterEach('test.setUp.afterEach', function() {
		return Promise.all([
			App.close()
		])
	})
	
}

function auth(username, password, status) {
	return request(App.app).post('/auth').send({
		username : username, password : password,
	}).expect(status)
}

module.exports = test