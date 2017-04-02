var config = require('../../config.js')
var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()

var userService = require('../service/user.js')

router.post('/', function(req, res, next) {

	// TODO: validate form param
	var username = req.body.username || ''

	userService.get_by_username(username, function(err, user) {

		if(err)
			return next(err)

		if(!user) {
			return res.status(404).json({
				success: false,
				message: 'Authentication failed. User not found',
			})
		}

		if(user.password != req.body.password) {

			return res.status(401).json({
				success: false,
				message: 'Authentication failed. Wrong password',
			})

		} else {

			var token = jwt.sign(user, config.auth.secret, {
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