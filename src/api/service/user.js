var config = require('../../config.js')

var couch = require('nano')(config.couchdb.url())

module.exports = couch.use('user')

// module.exports = new function() {

// 	this.get = function(username, callback) {

// 		var user = [{
// 			username : 'admin',
// 			password : 'MTIzbXVkYXIK',
// 			admin : true,
// 		}].find(function(user) {
// 			return user.username == username
// 		})

// 		console.info(user)

// 		user && callback(undefined, user)

// 	}
// }