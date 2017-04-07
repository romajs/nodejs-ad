module.exports = function(config, callback) {

	var User = require('../../src/api/model/userModel.js')

	var admin = new User({
		username : 'admin',
		password : 'MTIzbXVkYXIK',
		admin: false,
	})

  admin.save(function (err, user) {
	  if (err)
	  	return console.error(err)
	  callback && callback()
	})

}