var datastore = require('../datastore.js')

module.exports.get_by_username = function(username, callback) {
	var query = datastore.createQuery('User').filter('username', username)
	datastore.runQuery(query, function(err, entities, info) {
		if(err)
			callback(err, null)
		else
    	callback(null, entities.length > 0 ? entities[0] : null)
  })
}
