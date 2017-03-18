var config = require('../../config.js')

var couchdb = require('nano')(config.couchdb.url()).use('user')

module.exports.get_by_username = function(username, callback) {
	
	couchdb.view('user', 'by_username', { keys: [username] }, function(err, body) {
	  if(err) {
	  	callback(err, null)
	  } else {
    	callback(null, body.total_rows > 0 ? body.rows[0].value : null)
	  }
	})

}