var User = require('../model/userModel.js')

module.exports.get_by_username = function(username, callback) {
	User.findOne({ username: username }, function(err, user) {
    callback(err, user)
	})
}
