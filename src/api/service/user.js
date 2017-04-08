var User = require('../model/userModel.js')

module.exports.get_by_username = function(username) {
	return new Promise(function(resolve, reject) {
		User.findOne({ username: username }, function(err, user) {
			return err ? reject(err) : resolve(user)	
		})
	})
}
