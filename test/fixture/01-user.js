module.exports.load = function() {

	return new Promise(function(resolve, reject) {

		var User = rootRequire('api/model/userModel').User

		var admin = new User({
			username : 'admin',
			password : 'MTIzbXVkYXIK',
			admin: true,
			name: 'admin',
		})

	  admin.save(function (err, user) {
		  return err ? reject(err) : resolve(user)
		})

	})

}
