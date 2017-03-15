var config = require('../../config.js')
var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()
var userService = require('../service/user.js')

router.post('/', function(req, res) {

	// TODO: find in view by username

	userService.get(req.params.username, function(err, body) {

		if (err) throw err // FIXME next(err) ? 

		var user = {
			// FIXME var user = body ...
			username : 'admin',
			password : 'MTIzbXVkYXIK',
			admin: true,
		}

		if (!user) {

			res.json({
				success: false,
				message: 'Authentication failed. User not found',
			})

		} else if (user) {

			if (user.password != req.body.password) {

				res.json({
					success: false,
					message: 'Authentication failed. Wrong password',
				})

			} else {

				var token = jwt.sign(user, config.auth.secret, {
					expiresIn: config.auth.expiresIn,
				})

				res.json({
					success: true,
					message: 'Authentication granted successfully',
					token: token,
				});
			}		

		}

	})

})

module.exports = router