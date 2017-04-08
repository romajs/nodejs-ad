var ctx = require('../../src/ctx.js')

module.exports.load = function() {

	return new Promise(function(resolve, reject) {

		var User = require('../../src/api/model/userModel.js').User

		var admin = new User({
			username : 'admin',
			password : 'MTIzbXVkYXIK',
			admin: false,
		})

	  admin.save(function (err, user) {
		  return err ? reject(err) : resolve(user)
		})

	})

}

require('make-runnable')