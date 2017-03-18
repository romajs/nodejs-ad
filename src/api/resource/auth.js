var config = require('../../config.js')
var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()
var userService = require('../service/user.js')

router.post('/', function(req, res, next) {

	// FIXME: find in user view by username

	userService.get(req.body.id, function(err, body) {

		if (err) {

			if(err.statusCode === 404) {
				return res.status(404).json({
					success: false,
					message: 'Authentication failed. User not found',
				})
			}

			return next(err)

		}

		if (body.password != req.body.password) {

			return res.json({
				success: false,
				message: 'Authentication failed. Wrong password',
			})

		} else {

			var token = jwt.sign(body, config.auth.secret, {
				expiresIn: config.auth.expiresIn,
			})

			return res.status(200).json({
				success: true,
				message: 'Authentication granted successfully',
				token: token,
			})
		}

	})

})

module.exports = router