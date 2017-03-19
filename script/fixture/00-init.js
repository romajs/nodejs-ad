module.exports = function(callback) {

	var config = require('../../src/config.js')
	var nano = require('nano')(config.couchdb.url())

	nano.db.create('ad', function(err, body) {

	})

	nano.db.create('user', function(err, body) {

		nano.db.use('user').insert({
	 		views: {
				'by_username': {
					map: function(doc) {
						emit(doc.username, doc)
					}
				} 
			}
		}, '_design/user', function(err, body) {
			callback && callback()
		})

	})
}
