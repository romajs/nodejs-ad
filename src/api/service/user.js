var datastore = require('../datastore.js')

module.exports.get_by_username = function(username, callback) {
	try {
		var query = datastore.createQuery('User').filter('username', username)
		datastore.runQuery(query).then(function(body) {
			var results = body[0]
	    callback(null, results.length > 0 ? results[0] : null)
	  })
  } catch(err) {
		callback(err, null)
  }
}
