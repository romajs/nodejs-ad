module.exports = function(callback) {

	var config = require('../../src/config.js')
	var nano = require('nano')(config.couchdb.url())

	nano.db.use('user').insert({
		username : 'admin',
		password : 'MTIzbXVkYXIK',
		admin : true,
	}, function(err, body) {
	})

	nano.db.use('user').insert({
		username : 'user',
		password : 'MTIzbXVkYXIK',
		admin : false,
	}, function(err, body) {
		callback && callback()
	})

}
